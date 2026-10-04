# kr-legal

## What it does

Korean legal reviews that cite what the law says today: personal data, crawling, e-commerce and subscription rules, Chrome Web Store policy, AI content labelling, and terms and privacy policies drafted from how the service actually works.

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
| skill | `ai-content-disclosure` | AI-generated content and ads labelled per platform and current Korean rules, with a record of how each asset was made |
| skill | `chrome-store-policy-review` | a Chrome extension checked against Web Store policy before submission: permissions, remote code, data disclosures |
| skill | `ecommerce-act-review` | online sales, subscriptions and free trials checked against Korean e-commerce rules: withdrawal rights, required notices, renewal |
| skill | `terms-privacy-drafting` | terms of service and a privacy policy drafted from how the service works, with placeholders for unconfirmed facts and cited articles |

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
| `ai-ad-video` | ai-content-disclosure | 0.00 | 1.00 | 2 |
| `all-urls-rejection` | chrome-store-policy-review | 1.00 | 1.00 | 2 |
| `draft-privacy-policy` | terms-privacy-drafting | 1.00 | 1.00 | 2 |
| `subscription-no-refund` | ecommerce-act-review | 1.00 | 1.00 | 2 |

Neither skill shows a lift in these cases: the baseline model already knew the law at this level. The skills' value is retrieving current article text through the korean-law server, which the eval environment does not provide, so that part is not measured here.

chrome-store-policy-review, ecommerce-act-review, terms-privacy-drafting show no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks.

Re-run 20261004 with smaller models answering (`--model`), mean score without and with the plugin over the same cases, 2 runs per arm: pipa-review: Haiku 0.33 to 0.83, Sonnet 1.00 to 1.00. crawling-legality-review: Haiku 0.00 to 0.75, Sonnet 1.00 to 1.00.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
