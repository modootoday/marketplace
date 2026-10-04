---
description: A rule that will decay unless the document can fail. The document must carry a command that checks the rule.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [sot-authoring]
---

Write the source-of-truth document for this rule in our TypeScript monorepo: source files under
packages/*/src never use default exports. We adopted it after two packages shipped the same
default export under different import names and a refactor missed one of them.
