---
name: pilot-scope-sizing
description: Size one workflow as S, M or L before quoting a pilot that turns it into an AI skill - mark six criteria (where the rules live, number of rules and exceptions, evaluation cases, data and tool links, approval steps, security conditions), apply the count rule, show each mark with its evidence, and flag an L that will not fit a two-week pilot so it can be split before the quote. Use when preparing a quote or pilot proposal for building a skill or agent workflow, after a scoping call, or when someone asks how big a skill build is. Not for setting the prices themselves or for estimating a software project in hours.
metadata:
  tier: open
  level: L2
  domain: product-planning
  install: optional
  keywords: [pilot sizing, scope sizing, quote, skill build, workflow size, S M L, scoping call]
---

# Pilot scope sizing

A quote for turning a workflow into a skill goes wrong in two ways: the size
is a gut feeling, so two similar workflows get different quotes, or one
impressive criterion (personal data, an expert-only rule) makes everything L.
Size on six written criteria and a fixed count rule, in the scoping call,
before any number is said.

This skill sizes only. The company supplies its own price per size; nothing
here sets or suggests one.

## The six criteria

Mark each criterion S, M or L from what the customer showed, not what they
hoped.

| Criterion | S | M | L |
| --- | --- | --- | --- |
| Where the rules live | already written down | partly written, filled in by interviewing the owner | only in experienced people's heads (several interviews) |
| Rules and exceptions | about 10 rules, 3 or fewer exceptions | about 30 rules, 10 or fewer exceptions | more than that, or exceptions are most of the judgement |
| Evaluation cases | 3 or fewer each of normal, exception and missing-information | about 5 each | 10 or more each, or a numeric pass bar agreed with the customer |
| Data and tool links | none (pasted input only) | one read link | two or more read links, or any write link |
| Approval and human steps | none | one approval before the result is final | several approval steps, or a person confirms amounts or sensitive judgements |
| Security conditions | ordinary work material | some customer information, input scope must be limited | personal data, per-customer isolation, or a data-path review |

The counts are starting values. Once a few pilots are done, recalibrate them
against the hours the work actually took.

## The count rule

- Two or more criteria marked L: **L**.
- Otherwise, two or more criteria marked M or L: **M**.
- Otherwise: **S**.

So one L with three M is M, and one L with everything else S is S. A single
heavy criterion does not make the workflow L; write it down as the risk to
watch instead.

## Procedure

1. In the scoping call, get a sample of the real material: the rule document
   or the person who holds the rules, three real cases, the systems the work
   touches, who approves the result, what data it contains.
2. Mark each criterion with one line of evidence ("rules: 2-page FAQ plus
   interview with the team lead" is M).
3. If a criterion cannot be judged from what was shown, mark the higher size
   and say what would lower it.
4. Apply the count rule and show the arithmetic (L count, M-or-above count).
5. Check the two-week fit (below), then hand the size to whoever prices it.

## An L that will not fit two weeks

When the rules live only in experts' heads and the workflow needs two or more
data or tool links, it may not finish in a two-week pilot. Before quoting,
agree with the customer either to split it into two workflows sized
separately, or to lengthen the pilot.

## Changing the size

- If, after the scoping call, the real rules and exceptions turn out much
  larger than sized, re-quote once, before work starts.
- Scope that grows after work starts is not re-sized; it goes to maintenance
  or change support.

## Output

1. A table: criterion, mark, evidence.
2. The count and the resulting size.
3. Risks: any single L that did not decide the size, and criteria marked
   high for lack of evidence.
4. Two-week fit: fits, or split or lengthen with the proposed split.
5. The re-quote condition, stated for the customer.
