# genealogy-research

## What it does

Family-history research that marks what it does not know. It indexes a surname across volumes with page context, flags same-name risk and lists unreadable pages as gaps, offers uncertain readings of damaged handwriting with the comparison letters used, checks tree exports for impossible dates and relationships without editing them, and keeps evidence, interpretation and open questions apart. Work is on pasted records only; use synthetic or historical data, not living people.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install genealogy-research@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add genealogy-research@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `uncertain-reading-and-mention-index` | surname mentions per volume with page and context, spelling variants and same-name risk, unreadable pages listed as not checked, damaged-handwriting readings marked uncertain; rests on two records (moderate) |
| skill | `family-tree-data-consistency-and-factsheet` | parent-age and date-order checks citing both records, two exports compared by identifier without merging, ancestor sheets with evidence, interpretation and open questions separate; rests on two records (moderate) |
| skill | `genealogy-locality-and-repository-plan` | where to search next for a person, place and period: historical county, parish and diocese fixed per date, record series matched to coverage and custodian from the finding aids supplied, index versus images and online versus onsite stated, and a search log that keeps not searched apart from a documented negative; rests on two firsthand reports and one adjacent experiment |

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin.

## Verify

Ask for something the plugin covers:

```
Here is OCR text of two volumes. Find every mention of the surname and tell me which pages you could not read.
```

The plugin ships an eval suite (`claude plugin eval plugins/genealogy-research --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of
runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `pak-seongho-mentions` | uncertain-reading-and-mention-index | 0.00 | 1.00 | 2 |
| `tree-export-conflicts` | family-tree-data-consistency-and-factsheet | 0.00 | 1.00 | 2 |

A reading or a relationship is never stated as confirmed: the plugin only reports what the pasted records support.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `lund-baptism-boundary-plan` | genealogy-locality-and-repository-plan | 0.25 | 1.00 | 2 of 2 |

## License

MIT
