# social-carousel

## What it does

Carousel posts from copy to files: slide-by-slide copy with a hook and one call to action, and slides rendered from HTML at platform sizes, checked and exported only after approval.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Node and a headless browser library for rendering.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install social-carousel@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add social-carousel@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `carousel-copy-structure` | slide-by-slide carousel copy: hook, problem, value, summary and one call to action |
| skill | `carousel-render-export` | slides rendered from HTML at platform sizes, checked, and exported only after approval |

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
Write the slide-by-slide copy for an Instagram carousel on storing coffee beans at home.
```

Korean requests work the same way; `evals/carousel-copy-beans/prompt.md` has one.

The plugin ships an eval suite (`claude plugin eval plugins/social-carousel --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `carousel-copy-beans` | carousel-copy-structure | 0.00 | 1.00 | 2 |
| `render-export-direct` | carousel-render-export | 0.00 | 1.00 | 2 |
| `tweet-not-carousel` | negative: the skill must not fire | 1.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
