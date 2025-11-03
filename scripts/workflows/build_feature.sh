#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
. "${SCRIPT_DIR}/common.sh"

usage() {
  cat <<'EOF'
Usage: build_feature.sh [options] <feature description>

Options:
  -f, --prompt-file FILE   Additional prompt context to prepend
  -h, --help               Show this help message and exit

Environment:
  CURSOR_PLAN_TEMPLATE            Command template to generate the plan (required)
  CURSOR_PHASE_REVIEW_TEMPLATE    Command template to review each phase (optional)

Templates may reference the following placeholders: {prompt_file}, {plan_file},
{session_dir}, {phase_file}, {log_file}.
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

FEATURE_PROMPT=$*

if [[ -z "$FEATURE_PROMPT" && -z "$PROMPT_FILE" ]]; then
  echo "A feature description or --prompt-file is required." >&2
  usage
  exit 2
fi

if [[ -n "$PROMPT_FILE" && ! -f "$PROMPT_FILE" ]]; then
  echo "Prompt file not found: $PROMPT_FILE" >&2
  exit 2
fi

SESSION_DIR=$(create_session_dir "features" "$FEATURE_PROMPT")
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
  if [[ -n "$FEATURE_PROMPT" ]]; then
    printf '%s\n' "$FEATURE_PROMPT"
  fi
} > "$PROMPT_PATH"

PLAN_FILE="${SESSION_DIR}/plan.md"

PLAN_TEMPLATE=${CURSOR_PLAN_TEMPLATE:-}
if [[ -z "$PLAN_TEMPLATE" ]]; then
  echo "Environment variable CURSOR_PLAN_TEMPLATE must be set." >&2
  echo "Example: CURSOR_PLAN_TEMPLATE='cursor plan --multi-phase --output {plan_file} --prompt-file {prompt_file}'" >&2
  exit 2
fi

PLAN_COMMAND=$(render_command "$PLAN_TEMPLATE" \
  "prompt_file=${PROMPT_PATH}" \
  "plan_file=${PLAN_FILE}" \
  "session_dir=${SESSION_DIR}" \
  "log_file=${LOG_FILE}")

run_and_capture "Generate multi-phase plan" bash -lc "$PLAN_COMMAND"

if [[ ! -s "$PLAN_FILE" ]]; then
  echo "Plan file was not created or is empty: $PLAN_FILE" >&2
  exit 1
fi

PHASE_DIR="${SESSION_DIR}/phases"
mkdir -p "$PHASE_DIR"

python3 - "$PLAN_FILE" "$PHASE_DIR" <<'PY'
import re
import sys
from pathlib import Path

plan_path = Path(sys.argv[1])
phase_dir = Path(sys.argv[2])

text = plan_path.read_text()

heading_pattern = re.compile(r'^(#{1,6})\s*Phase\s+(\d+)(:|\s+-|\s+)(.*)$', re.IGNORECASE)

phases = []
current = None

for line in text.splitlines():
    match = heading_pattern.match(line.strip())
    if match:
        if current:
            phases.append(current)
        level, index, _, title = match.groups()
        current = {
            "index": int(index),
            "title": title.strip() or f"Phase {index}",
            "content": [line]
        }
    elif current:
        current["content"].append(line)

if current:
    phases.append(current)

if not phases:
    # fallback: single phase containing all content
    phases = [{"index": 1, "title": plan_path.stem, "content": text.splitlines()}]

for i, phase in enumerate(phases, start=1):
    phase_file = phase_dir / f"phase-{i:02d}.md"
    phase_file.write_text('\n'.join(phase["content"]) + '\n')

summary_lines = []
for i, phase in enumerate(phases, start=1):
    summary_lines.append(f"- Phase {i}: {phase['title']}")

(phase_dir / "summary.md").write_text('\n'.join(summary_lines) + '\n')
PY

REVIEW_TEMPLATE=${CURSOR_PHASE_REVIEW_TEMPLATE:-}

if [[ -n "$REVIEW_TEMPLATE" ]]; then
  for phase_file in "$PHASE_DIR"/phase-*.md; do
    [[ -f "$phase_file" ]] || continue
    REVIEW_COMMAND=$(render_command "$REVIEW_TEMPLATE" \
      "phase_file=${phase_file}" \
      "plan_file=${PLAN_FILE}" \
      "session_dir=${SESSION_DIR}" \
      "log_file=${LOG_FILE}")
    phase_name=$(basename "$phase_file")
    run_and_capture "Review ${phase_name}" bash -lc "$REVIEW_COMMAND"
  done
else
  log_line "No CURSOR_PHASE_REVIEW_TEMPLATE set; skipping automated phase reviews."
fi

cat > "${SESSION_DIR}/metadata.json" <<JSON
{
  "workflow": "build_feature",
  "created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "prompt_file": "$(basename "$PROMPT_PATH")",
  "plan_file": "$(basename "$PLAN_FILE")",
  "phase_dir": "phases"
}
JSON

log_line "Build feature workflow complete. Artifacts saved under ${SESSION_DIR}."
