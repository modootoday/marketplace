# engineering

## What it does

Engineering document procedures: work instructions from field notes, clause location with verbatim quotes, sourced spec tables and fault evidence logs.

Maintenance schedules built from equipment manuals are available to signed-in users.

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
claude plugin install engineering@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add engineering@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `procedure-document-from-field-notes` | field steps turned into a work instruction and flow with every branch kept, an owner field per step, gaps as questions and a safety-owner review list (rests on weak records) |
| skill | `standards-clause-locator` | clause number and wording quoted verbatim with edition, report and clause values compared by number, unit and condition, not-found stated (rests on weak records) |
| skill | `datasheet-spec-table` | spec table with each value traced to a source document and date, unverified cells marked, price left to check (rests on weak records) |
| skill | `fault-diagnosis-evidence-log` | discriminating questions and an evidence log that rules causes out without naming one, safe next checks only (rests on two records) |

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
Which clause of this pasted spec governs the minimum pipe cover, and does the site report meet it?
```

The plugin ships an eval suite (`claude plugin eval plugins/engineering --no-publish`). Measured
on Claude Code 2.1.289; the score is the share of runs that passed every grader, without the
plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject / judge |
| --- | --- | --- | --- | --- | --- |
| `pump-filter-work-instruction` | procedure-document-from-field-notes | 0.00 | 1.00 | 2 | Opus / Opus |
| `bearing-capacity-clause-check` | standards-clause-locator | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `scope-spec-table` | datasheet-spec-table | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `motorcycle-wont-start-log` | fault-diagnosis-evidence-log | 0.00 | 1.00 | 2 | Opus / Opus, both arms, 20261005 (after a SKILL.md fix: the question numbering is the ranking, so a later question is never called the most useful) |

The plugin reads only what you supply, quotes no standard text, limit or rating of its own and gives
no compliance, diagnosis or repair decision; a qualified engineer and the maker's manual govern.

## License

MIT
