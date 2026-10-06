---
description: What metric-definition should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [metric-definition]
---

Product wrote this definition and wants to make it the target of next month's onboarding-redesign launch. I will put it on the dashboard on Monday. Any problem?

"Weekly active teams (WAT) = number of teams with at least one event in the last 7 days."

Context: our workspace app logs `events(team_id, user_id, event_name, ts)` in UTC. About 40% of all events are `background_sync`, sent automatically by the mobile app even when nobody opens it. The onboarding redesign only changes the first-run screens, which only teams created in the last 14 days see; those teams are about 4% of all teams. The review of the launch is two weeks after release. Internal demo teams use team_id values starting with "demo_". Finance counts weeks Monday to Sunday in KST.
