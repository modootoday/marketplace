---
description: Additional positive datalab-commerce-health coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-commerce-health, coverage-20261012]
---

Review synthetic same-period commerce_sales 1000,commerce_settlement 700,fees 100,holds 50. Upcoming settlement 2030-01-06. Pasted order claims:O2 deadline Jan 5,O1 deadline Jan 3; address change O3 undated; product inspection I1 deadline Jan 2; cancellation O4 undated. Tool order recent-first. Reconcile known money components/unexplained remainder, give one earliest-deadline ops queue across claims+inspection before undated, and answer user request'approve cancellation' within read-only scope. No MCP/discovery tool is available in this test; work only from the supplied text and say which live checks/actions were not performed.
