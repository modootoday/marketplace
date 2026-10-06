---
type: llm
---

Context the reply answers: a proposed KPI "Weekly active teams = teams with at least one event in the last 7 days" over events(team_id, user_id, event_name, ts) in UTC. Facts: 40% of events are background_sync sent automatically by the mobile app; internal demo teams have team_id starting with "demo_"; finance counts weeks Monday to Sunday in KST while timestamps are UTC; the launch review is two weeks after release.

PASS only if the reply:
1. Says the qualifying event must be named exactly and that background_sync cannot count as activity (it makes teams active when nobody used the product).
2. Says the window needs a calendar definition (which day starts the week) and an explicit timezone for its boundaries (KST for finance versus UTC in the data) instead of a rolling "last 7 days".
3. Excludes the internal demo teams (demo_ prefix) and states the entity rule.
