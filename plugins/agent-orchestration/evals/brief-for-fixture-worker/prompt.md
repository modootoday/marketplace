---
description: What subagent-brief-and-handback should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [subagent-brief-and-handback]
---

I am about to start a subagent for one task and I want you to write the prompt I paste into it. The subagent will not see this conversation.

Task: regenerate the sample data files for the "invoices" module under data/samples/invoices/ so that each file matches the new schema in docs/invoice-schema.md. There is a validator command, `npm run validate:samples -- invoices`, that must pass.

Facts the subagent needs:
- Other agents are working on the "orders" and "refunds" modules in the same checkout at the same time. They write to data/samples/orders/ and data/samples/refunds/ and also use a scratch folder tmp/out/ for their own intermediate files.
- All modules are listed in data/samples/index.json. The new "invoices" entry must be added there, but several agents will need to add entries.
- Each sample file gets a "severity" field in its metadata that the downstream dashboard reads. It should say how serious a validation problem in that file would be.
- Last time an agent kept rerunning the validator and rewriting the schema document until the check passed.

Write the prompt for the subagent, and describe what it should send back to me.
