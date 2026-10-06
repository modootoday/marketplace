# product-planning

## What it does

Early product-planning steps that a model tends to rush: sparring on an idea
instead of listing ideas, framing the problem behind a request, synthesizing raw
feedback without overstating it, ranking a backlog while saying where the
ranking is fragile, writing a Korean PRD whose acceptance criteria a tester
can check, and putting a decision on one page with the recommendation first.

## Runtime support

| Runtime     | Supported | Measured on                                         |
| ----------- | --------- | --------------------------------------------------- |
| Claude Code | yes       | 2.1.288, with the eval suite in `evals/` (see Verify) |
| Codex CLI   | untested  | -                                                   |
| Grok CLI    | untested  | -                                                   |
| Gemini CLI  | untested  | -                                                   |

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install product-planning@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add product-planning@modootoday
```

## What it registers

| Kind  | Name                      | Covers                                                                                                   |
| ----- | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| skill | `idea-sparring`           | brainstorm requests: questions first when context is thin, otherwise options argued against and one test |
| skill | `problem-framing`         | a feature request or vague goal turned into a problem statement, drafted first with assumptions marked   |
| skill | `user-feedback-synthesis` | a batch of feedback turned into cited themes, with severe single reports escalated and shares kept to the sample |
| skill | `prioritization-scoring`  | a backlog ranked with visible arithmetic, labelled estimates, close ranks and the assumption that decides the top pick |
| skill | `prd-writing-ko`          | a Korean PRD with non-goals, testable acceptance criteria, edge cases, screen copy in the UI register and marked assumptions; a Korean template is in `references/` |
| skill | `pilot-scope-sizing` | one workflow sized S, M or L on six criteria with a count rule, before a pilot quote, with the split and re-quote rules |
| skill | `customer-discovery-kit` | interview questions tagged by hypothesis, strong, weak and none defined, a decision rule set first, and a demo script marking what exists today |
| skill | `stakeholder-notes-to-requirements-trace` | stakeholder notes, transcripts and legacy specs turned into requirements that each carry a quote, source and date, with solutions tagged, conflicts recorded and gaps left as open questions |
| skill | `project-status-rollup-from-sources` | a weekly status or epic history from several systems, with window, sources queried and unavailable, a link and date per item, and conflicts between systems flagged |
| skill | `project-plan-scope-and-schedule-check` | a charter, work breakdown, schedule check (critical path as a sum, float against the deadline and buffer, cycles) and change order with baseline against new and an approval line; rests on four first-person reports |
| skill | `requirement-to-testable-stories` | a brief turned into stories with Given/When/Then criteria, unmeasurable words flagged with the value to ask for, dependencies, assumptions and feasibility questions; rests on three first-person reports |
| skill | `flow-diagram-completeness-check` | a flow checked by enumerating nodes and edges, then missing branches, dead ends and loops with no exit reported by node name; rests on one first-person report |
| skill | `exec-decision-memo` | a one-page memo: the decision and recommendation first, three options with cost of reversal, the approval asked for |

`user-feedback-synthesis` also covers free-text survey answers: every response accounted for, outliers kept apart from themes, and each theme turned into an action with an owner role and a proposed date; this extension rests on one first-person report.

## Failure mode

None. This plugin registers no hooks and runs no commands. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None. The skills write no file and open no connection.

## Verify

Ask for a brainstorm with almost no context:

```
I'm thinking about adding a referral program to our note-taking app. Can you brainstorm this with me?
```

A working install replies with three to five questions and no list of ideas.

The plugin ships an eval suite. With Claude Code 2.1.288 or later:

```
claude plugin eval plugins/product-planning --no-publish
```

Measured on 2.1.288, 13 cases, 2 or 3 runs per arm, Sonnet as judge for the
last ten cases (Haiku for the first three):

| Skill                     | Cases where the plugin raised the score (without, with) | Cases already passing without it | Negative cases (skill must not fire) |
| ------------------------- | -------------------------------------------------------- | -------------------------------- | ------------------------------------ |
| `idea-sparring`           | 2 (0.0, 1.0) and (0.0, 1.0)                               | 0                                | 1, passed                            |
| `problem-framing`         | 2 (0.0, 1.0) and (0.5, 1.0)                               | 0                                | 1, passed                            |
| `user-feedback-synthesis` | 1 (0.33, 1.0)                                             | 2                                | 1, passed                            |
| `prioritization-scoring`  | 1 (0.0, 1.0)                                              | 1                                | 1, passed                            |

`prd-writing-ko` was added 20261004 and measured on 2.1.289 with Sonnet as judge:
`prd-ko-ui-copy` went from 0.0 without the plugin to 0.67 with it (3 runs per arm), and
`prd-ko-reservation` already passed without it (1.0 and 1.0, 2 runs).

`pilot-scope-sizing` (`size-one-workflow`) and `customer-discovery-kit`
(`discovery-interview-kit`) were added 20261005 and measured the same day with Sonnet as
judge, 2 runs per arm: both went from 0.0 without the plugin to 1.0 with it, and the skill
fired in every run.

`stakeholder-notes-to-requirements-trace` (`notes-conflict-and-solution`) and
`project-status-rollup-from-sources` (`weekly-status-conflicting-sources`) were added 20261005
and measured the same day with Sonnet as subject and judge, 2 runs per arm: both went from 0.0
without the plugin to 1.0 with it, and the skill fired in every run.

`project-plan-scope-and-schedule-check` (`plan-change-order-buffer`), `requirement-to-testable-stories`
(`stories-unmeasurable-export`), `flow-diagram-completeness-check` (`flow-missing-branches`) and the survey
extension of `user-feedback-synthesis` (`survey-themes-to-actions`) were added 20261005 and measured the same
day with Sonnet as subject and judge. Without the plugin every case scored 0.0. With it, after
SKILL.md fixes: `stories-unmeasurable-export` 1.0 and `flow-missing-branches` 1.0 (2 runs per arm);
`plan-change-order-buffer` 1.0 in 4 of 4 runs (one-arm); `survey-themes-to-actions` was
re-recorded 20261005 with Opus as subject and judge on both arms, 2 runs per arm: 0.00 without, 1.00 with
(replacing the earlier Sonnet rows). The skill fired in every run.

`exec-decision-memo` (`memo-for-founder`) was measured 20261004 on 2.1.289 with Sonnet as judge, 2 runs
per arm: 0.00 without the plugin, 1.00 with it (moved 20261006).

A case that already passes without the plugin stays in the suite to catch a
regression, not as evidence that the skill helps.

## License

MIT
