---
description: A system prompt with decoration, positional references, an ungated paid tool and a grounding rule left to the model. The review must name what each line costs or prevents.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [prompt-discipline]
---

Review the system prompt of our invoice-editing agent before we ship it. Tell me what to change.

```
You are a helpful, accurate and friendly assistant. Always be polite.
When the user says "change line 3", edit the third line item of the invoice.
Use generate_pdf whenever it would help the user. (generate_pdf is billed at $0.02 per call;
preview_invoice is free and shows the same layout on screen.)
Only cite tax rules you actually retrieved with lookup_tax_rule.
```
