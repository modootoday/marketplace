---
description: An order flow with an unbounded revise loop, a payment node with only a success exit, and a decision missing an outcome. The check must enumerate nodes and edges and name each finding.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [flow-diagram-completeness-check]
---

Please check this approval-and-payment flow for anything missing before we build it. Arrows are written from -> to.

Nodes: Start, Submit, Review (decision), Approve, Revise, Payment, Receipt, End.

- Start -> Submit
- Submit -> Review
- Review -> Approve [approved]
- Review -> Revise [needs changes]
- Revise -> Submit
- Approve -> Payment
- Payment -> Receipt [success]
- Receipt -> End

There is no limit on how many times a request can go back to Revise. Nobody has said what Review does if the reviewer does not answer.
