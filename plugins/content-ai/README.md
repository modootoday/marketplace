# content-ai

## What it does

Korean content that reads well and gets found: product copy rewritten to the public Toss writing principles, and Naver blog posts planned for search without keyword stuffing.

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
claude plugin install content-ai@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add content-ai@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `ux-writing-toss` | Korean product copy fixed to the public Toss writing principles, with the rule behind each change |
| skill | `naver-blog-seo` | Naver blog posts planned and reviewed for search: one intent, a reader-first title and opening, first-hand detail, honest tags |

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
Review the Korean error message on our payment screen against the Toss writing principles.
```

Korean requests work the same way; `evals/fix-mixed-register-copy/prompt.md` has one.

The plugin ships an eval suite (`claude plugin eval plugins/content-ai --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `empty-state-no-promise` | ux-writing-toss | 0.50 | 1.00 | 2 |
| `english-email-not-content` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `fix-mixed-register-copy` | ux-writing-toss | 0.00 | 1.00 | 2 |
| `naver-title-stuffed` | naver-blog-seo | 1.00 | 1.00 | 2 |
| `naver-two-topics` | naver-blog-seo | 0.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
