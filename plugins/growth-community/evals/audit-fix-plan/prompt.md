---
description: What seo-audit-to-fix-plan should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [seo-audit-to-fix-plan]
---

Our site audit export has three issue types: 40 URLs flagged "duplicate title", 25 URLs flagged "redirect chain", and 12 pages flagged "404 in internal links". For the duplicate titles, 3 of the 40 are /blog/page/2, /blog/page/3 and /blog/page/4 (a paginated blog index); the other 37 are product pages whose title template omits the product name. Content we have: /guide/setup says in paragraph 3 "Create your API keys before the first sync", and the page /docs/api-keys exists and returns 200. We have no other page list. Produce the fix plan, and also give one more internal link suggestion from /guide/setup to /pricing if you think it helps.
