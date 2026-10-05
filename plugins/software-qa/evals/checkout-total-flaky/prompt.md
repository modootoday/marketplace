---
description: An order-dependent test failure. The reply must keep the cause a hypothesis, propose isolating reruns and write a note with confirmed and suspected sections.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [defect-triage-evidence]
---

Is this flaky or a product defect? Write up the investigation.

Our regression test `checkout_total` failed in 3 of 20 pipeline runs. In every failing run the test `coupon_expiry` ran immediately before it. In the 17 passing runs `coupon_expiry` ran later or in a different job. When it fails, the assertion shows the order total is 0 instead of 12,500 KRW. Nothing else changed between runs, and we have not rerun the test alone.
