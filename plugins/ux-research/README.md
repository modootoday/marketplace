# ux-research

## What it does

Index interview transcripts by session, theme and timestamp with verbatim audited quotes, score SUS questionnaires with the scoring rule the user supplies, and draw an information-architecture sitemap from a feature list.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install ux-research@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add ux-research@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `interview-sus-score` | System Usability Scale scores from raw sheets using the scoring rule you paste, with sheets validated, per-respondent arithmetic, mean, median and n scored; rests on 1 record |
| skill | `ia-sitemap-diagram` | a Mermaid sitemap derived from user tasks within a depth limit, a task-to-node table and open questions; a first draft untested with users; rests on 1 record |
| skill | `interview-evidence-index` | a session and theme index with timestamps, verbatim quotes only, and a quote audit that reports mismatches |

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
Index this interview transcript by theme and give me the three strongest pain quotes with timestamps.
```

The plugin ships an eval suite (`claude plugin eval plugins/ux-research --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `verbatim-quotes-audit` | interview-evidence-index | 0.00 | 1.00 | 2 |
| `sus-score-five-sheets` | interview-sus-score | 0.00 | 1.00 | 2 |
| `ia-sitemap-six-features` | ia-sitemap-diagram | 0.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
