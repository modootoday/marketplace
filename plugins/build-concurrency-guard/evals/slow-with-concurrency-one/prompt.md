---
description: A build still slow with task parallelism at one. The answer must find the tool's own worker pool and say how to measure it.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [concurrency-policy]
---

Our monorepo build runs through a task runner with `--concurrency=1`, yet on our 8-core CI box it
still keeps every core busy for the first 90 seconds before any task starts, and `time` shows
system time about three times user time. What is going on and what should we try?
