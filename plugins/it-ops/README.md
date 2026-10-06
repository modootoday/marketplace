# it-ops

## What it does

Read-through review of administration scripts before they run: commands checked against the installed version, destructive steps flagged, errors handled per item, and a fix made on an anonymized copy patched back to the real script without exposing real values. It never runs a script.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install it-ops@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add it-ops@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `admin-script-verification` | a PowerShell, bash or Python admin script reviewed for invented commands, destructive steps, missing validation and recovery, with a dry-run and trial plan (two evidence records) |
| skill | `anonymized-script-patch-back` | a change made on a scrubbed script applied to the real one through a local replacement table, hunk only, with an outbound-text check (one evidence record) |

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin. A skill that produces files writes them only where the user asks.

## Verify

Ask for something the plugin covers:

```
Review this PowerShell script and add error handling before I run it on 300 accounts.
```

The plugin ships an eval suite (`claude plugin eval plugins/it-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `ad-script-300-accounts` | admin-script-verification | 0.00 | 1.00 | 2 |
| `patch-back-retry-loop` | anonymized-script-patch-back | 0.00 | 1.00 | 2 |

Each skill has one case; two more are needed per skill for the three-case release gate.
The with-plugin arm was measured after the last SKILL.md edit; the baseline is from the
earlier both-arm run on the same prompt and graders.

## License

MIT
