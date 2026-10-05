# fiction-editing

## What it does

Continuity audits for long fiction manuscripts: new chapters checked against the author's canon ledger, outline, tense and point of view, with every ruling left to the author.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install fiction-editing@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add fiction-editing@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `manuscript-continuity-audit` | new chapters checked against a canon ledger and outline, with repeated information, unmotivated actions and tense or POV slips reported and the author's prose left alone |

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
Audit my new Ch4 against this canon ledger and outline, and flag any tense or point-of-view slips.
```

The plugin ships an eval suite (`claude plugin eval plugins/fiction-editing --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `chapter-canon-drift` | manuscript-continuity-audit | 0.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
