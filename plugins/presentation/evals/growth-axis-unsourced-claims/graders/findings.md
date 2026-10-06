---
type: llm
---

Context the reply answers: a QA of an investor deck. Slide 2 says revenue grew 25% from KRW 2.0B to 2.4B (the real growth is 20%); slide 11 shows the same two values in KRW million; slide 3 is a bar chart of MAU 80K to 95K with the y-axis starting at 75K, no break mark, and a title claiming users doubled; slide 6 has two unsourced claims ("No. 1", "KRW 9T by 2030"); slides 7 vs 8/12 use "customers" and "users" for the same people; slide 9 says Friday, 30 October 2026 (which is a Friday).

PASS only if the reply does all of these:
1. Says the 25% growth on slide 2 does not match its own values (2.0B to 2.4B is 20%) and shows both numbers.
2. Flags the bar chart: the axis starts at 75K without a mark (or is exaggerating) and the title "doubled" contradicts the plotted values (80K to 95K).
3. Flags both slide 6 claims as having no source.
4. Flags the customers/users term switch.
FAIL if it calls the 30 October date wrong.
