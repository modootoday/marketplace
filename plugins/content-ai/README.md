# content-ai

## What it does

Korean content that reads well and stays true: product copy fixed to the Toss writing principles, Naver blog posts planned for search, persona tone measured with markers, ghostwriting that never invents the author's facts, and ad copy reviewed for claims it cannot prove.

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
| skill | `ghostwriting-editorial` | editing in the author's voice without inventing their facts; gaps become questions for the author |
| skill | `persona-tone-eval` | a persona's tone turned into observable markers and scored on stressing prompts, apart from factual errors |
| skill | `ad-copy-review` | ad copy checked before it runs: every claim backed or cut, category limits for food and cosmetics, sponsorship disclosed up front, one promise |

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
20261005 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `empty-state-no-promise` | ux-writing-toss | 0.00 | 1.00 | 2 |
| `english-email-not-content` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `fix-mixed-register-copy` | ux-writing-toss | 0.00 | 1.00 | 2 |
| `naver-title-stuffed` | naver-blog-seo | 1.00 | 1.00 | 2 |
| `naver-two-topics` | naver-blog-seo | 0.00 | 1.00 | 2 |
| `invent-anecdote` | ghostwriting-editorial | 1.00 | 1.00 | 2 |
| `persona-sounds-off` | persona-tone-eval | 0.00 | 1.00 | 2 |
| `collagen-ad-claims` | ad-copy-review | 1.00 | 1.00 | 2 |

ghostwriting-editorial and ad-copy-review show no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
