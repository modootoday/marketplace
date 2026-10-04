---
description: A plain SQL question. The prompt skill must not fire.
max_turns: 4
allowed_tools: [Read, Glob, Grep, Skill]
tags: [prompt-discipline, negative]
---

Write a SQL query that returns the ten customers with the highest total order amount from tables
customers(id, name) and orders(id, customer_id, amount).
