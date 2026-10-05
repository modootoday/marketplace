---
name: customer-discovery-kit
description: Build a customer discovery kit that tests named hypotheses instead of collecting compliments - an interview questionnaire in blocks (situation, tool mix, procedures and authors, operating pain, trust and security, willingness to pay, close) with each question tagged by the hypothesis it tests, a record table with strong, weak and none defined, a decision rule written before the first interview, and a 15-minute demo script that marks what exists today versus what is still to be built. Use when preparing customer interviews, validating a B2B offer before building it, or turning hypotheses into interview questions and a go or no-go rule. Not for synthesizing feedback already collected or for writing a survey to existing users.
metadata:
  tier: open
  level: L2
  domain: product-planning
  install: optional
  keywords: [customer discovery, customer interview, hypothesis validation, questionnaire, demo script, B2B validation, willingness to pay]
---

# Customer discovery kit

Interviews fail as evidence when the questions ask for opinions ("would you
use this?"), when answers are recorded as impressions, and when the bar for
"validated" is set after the answers are in. The kit fixes all three before
the first call.

## 1. Hypotheses first

Write two to four hypotheses, each one falsifiable sentence about a customer
and a problem: "Teams that share AI instructions by copying files lose track
of which version each person uses." Give each an id (H1, H2, ...). A question
that tests no hypothesis is cut.

## 2. Questionnaire blocks

Ask about the past, not the future: what happened last time, not what they
would do. Tag every question with its hypothesis.

| Block | Example questions | Tests |
| --- | --- | --- |
| Situation | Team size, roles, what the team does in a week | context for all |
| Tool mix | Which AI and work tools does each role use today? Who chose them? | H1 |
| Procedures and authors | Which rules or templates do people apply repeatedly? Who writes and updates them? When did one last change? | H1, H2 |
| Operating pain | Tell me about the last time someone applied an old or wrong rule. What did it cost, in rework, time or money? | H1, H2 |
| Trust and security | What did your last security review ask about a new tool? What would block approval? | H3 |
| Willingness to pay | What do you pay today for the closest substitute? Who signs off a purchase of this size? Would you join a paid pilot at a stated scope? | all |
| Close | Who else has this problem? May we follow up with a pilot proposal? | pipeline |

Keep the price question last and concrete (a scoped pilot, a stated fee). A
friendly "that would be worth a few dollars a seat" is a floor, not the
maximum they would pay, and naming a low number early caps you there.

## 3. Record table

One row per interview, filled within a day, with the evidence quoted.

| Interview | Segment | H1 | H2 | H3 | Evidence (quote or event, date) | Paid pilot | Conditions |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | | strong / weak / none | | | | yes / conditional / no | |

- **Strong**: a concrete instance of the problem in the last two months, with
  what it cost.
- **Weak**: they agree it is a need but name no instance.
- **None**: no problem, or already solved in-house (shared folder, version
  tags, their own tooling).

Use numbers, not company names, in any table that is shared; keep the name
key separately. Before reporting totals, recount them from the rows (see
survey-recount-and-anonymize).

## 4. Decision rule, before the first interview

Write the bar and the action for each outcome, then do not move it. Example:

> Go when one hypothesis has 3 or more strong rows and at least 1 company
> agrees to a paid pilot at a stated scope. Below that after the planned
> interviews: revise the hypothesis or stop.

Public posts, likes and view counts are not interviews: their authors'
companies and roles are unverified. Record them as context, never as rows.

## 5. The 15-minute demo script

Show the problem in the customer's terms, then the smallest working path.
Mark each step honestly; a customer who later finds a built-looking step was
a mock-up stops trusting the rest.

| Minute | Step | Status |
| --- | --- | --- |
| 0-2 | Their problem restated from the interview, in their words | - |
| 2-6 | The working path end to end on a realistic example | exists today |
| 6-9 | The control they asked about (approval, rollback, audit) | exists today / to be built (say when) |
| 9-12 | What the pilot would deliver, scope and measures | proposal |
| 12-15 | Questions; ask for the pilot decision and the decision maker | - |

## 6. After the interviews

Synthesize the notes with user-feedback-synthesis (themes with interview ids,
severity apart from frequency), then apply the decision rule to the recounted
table.

## Output

1. Hypotheses with ids.
2. The questionnaire, each question tagged.
3. The empty record table with the strong, weak and none definitions.
4. The decision rule and the action for each outcome.
5. The demo script with each step marked exists today or to be built.
