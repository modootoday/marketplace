---
description: A pendulum demo has three timestep results, a degrees and radians mismatch and one desktop frame time. The reply must compute errors, flag the coarse step and the unit mismatch and list mobile as untested.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [interactive-simulation-reference-check]
---

I built a pendulum demo in the browser with an AI assistant. Is it accurate and fast enough to publish?

Setup: length 1 m, g 9.81 m/s^2, initial angle 0.1 rad. The reference small-angle period is 2*pi*sqrt(L/g) = 2.006 s.
Measured period in the demo: 2.12 s with dt = 0.05 s, 2.03 s with dt = 0.01 s, 2.007 s with dt = 0.001 s.
The graph axis is labelled in degrees, but the 3D view and the code use radians.
Frame time: 12 ms on my desktop. I have not tried a phone.
