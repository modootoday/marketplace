# trust-safety

## What it does

Abuse detection that can be trusted: signals ranked by how abusers work and how cheaply they could evade, rules measured on labelled data before they act, and appeals that restore what a false positive took.

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
claude plugin install trust-safety@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add trust-safety@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `abuse-rule-authoring` | abuse rules measured on labelled data, shipped in shadow mode first, with evidence per hit and an appeal path |
| skill | `abuse-signal-brainstorm` | detection signals found from how the abuse is carried out, rated by evasion cost and false-positive risk |
| skill | `false-positive-appeal` | appeals against automated actions decided on the recorded evidence, restored on reversal, fed back into the rule |

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
Brainstorm detection signals for fake 5-star reviews on our platform.
```

The plugin ships an eval suite (`claude plugin eval plugins/trust-safety --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `auto-ban-rule` | abuse-rule-authoring | 0.00 | 1.00 | 2 |
| `define-captcha-negative` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `fake-review-signals` | abuse-signal-brainstorm | 0.00 | 1.00 | 2 |
| `seller-appeal` | false-positive-appeal | 0.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
