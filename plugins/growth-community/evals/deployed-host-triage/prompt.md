---
description: What hosted-site-prelaunch-smoke should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [hosted-site-prelaunch-smoke]
---

We are launching a real estate listings site tomorrow: a static site with a small Node form handler. Locally everything works (the inquiry form saves, images upload). Here is what I found so far on the deployed host:

- /listing/12 returns 404 when I refresh the page.
- /.env returns 200 and shows our API keys.
- POST /submit accepts requests from any origin and has no rate limit.
- Google Analytics hits fire before the visitor clicks the consent banner.
- The listings API returns 8 of our 11 properties, with no error.

Triage this before launch.
