---
name: competitive-research-brief
description: Turn pasted excerpts of public pages (competitor sites, a prospect's pages, pricing or positioning copy) into a comparison brief for sales or marketing - the same dimension rows for every company, each claim tied to its source page and date, stated facts kept apart from inference, and a gap list of what the excerpts do not say. Use when someone pastes page text and asks for a competitor comparison, a positioning summary or an account brief. Not for browsing the web, for facts that are not in the pasted text, or for judging a person.
metadata:
  tier: open
  level: L3
  domain: sales-ops
  install: optional
  keywords: [competitor, positioning, account research, comparison table, sourcing, brief, sales enablement]
  verified-runtimes: [claude-code]
---

# Competitive research brief

A brief is only as good as its sources. Work from the excerpts the user pasted; do not add
what you remember about a company and do not claim to have browsed anything.

## Steps

1. Label each excerpt as source S1, S2 ... with its page or URL and its date as the user gave
   them. If a date is missing, write "date not given".
2. Fix the comparison dimensions once (for example target customer, headline promise,
   pricing, proof such as customers or numbers, integrations) and use the same rows for
   every company. A cell with no information in the excerpts says "not stated in S1",
   never a guess and never a blank.
3. Every claim in a cell ends with its source tag and, for numbers and promises, a short
   verbatim quote ("up to 40% faster", S2).
4. Keep two layers: Stated (what the page says) and Inference (what you conclude, such as
   "targets small teams"). Mark each inference as inference with the words it rests on.
   Marketing copy is a claim by the company, not a verified fact.
5. List what needs outside checking and which you cannot do from pasted text: current
   pricing, anything that needs browsing, customer reviews, funding. Say it was not
   checked.
6. Do not mix in outside facts presented as sourced. If you add background from memory, put
   it under a separate heading "not from the excerpts, unverified".

## Output

A source list; the comparison table (rows are dimensions, columns are companies); a short
Inference list; a Gaps and not-checked list. Read `references/brief-layout.md`.
