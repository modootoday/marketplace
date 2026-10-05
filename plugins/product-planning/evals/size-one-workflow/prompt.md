---
description: A workflow with one L criterion and one M. Sizing must apply the count rule and come out M, not L.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [pilot-scope-sizing]
---

We size every pilot (turning one customer workflow into an AI skill) as S, M or L before quoting. Our rule: mark six criteria (where the rules live, rules and exceptions, evaluation cases, data and tool links, approval steps, security conditions) S/M/L; two or more L marks make it L, otherwise two or more marks at M or above make it M, else S.

From today's scoping call with an online furniture shop, workflow "answer delivery-delay inquiries":
- The rules are already written in a 3-page support guide.
- About 10 rules and 2 exceptions.
- They want about 3 normal, 3 exception and 3 missing-information test cases.
- The skill must read order status from their order system (read only).
- No approval step: agents send the answer directly.
- Inquiries contain customers' names, addresses and phone numbers, and the shop wants its data kept isolated from other customers of ours.

Our salesperson says "personal data, so it's L". What size is it, and what should we tell the customer before quoting?
