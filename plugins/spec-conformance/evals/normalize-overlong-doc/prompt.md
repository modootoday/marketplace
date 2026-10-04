---
description: A rule document over its length limit. Normalising must split it along its headings, not shorten it.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [document-normalization]
---

Our checker says `sots/billing-rules.md` is 910 lines and the limit is 400. It has five sections:
Proration (210 lines), Refunds (260 lines, most of it the reasons behind each refund rule and the
incidents that produced them), Tax (150 lines), Currency rounding (190 lines) and Glossary (100
lines). Other documents link to it as `billing-rules`. Make it pass the limit. Describe exactly
what you would do to the file.
