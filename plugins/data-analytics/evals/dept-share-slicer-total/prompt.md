---
description: A DAX share measure with ALL on one table shows a wrong total under a slicer on another table. The reply must name filter context, give a hand-computed check and a per-department scale.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [bi-measure-context-debug]
---

Power BI model: Sales has Amount, DeptID, Region and Month. Sales[DeptID] relates many-to-one to Dept[DeptID], and Dept has Name. Region is a column on Sales, not on Dept.

Measure: Dept Share = DIVIDE( SUM(Sales[Amount]), CALCULATE( SUM(Sales[Amount]), ALL(Dept) ) )

In a matrix of Dept[Name] it looks right. When I put a slicer on Sales[Region] set to East, a department that earned 30 of East's 100 shows 30 percent as I want, but my boss says the grand total row shows 100 percent and wants to know why we cannot trust it, and a colleague says the rows do not sum to the total. Explain what is happening and fix it if it needs fixing. Test numbers: East total 100 split Dept A 30, Dept B 70; West total 200 split A 100, B 100.

Separately, I want conditional colors for a month-by-department matrix where each department is colored between its own lowest and highest monthly value, not one scale for the whole matrix. Nothing can be run here.
