---
description: What ocr-transcript-risk-flagging should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [ocr-transcript-risk-flagging]
---

I need to rely on two machine outputs for a file review. Review them for risky spans.

OCR of a scanned clinic note (line numbers added by me):

L1: Pt seen 03/l5/2O22.
L2: Metformin 5OOO mg daily.
L3: Denies chest pain. BP l2O/8O.

Automatic transcript of a poor-quality recording:

[00:01:10] Speaker 2: Did you sign the receipt on Friday?
[00:01:14] Speaker 2: Yes, I signed it before noon.
[00:01:20] Speaker 1: (unintelligible) the amount was nine hundred.
