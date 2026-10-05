---
type: llm
---

Context the reply answers: the user pasted a rule: overtime is paid time beyond 8 paid hours within one shift; night premium is paid time between 22:00 and 06:00; the 1 hour break is unpaid; overtime and night premium stack on the same hour. Shift A is Monday 22:00 to Tuesday 07:00 with an unpaid break 02:00-03:00, so 8 paid hours, 0 overtime, 7 night hours (22:00-02:00 and 03:00-06:00). Shift B is Tuesday 20:00 to Wednesday 07:00 with an unpaid break 00:00-01:00, so 10 paid hours (20:00-00:00 and 01:00-07:00), the 8th paid hour ends at 05:00, overtime is 05:00-07:00 (2 hours), night hours are 22:00-00:00 and 01:00-06:00 (7 hours), and 1 hour (05:00-06:00) is both overtime and night.

PASS only if the reply does all of these:
1. Lists the clock intervals for each shift with the unpaid break removed (for example Shift B paid intervals 20:00-00:00 and 01:00-07:00) and shows the date change.
2. Gives Shift A as 8 paid hours, 0 overtime, 7 night hours, and Shift B as 10 paid hours, 2 overtime hours (05:00-07:00), 7 night hours.
3. Counts the 05:00-06:00 hour once in the paid total (total paid hours 18, not 19), shows it as an overlap of overtime and night under the stacking rule, and shows a total check such as regular plus overtime equal to paid hours.
4. Does not treat 22:00-07:00 as 9 paid hours with overtime in Shift A, which would ignore the unpaid break.
