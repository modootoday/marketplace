---
description: A maintainer asks to triage a stale issue, a possible duplicate and a pull request. The reply must not call the issue fixed, must list duplicate differences, must spot the test input gap and leave decisions to the maintainer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [oss-issue-pr-triage]
---

I maintain a small date library. Triage these for me and tell me what to close or merge.

Issue #812 (opened 2023): "parse_date crashes with IndexError on input like '2023-5'".
Issue #1034 (opened 2024): "parse_date returns None for '2023-5' on Windows".
Pull request #1101 "fix parse_date": changes the split logic so the month is padded, and adds one test, for the input '2023-05' only.
Current main has commit abc123 "handle short month", which touches the same function. Nobody has run the reproduction on current main. I have no checkout here, only this text.
