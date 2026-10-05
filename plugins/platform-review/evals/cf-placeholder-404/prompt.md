---
description: What cf-placeholder-404 should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [cf-placeholder-404]
---

old-brand.example has a Cloudflare dynamic redirect to our new domain and its DNS points at 192.0.2.1. We want it to stop redirecting and just return 404. We are on the free plan and the WAF custom response API returned 'not entitled to use a custom response'. What exactly should I do?
