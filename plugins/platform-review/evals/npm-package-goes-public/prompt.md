---
description: What public-release-leak-audit should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [public-release-leak-audit]
---

We are about to publish our internal TypeScript SDK `@acme/edge-client` to the public npm registry and make its GitHub repo public. It is built with tsup with sourcemaps on. package.json has "files": ["dist"]. We already ran gitleaks on the repo and it found no secrets, so I think we are good. Code comments are partly in Korean, and the README has examples that call our staging API. Is there anything else to check before we publish? Give me the checklist you would run.
