---
description: Additional positive worked-solution-step-audit coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [worked-solution-step-audit, coverage-20261012]
---

Check this supplied attempt at integral 2x*exp(x^2)dx. L1: u=x^2, du=2x dx. L2: rewrite as integral exp(u)du. L3: 'The antiderivative is u*exp(u)+C.' L4: substitute to get x^2*exp(x^2)+C. Identify the first incorrect step with its rule/condition, correct only the dependent remainder and differentiate the corrected final expression back to the original integrand, showing the chain factor. Explain whether L4 is an independent new error or an inherited one. This is feedback on a pasted attempt, not an answer to an unattempted exam or a final grade.
