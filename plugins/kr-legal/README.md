# kr-legal

## What it does

Korean legal reviews that cite what the law says today: personal data handling under the Personal Information Protection Act, and the risk of crawling another service, with articles and decisions retrieved rather than remembered.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: The korean-law MCP server, so article text and decisions are retrieved rather than remembered. Without it every citation is marked unverified.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install kr-legal@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add kr-legal@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `pipa-review` | data flows reviewed against the Personal Information Protection Act: lawful basis, consent notices, entrustment, provision, overseas transfer |
| skill | `crawling-legality-review` | crawling and bulk collection judged fact by fact against access, database, unfair competition, privacy and contract rules |

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
Review our signup consent notice against Korea's Personal Information Protection Act.
```

Korean requests work the same way; `evals/signup-form-review/prompt.md` has one.

The plugin ships an eval suite (`claude plugin eval plugins/kr-legal --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `consent-for-everything` | pipa-review | 1.00 | 1.00 | 2 |
| `postal-regex-not-legal` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `public-reviews-with-names` | crawling-legality-review | 1.00 | 1.00 | 2 |
| `quote-transfer-article` | pipa-review | 1.00 | 1.00 | 3 |
| `scrape-competitor-behind-login` | crawling-legality-review | 1.00 | 1.00 | 2 |
| `signup-form-review` | pipa-review | 1.00 | 1.00 | 2 |

Neither skill shows a lift in these cases: the baseline model already knew the law at this level. The skills' value is retrieving current article text through the korean-law server, which the eval environment does not provide, so that part is not measured here.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
