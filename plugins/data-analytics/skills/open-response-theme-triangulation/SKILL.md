---
name: open-response-theme-triangulation
description: Turn a set of open survey responses into deduplicated idea groups that keep every response id, merge only ideas with a stated similarity reason, report counts in, merged, unclassified and out and reconcile them to the actual number of responses, process large sets in labelled batches so late responses are not dropped, and compare theme sets from different methods (topic model, human coding, AI themes) in a match and difference table with sample quotes. Use when an analyst has many open-ended responses and wants merged ideas with counts or wants to compare theme sets from different methods. Not for recounting a finished summary table or anonymizing respondents (use survey-recount-and-anonymize), significance testing, or deciding what the themes mean for the business.
metadata:
  tier: open
  level: L4
  domain: data-analytics
  install: optional
  keywords: [open-ended responses, survey themes, idea deduplication, topic model comparison, qualitative coding, response ids]
  verified-runtimes: [claude-code]
---

# Open-response theme triangulation

With many responses, merging by eye drops the ones at the end, repeats the same
idea, or invents a theme nobody wrote. Every idea must trace to response ids,
and the counts must add up to the responses actually received. The analyst owns
the themes; this skill does the bookkeeping and the comparison. Responses are
used as supplied and assumed anonymized.

## 1. Count what came in

State the number of responses received and the id scheme. Count them from the
data, not from the user's description. If ids are missing, assign stable ones
and say so.

## 2. Group ideas with ids

For each idea group: a short label, the member response ids, the count, and one
quote. Merge two responses only when they say the same thing, and write the
reason in a few words ("both: delivery late"). Different aspects of one topic
stay separate unless the user wants a coarser grouping. Never create a group
that no response supports, and never reword a quote.

## 3. Reconcile

Report: received, in groups, unclassified, excluded (with why). The sum must
equal received; say so explicitly or list the gap. Short or vague responses
("ok") go to unclassified with their ids; they are not dropped and not forced
into a theme.

## 4. Large sets

For more than about 100 responses, process in numbered batches (for example 1-100,
101-200), keep a running list of groups, and reconcile after every batch and at
the end. Say how it was batched. If the output starts repeating, stop and
report where.

## 5. Compare methods

When theme sets come from different methods, give a table: theme per method,
matched / partly / only-in-one, the ids or a sample quote behind each side, and
what the boundary differences are (one theme split in two, one merged). Do not
declare one method correct; name what the analyst should check in the raw text.

## 6. Limits

State what was not checked: responses not seen, quote validity beyond the text
supplied, and that grouping is a judgment the analyst confirms.
