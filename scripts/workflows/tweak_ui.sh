#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
. "${SCRIPT_DIR}/common.sh"

usage() {
  cat <<'EOF'
Usage: tweak_ui.sh [options] <ui tweak description>

Options:
  -f, --prompt-file FILE   Supplemental context to prepend
  -h, --help               Show this help message and exit

Environment:
  CURSOR_UI_EDIT_TEMPLATE     Command template to apply UI edits (required)
  CURSOR_UI_VERIFY_TEMPLATE   Command template to verify results (optional)
  CURSOR_UI_REVIEW_TEMPLATE   Command template to summarize or review (optional)

Templates may reference: {prompt_file}, {session_dir}, {log_file}.
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

UI_PROMPT=$*

if [[ -z "$UI_PROMPT" && -z "$PROMPT_FILE" ]]; then
  echo "A UI description or --prompt-file is required." >&2
  usage
  exit 2
fi

if [[ -n "$PROMPT_FILE" && ! -f "$PROMPT_FILE" ]]; then
  echo "Prompt file not found: $PROMPT_FILE" >&2
  exit 2
fi

SESSION_DIR=$(create_session_dir "ui" "$UI_PROMPT")
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
  if [[ -n "$UI_PROMPT" ]]; then
    printf '%s\n' "$UI_PROMPT"
  fi
} > "$PROMPT_PATH"

EDIT_TEMPLATE=${CURSOR_UI_EDIT_TEMPLATE:-}
if [[ -z "$EDIT_TEMPLATE" ]]; then
  echo "Environment variable CURSOR_UI_EDIT_TEMPLATE must be set." >&2
  echo "Example: CURSOR_UI_EDIT_TEMPLATE='cursor edit --apply --model stupid --prompt-file {prompt_file}'" >&2
  exit 2
fi

if command -v git >/dev/null 2>&1; then
  git status -sb > "${SESSION_DIR}/pre-status.txt" || true
  git diff > "${SESSION_DIR}/pre-diff.patch" || true
fi

EDIT_COMMAND=$(render_command "$EDIT_TEMPLATE" \
  "prompt_file=${PROMPT_PATH}" \
  "session_dir=${SESSION_DIR}" \
  "log_file=${LOG_FILE}")

run_and_capture "Apply UI edits" bash -lc "$EDIT_COMMAND"

if command -v git >/dev/null 2>&1; then
  git status -sb > "${SESSION_DIR}/post-status.txt" || true
  git diff > "${SESSION_DIR}/post-diff.patch" || true
fi

VERIFY_TEMPLATE=${CURSOR_UI_VERIFY_TEMPLATE:-}
if [[ -n "$VERIFY_TEMPLATE" ]]; then
  VERIFY_COMMAND=$(render_command "$VERIFY_TEMPLATE" \
    "prompt_file=${PROMPT_PATH}" \
    "session_dir=${SESSION_DIR}" \
    "log_file=${LOG_FILE}")
  run_and_capture "Verify UI edits" bash -lc "$VERIFY_COMMAND"
else
  log_line "No CURSOR_UI_VERIFY_TEMPLATE set; skipping verification step."
fi

REVIEW_TEMPLATE=${CURSOR_UI_REVIEW_TEMPLATE:-}
if [[ -n "$REVIEW_TEMPLATE" ]]; then
  REVIEW_COMMAND=$(render_command "$REVIEW_TEMPLATE" \
    "prompt_file=${PROMPT_PATH}" \
    "session_dir=${SESSION_DIR}" \
    "log_file=${LOG_FILE}")
  run_and_capture "Review UI edits" bash -lc "$REVIEW_COMMAND"
else
  log_line "No CURSOR_UI_REVIEW_TEMPLATE set; skipping review step."
fi

cat > "${SESSION_DIR}/metadata.json" <<JSON
{
  "workflow": "tweak_ui",
  "created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "prompt_file": "$(basename "$PROMPT_PATH")"
}
JSON

log_line "UI tweak workflow complete. Artifacts saved under ${SESSION_DIR}."
