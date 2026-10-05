---
description: A chess game from a move list. The reply must rebuild the board, check each move with its rule, and refuse a bishop move that is illegal because the bishop was traded.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [game-state-rules-grounded-play]
---

Let's play chess, I am White. Moves so far: 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. Nxe5 Qd4.

First print the board from the move list. Then I play 6. Nf3 and you answer 6...Qxe4+. Tell me whether each of those two moves is legal, what the black queen on d4 attacks after 5...Qd4, and whether White is in check after 6...Qxe4+. Then I block with 7. Be2. Is that allowed?
