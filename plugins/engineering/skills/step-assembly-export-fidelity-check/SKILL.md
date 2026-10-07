---
name: step-assembly-export-fidelity-check
description: Compare CAD assembly occurrences, placements and approved physical dimensions with receiving STEP observations. Use when exported geometry looks correct but scale, linked instances or required metadata differ. Not for constructing CAD, validating kinematics or certifying manufacture.
metadata:
  tier: open
  level: L3
  domain: engineering
  install: optional
  keywords: [step, cad, assembly, occurrence, placement, units]
  verified-runtimes: [codex-cli]
---

# STEP assembly export fidelity check

Count part definitions and placed occurrences separately. A receiver can show the same number of shapes while repeating a placement or interpreting physical dimensions incorrectly.

## Set the source contract

Record source artifact identity and approved export scope, including hidden or excluded components. Build an occurrence table with source occurrence ID, referenced definition, placement/transform, and approved physical dimensions with units/tolerances. Repeated uses of one definition remain separate occurrences.

Record export protocol/options, assembly mode and unit setting, plus required names/colors/layers only when the owner requests them. Identify the receiving tool/version/import route and supplied observations. A unit label alone does not establish that numeric geometry was converted.

## Compare source and recipient

Map each expected occurrence to its imported counterpart. Check count, identity and placement independently, including linked, mirrored or negative-scale components. Flattening, missing instances and duplicated placements are distinct findings; do not replace occurrence parity with unique-definition count.

Convert independently approved dimensions into a common physical unit and compare with the stated tolerance. Keep numeric extent, declared unit and interpreted physical extent separate. Report dimension mismatch even when the render looks plausible.

Check requested metadata independently from geometry. Basic shape transfer and metadata-capable transfer have different scope. Do not assume an exporter option guarantees receiving behavior or that all STEP consumers preserve the same fields.

## Evidence and output

Use approved controls and exact supplied import/reimport evidence. Label supplied values as supplied, not as exports or CAD runs performed by you. If source placements, dimension units/tolerance or recipient observations are missing, hold those findings as unverified and ask for them; a shapes summary is insufficient.

Return occurrence/definition/placement crosswalk, physical dimension deltas, requested metadata parity, export/recipient environment and unresolved branches. State a bounded match or a blocked fidelity endorsement. Do not silently rescale or restructure the assembly. Any proposed correction requires preserved source and a new authorized receiving check.

This does not certify mesh topology, kinematics, manufacturability or safety, and does not approve machine execution. [OCCT STEP guide](https://occt3d.com/dev/doc/overview/html/occt_user_guides__step.html) describes assembly representations, unit conversion and basic versus metadata translation; check actual exporter/recipient versions and observations.
