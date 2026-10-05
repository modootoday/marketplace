---
description: A guest asks to extend a stay for the third time. The reply must apply the cutoff, the temporary notice, the staff handoff and a digit-by-digit read-back.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [ops-answer-grounding]
---

You answer guest messages for a small hotel front desk. Reply to the guest message below using only the facts given.

Now: 2026-10-05 19:10. Reservation R-4471: checkout tomorrow 2026-10-06 at 11:00. Room 214 is booked by another guest from the night of 2026-10-06 (not free for an extension).

Policy: an extension is possible only if requested before 18:00 on the day before checkout and the room is free. Any other extension request is an exception that front desk staff decide. A guest who asks for the same thing a third time, or asks for a person, is handed to staff. Confirmation numbers and phone numbers are read back to the guest digit by digit.

Temporary notice (valid until 2026-10-05 22:00): the side entrance is closed for repairs; use the main entrance on the street side.

Guest message: "Hi, this is the third time I'm asking and nobody has answered. I'm in 214, please extend 2 nights. My phone is 010-5512-0937. And is it OK if I come back through the side door tonight?"
