---
type: llm
---

Context the reply answers: the user pasted five emails: (1) 2026-01-14 furnace tune-up scheduled for Feb 3; (2) 2026-02-03 service complete, furnace tune-up, filter replaced; (3) 2026-03-02 gutter cleaning booked for Apr 10; (4) 2026-03-20 gutter cleaning on Apr 10 cancelled at the user's request; (5) 2025-10-05 chimney sweep complete. They asked for a history and next-due list.

PASS only if the reply does all of these:
1. Shows the furnace tune-up once, as completed on 2026-02-03, not as two events (the scheduled and completion emails are one visit).
2. Shows the gutter cleaning as cancelled, not as done and not as a still-upcoming booking.
3. Shows the chimney sweep as completed 2025-10-05.
4. Each row quotes its source email text.
