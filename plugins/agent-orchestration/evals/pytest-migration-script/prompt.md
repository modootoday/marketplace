---
description: What fan-out-script-design should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [fan-out-script-design]
---

I have a workflow tool where a script can call agent(prompt, {schema}), pipeline(items, ...stages) and parallel(...). I want an outline of a script (pseudocode is fine) that converts 380 Python test files from unittest style to pytest style. After converting each file, `pytest <file>` must be run to check it; each pytest run takes about 3 GB of memory, and the machine has 24 GB and is shared with other people. At the end I want a single summary of which files converted cleanly, which failed and why. I may stop the run halfway or an agent may crash, and I do not want to pay for the finished files again. Give me the outline and explain the choices.
