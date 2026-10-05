---
description: A student pastes an integration-by-parts solution with an early error and a wrong definite value and asks for the first wrong step. The reply must locate the first error, correct it, verify by differentiating and recompute the value.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [worked-solution-step-audit]
---

I am checking my own calculus homework solution before I hand it in. Here is my work.

Problem: compute the integral from 0 to 1 of x*e^(2x) dx.

My solution: Let u = x and dv = e^(2x) dx, so du = dx and v = e^(2x). Then the integral of x e^(2x) dx = x e^(2x) - integral of e^(2x) dx = x e^(2x) - e^(2x) + C. Evaluating from 0 to 1: (e^2 - e^2) - (0 - 1) = 1.

My answer of 1 feels too small. Find the first wrong step and fix it, and show every step so I can follow.
