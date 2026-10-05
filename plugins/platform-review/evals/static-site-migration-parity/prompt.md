---
description: What static-site-migration-parity should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [static-site-migration-parity]
---

We are moving our docs site (about 400 pages, built with Jekyll, hosted on GitHub Pages) to an nginx container on our own server, and switching to a different Markdown renderer. How do we make sure no URL breaks and the pages render the same before we switch DNS?
