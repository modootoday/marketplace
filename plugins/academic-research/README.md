# academic-research

## What it does

Check AI-suggested citations, measurement instruments and extracted statistics against real sources before they enter your research notes.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Nothing is required. A web search tool lets the skill confirm citations against an index; without one it reports them as unverifiable.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install academic-research@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add academic-research@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `research-source-verification` | AI-suggested citations matched to a real index, instruments extracted only as quoted text, papers screened against the research question |
| skill | `research-coverage-chronology-audit` | research answers audited for missing items and wrong dates: dated sourced list, proposed versus enacted, coverage gaps |
| skill | `paper-method-reimplementation-check` | a port of a published method checked before use: equation checklist, authors' code and licence recorded, one published number reproduced first, deviations and ambiguous text listed |
| skill | `reference-renumber-sync` | numbered references reordered or deleted with an old-to-new mapping, groups and ranges rewritten, deleted-reference citations and uncited entries listed; rests on one user report |

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
Check these AI-suggested references before I cite them: Vaswani et al. (2017), Attention Is All You Need.
```

The plugin ships an eval suite (`claude plugin eval plugins/academic-research --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `unverified-citations` | research-source-verification | 0.00 | 1.00 | 2 |
| `policy-timeline-audit` | research-coverage-chronology-audit | 0.00 | 1.00 | 2 |
| `method-port-matlab` | paper-method-reimplementation-check | 0.00 | 1.00 | 2, Sonnet subject and judge |
| `renumber-delete-and-move` | reference-renumber-sync | 0.00 | 1.00 | 2, Sonnet subject and judge |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
