---
name: agents-md-budget-trim
description: Cut a package's thin rules file (AGENTS.md or CLAUDE.md) under its byte budget by keeping only constraints there and moving everything else verbatim to the long-form document, settling any contradiction between the two by measuring the code, and keeping links from the thin file to the long form. Use when an AGENTS.md is over its size budget, when trimming or splitting a package rules file, or when the rules file and the long-form package doc disagree. Not for writing a package README or projecting rule files into agent filenames.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [AGENTS.md, CLAUDE.md, rules file budget, trim rules, package doc, long-form rules]
---

# Trimming a thin rules file under its budget

The thin rules file loads every session, so it has a byte budget. The tempting fix is to
summarise it until it fits. That loses rules, and the summary is a third version that now
disagrees with both the original and the long form.

## Steps

1. Measure the file and the budget. Note the long-form document's own cap (lines or bytes) too,
   so the move does not push it over.
2. Classify every line of the thin file:
   - a constraint: something the agent must or must not do in this package, that would cause a
     wrong change if missed. It stays.
   - everything else: background, rationale, examples, command catalogues, history. It moves.
3. Move, do not rewrite: cut the non-constraint text and paste it verbatim into the matching
   section of the long form. Rewording during a move is how meaning drifts.
4. Leave a link from the thin file to each section that received text, so the agent knows the
   detail exists and where.
5. Where the thin file and the long form say different things, do not pick the one that reads
   newer. Check the code: grep for the API, flag, path or command each version names and keep
   the one the code matches. In measured cases the long form was the correct one about a third
   of the time, so neither document is a safe default. Record which way each conflict went.
6. Re-measure both files against their budgets.

## Report

Before and after sizes against the budget, the sections moved and where, and each contradiction
with the evidence that settled it (file and line in the code).
