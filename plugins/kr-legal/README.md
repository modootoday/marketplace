# kr-legal

## What it does

AI-generated content and ads labelled per platform and current Korean rules, with a record of how each asset was made.

This plugin is a preview: the other Korean legal reviews (personal data, crawling, e-commerce and subscription rules, ad copy, voice rights, terms and privacy drafting) are available to signed-in users.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: The korean-law MCP server for ai-content-disclosure, so rule text is retrieved rather than remembered. Without it every citation is marked unverified.

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
| skill | `ai-content-disclosure` | AI-generated content and ads labelled per platform and current Korean rules, with a record of how each asset was made |

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
We made a 15-second Instagram ad for our cafe with an AI-generated video and an AI voice-over. Do we need to label anything?
```

The plugin ships an eval suite (`claude plugin eval plugins/kr-legal --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `ai-ad-video` | ai-content-disclosure | 0.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
