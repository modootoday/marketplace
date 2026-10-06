# content-ai

## What it does

Korean content that reads well and stays true: product copy fixed to the Toss writing principles, Naver blog posts planned for search, persona tone measured with markers, and ghostwriting that never invents the author's facts.

Ad copy reviews are available to signed-in users.

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
| skill | `ghostwriting-editorial` | editing in the author's voice without inventing their facts; gaps become questions for the author; also checks a draft against numbered voice rules from two samples and flags each drift (one-record basis) |
| skill | `persona-tone-eval` | a persona's tone turned into observable markers and scored on stressing prompts, apart from factual errors |
| skill | `client-rulebook-copy-check` | copy checked against one client's, brand's or season's rulebook: banned and required phrasing and tone, each finding tied to a rule id, no rule carried across clients |
| skill | `release-note-from-change-evidence` | release notes and support articles from dev notes, tickets and diffs: every line cites its source, screen names only from evidence, missing facts become questions |
| skill | `client-template-drafting` | proposals, reports and press releases drafted from a client's template and decisions log, with every missing fact left as a listed placeholder; also a proposal assembled from past approved documents with a source line per section, stale facts flagged and old client names replaced (two-record basis) |
| skill | `plain-language-technical-explainer` | an outage or technical issue explained to a non-technical reader: impact, cause, action and next date apart, numbers and assumptions unchanged, overstated certainty flagged, one decision for the reader; rests on two first-person records |
| skill | `fact-bound-personal-letter` | a person's own cover letter, appeal, essay or notice drafted only from supplied facts: placeholders for gaps, unsupported claims refused, a facts-used table, evidence map and a qualified-person line for legal-type letters |
| skill | `length-and-element-constraint-writing` | read-aloud or fixed-size text (eulogy, story, bio) written to a word budget from the time limit, required elements checked, counted by `scripts/count.mjs` |
| skill | `generated-prose-pattern-repair` | a repeated AI phrasing frame counted per paragraph, kept where it carries a real claim, rewritten in the target language's own connectives and recounted |

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
| `two-client-rulebooks` | client-rulebook-copy-check | 1.00 | 1.00 | 2 |
| `monthly-report-gaps` | client-template-drafting | 0.00 | 1.00 | 2 |
| `release-note-unsupported-claims` | release-note-from-change-evidence | 0.00 | 1.00 | 2 |
| `proposal-from-old-proposals` | client-template-drafting (extended) | 0.00 | 1.00 | 2, Sonnet subject and judge |
| `voice-drift-check` | ghostwriting-editorial (extended) | 0.00 | 1.00 | 2 per arm, Sonnet subject and judge, 20261006 |
| `ceo-outage-note` | plain-language-technical-explainer | 0.00 | 1.00 | 2, Sonnet subject and judge |
| `parking-appeal-unsupported-claim` | fact-bound-personal-letter | 0.00 | 1.00 | 2, Opus subject and judge; Sonnet judge passed 2 of 3 items only |
| `eulogy-three-minutes` | length-and-element-constraint-writing | 0.00 | 1.00 | 2, Opus subject and judge; Sonnet judge passed 1 of 2 graders |
| `german-nicht-nur-sondern` | generated-prose-pattern-repair | 0.00 | 0.50 | 2 |
| `german-nicht-nur-sondern` (Opus) | generated-prose-pattern-repair | 0.00 | 0.50 | 2, Opus subject and judge, before the German reference |
| `german-nicht-nur-sondern` (Opus, after `references/german-contrast-frames.md`) | generated-prose-pattern-repair | 0.00 | 1.00 | 2, Opus subject and judge; one of four judge votes was a FAIL |

ghostwriting-editorial shows no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
