---
description: A configurator order with a 16-character engraving over a 12-character limit and a wrong price. The reply must recompute the price and flag the limit.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [interactive-3d-explorer-data-binding-check]
---

Configurator: schema colors red, blue; engraving up to 12 characters; parts base, lid. Order JSON from the UI after choosing blue, engraving 'HELLO WORLD 2026', part lid: {color:'blue', engraving:'HELLO WORLD 2026', part:'lid', price: 40}. Price list: lid 30, blue +5, engraving +0.5 per character.
