# localization

## What it does

Quality checks for translations and subtitles: omissions, footnote parity, naturalness, and cue limits reported by id.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: nothing is required. `subtitle-qc` can run `scripts/srt-check.mjs` when node is available and does the same checks by hand otherwise.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install localization@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add localization@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `translation-postedit-qc` | a source-to-target check for omissions, footnote parity, naturalness and terms, with spots flagged for a native reviewer |
| skill | `subtitle-qc` | subtitle cues checked for line length, reading speed and overlapping timing, reported by cue id; ships `scripts/srt-check.mjs` (needs node) and a long-cue split reference |
| skill | `language-variety-and-register-lock-check` | generated text checked against a language policy (regional variety, dialect, speech level, intended foreign lines) span by span and turn by turn, with drift listed by line and protected spans left unchanged |

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
Check these six SRT cues against 42 characters per line and 17 characters per second.
```

The plugin ships an eval suite (`claude plugin eval plugins/localization --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `german-footnote-calque` | translation-postedit-qc | 0.00 | 1.00 | 2 |
| `srt-limits-overlap` | subtitle-qc | 0.00 | 0.67 | 2 without, 3 with (after the last skill edit) |
| `srt-limits-overlap` (Opus) | subtitle-qc | 0.50 | 1.00 | 2, Opus subject and judge |
| `pt-br-drift-two-turns` | language-variety-and-register-lock-check | 0.00 | 0.50 | 2 |
| `pt-br-drift-two-turns` (Opus) | language-variety-and-register-lock-check | 0.00 | 1.00 | 2, Opus subject and judge |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
