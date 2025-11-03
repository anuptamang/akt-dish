set shell := ["bash", "-cu"]
set positional-arguments := true

default:
    @just --list

build-feature *ARGS:
    @scripts/workflows/build_feature.sh {{ARGS}}

fix-bug *ARGS:
    @scripts/workflows/fix_bug.sh {{ARGS}}

tweak-ui *ARGS:
    @scripts/workflows/tweak_ui.sh {{ARGS}}

workflow-latest:
    @find .cursor/workflows -maxdepth 2 -mindepth 2 -type d 2>/dev/null | sort | tail -n 1

workflow-open session:
    @${EDITOR:-${VISUAL:-vim}} "{{session}}"

workflow-clean:
    @echo "Removing workflow artifacts in .cursor/workflows" && rm -rf .cursor/workflows/*
