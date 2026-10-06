---
description: What delegation-decision-and-sizing should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [delegation-decision-and-sizing]
---

I have two jobs and I want to throw agents at both of them, as many as it takes to be fast.

Job 1: our CI fails because the config key `retry_limit` was renamed to `max_retries` in one settings file, and three modules that read it break one after another. Each failure only shows up after the previous module is fixed, because the modules call each other in a chain. Probably about ten edits in total.

Job 2: we have 40 Dockerfiles under services/ and I want to know which of them use an unpinned base image tag such as :latest, and which run as root. Nothing should be changed, I only want a list.

Tell me how you would use agents for each job: how many, which kind of setup, and what you would set before starting. Do not do the work, give me the plan.
