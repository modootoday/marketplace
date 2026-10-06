---
name: interactive-simulation-reference-check
description: Validate a browser simulation or visual demo (physics, flocking, cloth, terrain, shader, data sonification) against a known result and measured performance - compute the error against an analytic or reference value, test timestep convergence, check units between graph and 3D view, rule limits, state persistence and reset, data-to-view mapping, and frame time and memory on stated devices, and never report a figure that was not measured. Use when someone built an interactive demo with an AI assistant and asks whether it is correct, accurate or fast enough to publish. Not for building the demo, calculators and spreadsheets, or designing the visuals.
metadata:
  tier: open
  level: L3
  domain: interactive-web-demos
  install: optional
  keywords: [simulation, physics demo, timestep convergence, frame time, webgl, reference check]
  verified-runtimes: [claude-code]
---

# Interactive simulation reference check

Creators publish AI-built physics, flocking, cloth, snow-terrain and shader demos that look
right, and report fixes later for things like a flipped view direction, an unbounded speed or
a click that selects the wrong item. This skill tests a finished demo against something known.
It does not build or restyle the demo; for spreadsheet-style calculators, use
`calculator-reference-case-verification` when installed.

## Steps

1. Pick the reference: an analytic result (for a small-angle pendulum, the period 2*pi*sqrt(L/g)),
   a reference numerical solution, or for a data demo the source values. State its source.
   A demo that cannot be matched to a physical measurement, such as cloth stiffness, is a
   concept demo: label it so.
2. Compute the error for each measurement as a number against the reference, as a percent
   and in the unit used. For a time-stepped simulation run at least three steps (for example
   dt, dt/5, dt/50) and check that the error shrinks as the step shrinks. Say plainly that a step
   whose error is large for the purpose is too inaccurate to publish, and name the largest
   measured step you would accept and why; use a stated tolerance if the user gave none.
3. Check units and conventions between every view of the same state: degrees against radians,
   axis direction, handedness, scale between graph and 3D view. A mismatch in the units the
   views use is a defect to fix, listed as one; the fix is to convert or relabel so both
   views use one unit.
4. Check rules and state: speed and force limits are enforced, parameter ranges are clamped,
   persistent state (footprints, deformation) stays and resets when asked, and what the user
   selects is what the view shows (selection coordinates against the data record).
5. Performance: report frame time and memory only for the devices actually measured, with
   the device named. List every other device or condition as not tested. Do not extrapolate
   a mobile figure from a desktop one. Do not compare a measured frame time with a budget
   the user did not state (such as 60 fps), and do not derive other figures from it (steps
   per frame, memory); quote the measured number, its device and the setting it was taken at.
6. Say which checks could not be run from the material given.

## Output

A table (check, measured, reference or limit, result), the largest acceptable step, the
list of fixes in priority order, and a "not tested" list. The creator decides what to ship.
