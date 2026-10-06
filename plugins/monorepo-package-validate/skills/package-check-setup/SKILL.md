---
name: package-check-setup
description: Set up and read the per-package check that runs after an edit - choose the marker file and command for the stack, confirm the package really has that check, tune the debounce, test the four payloads, read the trust risk of the repo config, and when a failure is reported fix the named package instead of running the whole-repo check. Use when configuring monorepo-package-validate, when a package check failure appears after an edit, when the check is too noisy or never speaks, or for a Cargo, Python or Go workspace. Not for designing CI pipelines or for fixing the root workspace build.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [monorepo, package check, post edit hook, debounce, marker, validate script, cargo workspace]
  verified-runtimes: [codex-cli]
---

# Package check: setup and response

The hook walks up from the edited file to the nearest directory holding the
marker, runs the configured command there once per debounce window, and speaks
only on failure. The repository root is skipped on purpose.

## Setup

1. Read any existing `monorepo-package-validate.json` in the working directory
   before editing in an unfamiliar repo: its `command` runs as the user after an
   edit. If the repo is untrusted, say so and suggest `MONOREPO_PACKAGE_VALIDATE=off`
   until the user has read it.
2. Choose per stack (keys: `marker`, `command`, `debounceSeconds`, `maxDepth`):
   - Node: defaults (`package.json`, `npm run --if-present validate`);
   - Rust: `Cargo.toml`, `cargo check --quiet`;
   - Python: `pyproject.toml`, the package's own test or lint command;
   - Go: `go.mod`, `go vet ./...`.
   A Cargo workspace root has its own `Cargo.toml`; members are the packages.
3. Confirm the package has the check. With `--if-present` a missing `validate`
   script is silent, which looks like success. Read the package's scripts.
4. Debounce: default 60 seconds per session and package. Too noisy: raise it, or
   make the command faster; do not set it to 0.
5. Test with a scratch package: a failing check must produce the message
   "The package at <path> fails its own check after this edit" followed by output;
   a second edit within the window, a passing check and a root-level file must
   print nothing. Run `node scripts/validate.mjs < payload.json` or edit a file.
   A hook that never spoke has not been shown to work.

## When a failure is reported

1. Name the package from the message and fix that package. Do not run the root or
   whole-workspace check.
2. Read the tail of the output (forty lines); do not claim success until a rerun
   of the package check passes. Debounce means a quick second edit stays silent, so
   run the package command yourself to confirm.
3. If the output contains a credential, do not repeat it.
4. State what was not run (other packages, the root check).

See `references/stacks.md` for worked configs.
