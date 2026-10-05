---
description: What purchase-request-intake-and-stage-check should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [purchase-request-intake-and-stage-check]
---

Request received by email: "We need 20 laptops for the new team, ASAP, budget about 30k, Dana approved".

Our stage rules: requisition needs cost center, spec and quote. PO needs an approved requisition. Goods receipt needs a PO. Payment needs an invoice and a goods receipt.

Tracking record: requisition approved by Dana, no quote attached, PO not created.

What is missing and what is next?
