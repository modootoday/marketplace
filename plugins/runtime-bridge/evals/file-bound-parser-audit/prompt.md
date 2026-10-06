---
description: Prepare a runnable headless handoff to another runtime without inline-only context.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [cross-runtime-delegation]
---

Offload a read-only audit to Codex CLI and give me the handoff I can run. Do not execute it here.
The peer should inspect src/parser.py and tests/test_parser.py for inconsistent handling of empty
fields, then report defects with minimal reproductions. The acceptance command is
`python -m pytest tests/test_parser.py -q`. It must not fix anything or edit tests. Use the model
already configured in Codex. Included subscription billing is available, with no paid overflow.
I can spend five minutes on one attempt. I need a report I can inspect after the process exits.

Last time the other CLI said "all tests passed", but the returned patch had touched a shared
test helper, so we had to start over. Make this handoff usable from a clean job directory.
