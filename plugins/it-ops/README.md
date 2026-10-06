# it-ops

## What it does

A fix made on an anonymized copy of an administration script patched back to the real script through a local replacement table, changed hunks only, with no real value sent to a model. It never runs a script.

Admin script reviews before a run are available to signed-in users.

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
I fixed the anonymized copy of our script (HOST1, TOKEN_X). Apply the fix to the real script.
```

The plugin ships an eval suite (`claude plugin eval plugins/it-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `patch-back-retry-loop` | anonymized-script-patch-back | 0.00 | 1.00 | 2 per arm |

The skill has one case; two more are needed for the three-case release gate.
The row is a both-arm run on the final skill text, Sonnet subject and judge, 20261006.

## License

MIT
