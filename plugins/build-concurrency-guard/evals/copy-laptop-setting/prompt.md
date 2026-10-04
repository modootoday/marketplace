---
description: A thread setting carried between machines. The answer must re-measure on the shared host and weigh CPU time, not only wall-clock.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [concurrency-policy]
---

On my laptop, setting the bundler to 16 worker threads cut our build from 70 s to 41 s. Our CI
runner is a shared 4-core VM that also runs three other teams' jobs. Can I just set 16 threads in
CI too?
