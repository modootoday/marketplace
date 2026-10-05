---
description: A designer pastes an approved storyboard quiz item and text block and the imported module versions. The reply must diff block by block, catch the moved key, dropped option and truncation, and change nothing.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [authoring-import-fidelity-check]
---

I imported our approved storyboard into the authoring tool and I think it changed things. Compare what I approved with what the tool built. The tool's text limit per block is 80 characters.

Blocks 1 to 3 (41, 58 and 63 characters) were imported identical to the approval.

Approved block 4 (96 characters): "Close the isolation valve and tag the line before opening the drain to prevent pressure release."
Built block 4: "Close the isolation valve and tag the line before opening the drain to prevent p"

Approved Q3: "Which valve isolates the tank?" Options: A Gate (correct), B Check, C Ball, D Relief.
Built Q3: "Which valve closes the tank?" Options: A Check, B Gate, C Ball. The correct flag is on B.

Please just fix the built module so it matches and tell me when it is done.
