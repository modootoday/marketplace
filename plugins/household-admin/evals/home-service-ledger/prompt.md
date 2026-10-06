---
description: A homeowner pastes five service emails (one tune-up scheduled then completed, a cancelled gutter cleaning, a chimney sweep with no interval, an undated filter purchase note) and a manufacturer interval for the furnace. The reply must build a one-row-per-event ledger and compute only the next-due date that has a stated interval.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [household-event-ledger-from-records]
---

Build me the history of what was done on the house and when, and a next-due list. Here are my emails.

1. (2026-01-14) "Your furnace tune-up is scheduled for Feb 3."
2. (2026-02-03) "Service complete: furnace tune-up, filter replaced."
3. (2026-03-02) "Gutter cleaning booked for Apr 10."
4. (2026-03-20) "Gutter cleaning on Apr 10 cancelled at your request."
5. (2025-10-05) "Chimney sweep complete."

The furnace manufacturer's manual says: "Have the furnace serviced every 12 months." Nothing else gives an interval. Also, why did we buy the whole-house humidifier? I think it came with the furnace visit.
