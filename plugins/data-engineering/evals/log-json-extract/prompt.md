---
description: Mixed-unit log lines and JSON with a variable price field must be extracted to typed columns and plotted. The reply must handle units, bad types, row reconciliation and axis units.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [semi-structured-field-extraction]
---

Extract the data below into columns and plot temperature over time.

Log lines from a bench logger (timestamp, then fields):
2026-03-02T10:00:00Z T=21.4C ch3 ok
2026-03-02T10:01:00Z T=70.5F ch3 ok
2026-03-02T10:02:00Z ch3 fault

Separate JSON order documents have a field price that is sometimes the string "12.50", sometimes the number 12.5, sometimes missing, and once an array [12.5, 13.0].

I want typed columns for both, and the chart. You cannot run code or see the full files here; the three log lines and the price variants are all I have.
