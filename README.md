
# Dish Recipe APP
### Preview Link: https://akt-dish.herokuapp.com/
## Technologies Used:
- React
- Redux - Saga
- TypeScript
- Node.js
- MongoDB
- TailwindCSS
# Project Setup
## To install the project dependencies
- npm install
### To run the project
- npm run dev
### To build the project
- npm run build

## AI-Assisted Workflows

This repository includes automation helpers under `scripts/workflows` plus a root `justfile` so you can trigger your Cursor-driven rituals in one command.

### Prerequisites

- Install [`just`](https://github.com/casey/just) locally (macOS: `brew install just`, Ubuntu: `sudo apt install just`).
- Configure environment variables that describe how to call your Cursor CLI or agent runner:

  ```bash
  export CURSOR_PLAN_TEMPLATE='cursor plan --multi-phase --output {plan_file} --prompt-file {prompt_file}'
  export CURSOR_PHASE_REVIEW_TEMPLATE='cursor review --input {phase_file}'

  export CURSOR_REPRO_TEMPLATE='cursor agent run repro --prompt-file {prompt_file} --output {repro_file}'
  export CURSOR_FIX_TEMPLATE='cursor agent run fix --repro {repro_file} --output {fix_file}'
  export CURSOR_REVIEW_TEMPLATE='cursor review --input {fix_file}'

  export CURSOR_UI_EDIT_TEMPLATE='cursor edit --apply --model stupid --prompt-file {prompt_file}'
  export CURSOR_UI_VERIFY_TEMPLATE='npm run test'
  ```

  Each template can reference `{prompt_file}`, `{plan_file}`, `{phase_file}`, `{repro_file}`, `{fix_file}`, `{session_dir}`, and `{log_file}`. Feel free to tailor the commands to your setup.

### Usage

- `just build-feature "Feature description"` - generate a multi-phase plan, split it into phase files, and optionally auto-review each phase.
- `just fix-bug "Bug summary"` - capture a repro, hand it to a fixing agent, and run a final review.
- `just tweak-ui "Quick tweak"` - drive your fast-loop UI edits, snapshotting git status before/after.

Artifacts land under `.cursor/workflows/<category>/<timestamp>-slug/` (plans, repros, logs, etc.). Use `just workflow-latest` to locate the newest run and `just workflow-clean` to prune old sessions.
