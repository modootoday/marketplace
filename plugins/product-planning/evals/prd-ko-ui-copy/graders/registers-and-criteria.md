---
type: llm
---

PASS only if all three hold:
1. The screen copy (button, confirmation, notification) is in the polite -yo form (haeyo-che),
   and the button label says what happens (for example 재입고 알림 받기), not a generic 확인.
2. Each requirement has an acceptance criterion a tester could check (a state, an action and an
   observable result).
3. It writes what happens in at least one edge case: the user already applied, notifications are
   turned off on the device, or the item is discontinued.

FAIL if any of the three is missing.
