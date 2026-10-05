---
description: What search-query-regex-filter should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [search-query-regex-filter]
---

In Search Console I want a "brand" segment for our product name acme using the regex query filter. It should include these queries: "acme", "acme login", "acmee" (a common typo). It should exclude "pacme" (an unrelated company) and "acme alternative" (shoppers comparing, we count those as non-brand). Write the regex.
