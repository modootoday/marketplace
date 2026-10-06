---
description: What search-engine-submission should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [search-engine-submission]
---

Our marketing site www.brandkorea.example just launched and I want it in Google from our headless CI server (no browser). Tell me how to get it submitted, step by step.

What I know:
- We own brandkorea.example; DNS is in Cloudflare and our pipeline can write DNS records.
- The DNS zone has A/CNAME records for www, shop, docs, admin, api and status.
- Deploy config routes: www (marketing site), shop (store), docs (documentation) are public. admin and api require login. status is a public page run by a vendor.
- Last night I fetched https://www.brandkorea.example/sitemap.xml: it lists `http://www.brandkorea.example/...` URLs (http, not https) and has no lastmod. /pricing returns 200 but has `<meta name="robots" content="noindex">` that someone left from staging.
- robots.txt contains only `User-agent: *` and `Disallow: /admin`.
