---
description: What workforce-metrics-readout should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [workforce-metrics-readout]
---

As of 2025-07-15, I need 90-day attrition by department for people hired in Q1 2025 (2025-01-01 to 2025-03-31). Our reporting rule is to publish no rate for a department with fewer than 4 people in the cohort. These are synthetic rows, 12 in total.

id, department, hire date, exit date
E01, Sales, 2025-01-06, 2025-02-14
E02, Sales, 2025-01-13, (still employed)
E03, Sales, 2025-02-03, 2025-06-20
E04, Sales, 2025-02-17, 2025-03-31
E05, Sales, 2025-03-10, (still employed)
E06, Support, 2025-01-20, 2025-04-10
E07, Support, 2025-02-10, (still employed)
E08, Support, 2025-03-03, 2025-05-15 (moved to Sales on 2025-04-07, left from Sales)
E09, Support, 2025-03-17, (still employed)
E10, Finance, 2025-01-27, 2025-03-05
E11, Finance, 2025-02-24, (still employed)
E12, Finance, 2024-12-16, 2025-01-30
