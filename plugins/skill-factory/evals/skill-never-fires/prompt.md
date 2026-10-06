---
description: A skill whose eval shows it never fired. The diagnosis must start with the description.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [eval-iteration]
---

Our skill's eval shows the skill was never invoked in any run, and scores are the same with and
without it. Its frontmatter:

```
name: adr-authoring
description: Record an architectural decision so a later reader can tell whether it still applies.
```

The eval prompt was "Write the decision record for choosing Postgres over DynamoDB." My plan is to
add more rules to the body so it is more useful. Good plan?
