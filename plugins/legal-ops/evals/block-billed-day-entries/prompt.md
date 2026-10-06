---
description: A timekeeper pastes block-billed work notes and client billing rules and asks for compliant entries. The reply must split without changing the total, flag the split as an estimate, respect the increment and banned phrase, add no tasks and list rejects.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [legal-time-entry-client-rules]
---

Please turn my notes for the Example Co matter into time entries I can paste into the system. My notes for today: "3.0h: call with client, review contract, draft email, research case law" and "0.5h: attention to scheduling emails".

The client's billing rules, as sent to us: R1 no block billing, one task per entry. R2 time is recorded in 0.1 hour increments. R3 the phrase "attention to" may not be used. That is all they sent.
