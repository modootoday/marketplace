---
description: What chrome-store-policy-review should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [chrome-store-policy-review]
---

Our Chrome extension only adds a button to Naver blog editor pages, but the manifest requests <all_urls> host permission and 'tabs', and it loads a config script from our CDN at runtime. It was rejected. What should we change?
