#!/usr/bin/env bash

# Shared utilities for workflow automation scripts.

set -o pipefail

WORKFLOW_ROOT=${WORKFLOW_ROOT:-.cursor/workflows}

mkdir -p "$WORKFLOW_ROOT"

timestamp() {
  date -u +"%Y%m%d-%H%M%S"
}

slugify() {
  local input="$*"
  if [[ -z "$input" ]]; then
    echo "session"
    return
  fi

  echo "$input" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g' \
    | sed -E 's/^-+|-+$//g'
}

create_session_dir() {
  local category="$1"
  shift
  local name="$*"
  local slug
  slug=$(slugify "$name")
  local dir="$WORKFLOW_ROOT/${category}/$(timestamp)-${slug}"
  mkdir -p "$dir"
  echo "$dir"
}

log_line() {
  local msg="$*"
  printf '[%s] %s\n' "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" "$msg" | tee -a "${LOG_FILE:-/dev/null}" >/dev/null
}

log_section() {
  log_line "==> $*"
}

require_command() {
  local binary="$1"
  if ! command -v "$binary" >/dev/null 2>&1; then
    echo "Required command '$binary' is not available on PATH." >&2
    exit 1
  fi
}

run_and_capture() {
  local description="$1"
  shift
  log_section "$description"
  set +e
  "$@" 2>&1 | tee -a "${LOG_FILE:-/dev/null}"
  local status=${PIPESTATUS[0]}
  set -e
  if (( status != 0 )); then
    log_line "Step failed: ${description} (exit ${status})"
    exit "$status"
  fi
}

archive_path() {
  local session_dir="$1"
  local name="$2"
  echo "${session_dir}/${name}"
}

render_command() {
  local template="$1"
  shift
  require_command python3
  python3 - "$template" "$@" <<'PY'
import shlex
import sys

template = sys.argv[1]
tokens = {}
for raw in sys.argv[2:]:
    if '=' not in raw:
        raise SystemExit(f"Invalid token '{raw}', expected key=value")
    key, value = raw.split('=', 1)
    tokens[key] = shlex.quote(value)

for key, value in tokens.items():
    template = template.replace('{' + key + '}', value)

print(template)
PY
}
