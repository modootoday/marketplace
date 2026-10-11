---
description: subtitle-media-timebase-check explicit verification contract
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [subtitle-media-timebase-check, video-workflow-20261010]
---

Prepare a subtitle/media clock verification contract from this synthetic report. All anchors are elapsed seconds. Current edit is M2 and cues are V2. Fit anchors: source0 -> media1 and source100 -> media101. Independent held-out anchor: source50 -> media51. Independent cut-adjacent anchor: source60 -> media63. Accepted absolute residual tolerance is0.1 seconds. V2 includes cueA source50–52 and cueB source51–53; their overlap is intentional. The only saved-player check was for old editM1/cuesV1, not the current pair. No actual files or playback observations beyond this report are supplied. Calculate the fit, predictions and residuals, state scoped pass/fail/unknown decisions, and explain the additional cut-region and current saved-player observations needed before acceptance. Give the next safe action while preserving cue content and intended overlap. Do not retime files, render, play media or invent test results. Equivalent tables, residual-sign conventions stated clearly and wording are acceptable.
