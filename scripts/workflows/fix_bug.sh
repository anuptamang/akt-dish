#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
. "${SCRIPT_DIR}/common.sh"

usage() {
  cat <<'EOF'
Usage: fix_bug.sh [options] <bug description>

Options:
  -f, --prompt-file FILE   Supplemental details to prepend
  -h, --help               Show this help message and exit

Environment:
  CURSOR_REPRO_TEMPLATE    Command template to create a reproduction (required)
  CURSOR_FIX_TEMPLATE      Command template to generate a fix (optional)
  CURSOR_REVIEW_TEMPLATE   Command template to review the fix (optional)

Templates may reference: {prompt_file}, {repro_file}, {fix_file}, {session_dir}, {log_file}.
EOF
}

PROMPT_FILE=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    -f|--prompt-file)
      PROMPT_FILE="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      break
      ;;
    -*)
      echo "Unknown option: $1" >&2
      usage
      exit 2
      ;;
    *)
      break
      ;;
  esac
done

BUG_PROMPT=$*

if [[ -z "$BUG_PROMPT" && -z "$PROMPT_FILE" ]]; then
  echo "A bug description or --prompt-file is required." >&2
  usage
  exit 2
fi

if [[ -n "$PROMPT_FILE" && ! -f "$PROMPT_FILE" ]]; then
  echo "Prompt file not found: $PROMPT_FILE" >&2
  exit 2
fi

SESSION_DIR=$(create_session_dir "bugs" "$BUG_PROMPT")
export LOG_FILE="${SESSION_DIR}/workflow.log"

log_line "Session directory: ${SESSION_DIR}"

PROMPT_PATH="${SESSION_DIR}/prompt.txt"

{
  if [[ -n "$PROMPT_FILE" ]]; then
    cat "$PROMPT_FILE"
    echo
    echo "---"
    echo
  fi
  if [[ -n "$BUG_PROMPT" ]]; then
    printf '%s\n' "$BUG_PROMPT"
  fi
} > "$PROMPT_PATH"

REPRO_FILE="${SESSION_DIR}/repro.md"

REPRO_TEMPLATE=${CURSOR_REPRO_TEMPLATE:-}
if [[ -z "$REPRO_TEMPLATE" ]]; then
  echo "Environment variable CURSOR_REPRO_TEMPLATE must be set." >&2
  echo "Example: CURSOR_REPRO_TEMPLATE='cursor agent run repro --prompt-file {prompt_file} --output {repro_file}'" >&2
  exit 2
fi

REPRO_COMMAND=$(render_command "$REPRO_TEMPLATE" \
  "prompt_file=${PROMPT_PATH}" \
  "repro_file=${REPRO_FILE}" \
  "session_dir=${SESSION_DIR}" \
  "log_file=${LOG_FILE}")

run_and_capture "Generate reproduction" bash -lc "$REPRO_COMMAND"

if [[ ! -s "$REPRO_FILE" ]]; then
  echo "Reproduction output not found: $REPRO_FILE" >&2
  exit 1
fi

FIX_TEMPLATE=${CURSOR_FIX_TEMPLATE:-}
FIX_FILE="${SESSION_DIR}/fix-report.md"

if [[ -n "$FIX_TEMPLATE" ]]; then
  FIX_COMMAND=$(render_command "$FIX_TEMPLATE" \
    "prompt_file=${PROMPT_PATH}" \
    "repro_file=${REPRO_FILE}" \
    "fix_file=${FIX_FILE}" \
    "session_dir=${SESSION_DIR}" \
    "log_file=${LOG_FILE}")
  run_and_capture "Generate fix" bash -lc "$FIX_COMMAND"

  if [[ ! -s "$FIX_FILE" ]]; then
    log_line "Warning: fix command completed but produced no output at ${FIX_FILE}."
  fi
else
  log_line "No CURSOR_FIX_TEMPLATE set; skipping automated fix generation."
fi

REVIEW_TEMPLATE=${CURSOR_REVIEW_TEMPLATE:-}

if [[ -n "$REVIEW_TEMPLATE" ]]; then
  REVIEW_COMMAND=$(render_command "$REVIEW_TEMPLATE" \
    "prompt_file=${PROMPT_PATH}" \
    "repro_file=${REPRO_FILE}" \
    "fix_file=${FIX_FILE}" \
    "session_dir=${SESSION_DIR}" \
    "log_file=${LOG_FILE}")
  run_and_capture "Review fix" bash -lc "$REVIEW_COMMAND"
else
  log_line "No CURSOR_REVIEW_TEMPLATE set; skipping automated review."
fi

cat > "${SESSION_DIR}/metadata.json" <<JSON
{
  "workflow": "fix_bug",
  "created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "prompt_file": "$(basename "$PROMPT_PATH")",
  "repro_file": "$(basename "$REPRO_FILE")",
  "fix_file": "$(basename "$FIX_FILE")"
}
JSON

log_line "Bug fix workflow complete. Artifacts saved under ${SESSION_DIR}."
