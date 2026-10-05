---
description: What skill-package-scaffold should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [skill-package-scaffold]
---

I'm adding a skill to our repo's .agents/skills folder. It helps support staff decide whether a late-delivery complaint qualifies for a shipping refund (rule: refund if delivery was more than 3 business days late, except during declared holiday periods). It has a policy PDF summary we want it to consult and a small Python script that counts business days. My draft frontmatter is below and pmcp validate rejects it. Fix it, and give me the full folder layout plus the test cases this skill should ship with.

```
---
name: Late_Delivery_Refund_Checker
description: refunds
allowed-tools: [Read, Bash]
---
```

The folder is currently named late-delivery-refund.
