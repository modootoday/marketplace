# growth-community

## What it does

Growth and community work: store listings written for the people searching that store, Discord servers run with structure and consistent moderation, and newsletters readers open and finish.

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
claude plugin install growth-community@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add growth-community@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `discord-community-ops` | a Discord server shaped by what members come to do, with FAQ posts that stay true and a written moderation ladder |
| skill | `store-listing-optimization` | store listings that state the user's outcome plainly, with the search phrase once and no unprovable claims |
| skill | `newsletter-editorial` | newsletter issues with one reason, a subject and preview that state it, short sections and a pre-send check |

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
Rewrite our Chrome Web Store short description for search without keyword stuffing.
```

The plugin ships an eval suite (`claude plugin eval plugins/growth-community --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `listing-rewrite` | store-listing-optimization | 0.50 | 0.50 | 2 |
| `messy-server` | discord-community-ops | 0.00 | 1.00 | 2 |
| `utm-question-negative` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `plan-issue` | newsletter-editorial | 0.00 | 1.00 | 2 |

store-listing-optimization shows no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
