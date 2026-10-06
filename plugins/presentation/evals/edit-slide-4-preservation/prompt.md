---
description: The user asks for a wording edit on one slide and reports earlier losses. The reply must set up preservation and source sync before editing.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [deck-edit-preservation-and-source-sync]
---

Please tighten the wording of the three bullets on slide 4 of my deck (leave the title, table and logo as they are). Last time you deleted a table and my manual fixes vanished when you regenerated.

Facts: the deck is 12 slides, built by a script that reads content.json (the text and numbers) and fills template.pptx (the layout). Slide 4 holds a title, a three-bullet text block, a table of 4 rows by 3 columns, and a small logo image. After the last build I hand-fixed two things directly in the .pptx: the footer on slide 9 and the font size of the table on slide 6. You cannot open the files from here.
