# monorepo-package-validate

## What it does

After an edit, runs the check belonging to the package that was edited, once per
debounce window, and speaks only when it fails.

In a large repository the whole-workspace check is too slow to run on every edit
and too coarse to say which package broke. The package that was just edited is
the one that can answer, and it usually answers in seconds.

## Runtime support

| Runtime     | Supported   | Measured on                                              |
| ----------- | ----------- | -------------------------------------------------------- |
| Claude Code | yes         | 2.1.251                                                  |
| Codex CLI   | skill only  | 0.160.1 — the hook is a no-op, see below                 |
| Grok CLI    | skills only | 1.0.13 — registers plugin hooks but never runs them      |
| Gemini CLI  | skills only | 0.57.0 — different hook event names, units and variables |

Measured 20261006 on Codex CLI 0.160.1: Codex does send PostToolUse for its edit tool, but the
tool is `apply_patch` and the payload carries the patch text in `tool_input.command` with no
`file_path`, so the handler finds no edited file and exits silently. In 2 of 2 with-arm runs
over a failing package no failure reached the agent. The hook cases below are therefore
Claude Code only and were not measured; the companion skill is measured on Codex.
The handler itself was exercised directly on this machine; see Verify.

## Install

```
claude plugin marketplace add modootoday/marketplace
claude plugin install monorepo-package-validate@modootoday
```

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add monorepo-package-validate@modootoday
```

Codex runs no hook until trusted; use `/hooks` in an interactive session.
Restart the session after installing.

## What it registers

| Kind | Name                     | Detail                                              |
| ---- | ------------------------ | --------------------------------------------------- |
| hook | PostToolUse (Edit, Write) | runs the edited package's own check, reports failures |

The companion skill `package-check-setup` covers choosing the marker and command for a
stack, proving the check can fail, and reading a reported failure.

It walks up from the edited file to the nearest directory holding the marker
file, at most eight levels. An edit that resolves to the repository root itself
is skipped, because the root's check is the whole-workspace run this exists to
avoid.

## Failure mode

**fail-open, and silent on success.** An unreadable payload, an unreadable
config, a missing package root, or a check that passes all exit without a word.
It never blocks an edit. A check that fails is reported to the model as context,
not as a refusal.

Silence on success is the contract: a hook that speaks every time is a hook whose
output stops being read.

## Configuration and how to disable

`MONOREPO_PACKAGE_VALIDATE=off` disables it.

`monorepo-package-validate.json` in the working directory overrides the defaults:

| Key               | Default                        | Meaning                                  |
| ----------------- | ------------------------------ | ---------------------------------------- |
| `marker`          | `package.json`                 | what marks a package root                |
| `command`         | `npm run --if-present validate` | run in the package directory             |
| `debounceSeconds` | `60`                           | per session and package                  |
| `maxDepth`        | `8`                            | how far up to look for a package root    |

The default command names no tool of its own: `--if-present` means a package with
no `validate` script costs nothing. Point `command` at whatever your packages
already run.

The debounce exists because an agent edits several files in a row. Without it the
check runs on every change and the cost lands on every turn.

## Data written

One empty stamp file per session and package, under the system temporary
directory, holding nothing but its own modification time. No network.

The check itself is your command, and whatever it writes is its own.

## Verify

```
node scripts/validate.mjs < payload.json
```

Four behaviours, in a scratch repository with one failing package:

| Payload                                | Expected                           |
| -------------------------------------- | ---------------------------------- |
| first edit in a failing package         | JSON naming the package and the tail of its output |
| the same package again, within a minute | nothing — debounced                |
| a package whose check passes            | nothing                            |
| a file resolving to the repository root | nothing — the root is skipped      |

Measured on Claude Code 2.1.251: the first prints
`The package at pkgs/a fails its own check after this edit`, and the other three
print nothing and exit zero.

Prove it can fail: make the package's `validate` script exit non-zero and confirm
the failure reaches you. A hook that has never spoken has not been shown to work.

Evals: `failing-package-reported`, `passing-package-silent` and `custom-command-config` need a
runtime that delivers the hook output (Claude Code); they are Claude Code only and not yet
measured. `cargo-workspace-config` is skill only, measured 20261006 with Codex CLI 0.160.1
(`codex-eval.mjs`, gpt-6.1-sol as subject and judge, 3 votes, 2 runs per arm):

| Case | Skill | Without | With | Fired |
| --- | --- | --- | --- | --- |
| `cargo-workspace-config` | package-check-setup | 0.00 | 1.00 | 2/2 |

## Security

The command it runs comes from a file in the repository you opened. Cloning a
repository that ships a `monorepo-package-validate.json` and then editing one
file is enough to run whatever that file names, as you, in that repository's
directory.

That is the same trust you extend to any repository whose build you run, but this
plugin makes it happen after an edit rather than when you choose to build. Read
the config before you edit in a repository you do not trust, or set
`MONOREPO_PACKAGE_VALIDATE=off` until you have.

The stamp path is predictable and its contents are empty, so it carries nothing
worth reading. The hook forwards the last forty lines of a failing check into the
model's context: if your check prints a credential on failure, that is where it
goes.

## License

MIT
