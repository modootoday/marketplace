---
name: abuse-rule-authoring
description: Turn an abuse signal into a detection rule that can be trusted - a precise definition, thresholds chosen on labelled data with precision and recall reported, an explanation a reviewer can check, an appeal path, and monitoring for drift - before it affects any account. Use when writing or changing a fraud, spam or fake-review detection rule, a risk score feature, or a moderation threshold. Not for brainstorming signals or handling a single report.
metadata:
  tier: open
  level: L3
  domain: trust-safety
  install: optional
  keywords: [detection rule, abuse rule, fraud threshold, precision recall, moderation rule]
---

# Writing an abuse rule

A rule that flags people acts on them. It needs the same rigour as code that
moves money: a definition, a measurement, a reason it can show, and a way back.

## Define

- The exact condition in terms of stored fields, windows and thresholds, with
  the query or code that evaluates it.
- What the rule does on a hit: score, flag for review, limit, block. The stronger
  the action, the higher the precision it needs.

## Measure before shipping

- Evaluate on a labelled sample that includes legitimate look-alikes, not only
  known abusers. Report precision and recall with the sample size and how labels
  were made.
- Choose the threshold from that curve for the action's cost: blocks need high
  precision; review queues can take more recall.
- Shadow mode first: log hits without acting, review a sample, then turn on.

## Explain

Each hit records the evidence that fired (values, matched items, related
accounts) in words a reviewer and, where appropriate, the affected user can
understand. "Score 0.83" alone is not an explanation.

## Appeal and correction

A path for the affected party to contest, someone who reviews it within a stated
time, and a way to correct both the decision and the rule when it was wrong.

## Monitor

Hit rate over time, appeal overturn rate, and drift in the input data. A sudden
jump is a bug or an abuser adapting; both need a look before more actions.

## Output

The rule card (definition, action, threshold, metrics, sample), the evaluation
query, and the shadow-mode plan.
