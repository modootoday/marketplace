---
type: llm
---

Context the reply answers: the same search-outage postmortem. The team's own cause statement is that the engineer who deployed v412 did not run the index migration; their proposed actions are "retrain the on-call engineer" and "be more careful with deploys". Facts: 214 tickets; no request logs from 02:02 to 02:14 UTC; the number of affected users is not known; the 5xx alert fired 12 minutes after the deploy and the rollback completed 49 minutes after it.

PASS only if the reply:
1. Does not stop at the person: it states the cause as a property of the system (the deploy could ship without the index migration and nothing blocked or detected it; a hypothesis still to confirm is acceptable) and does not name the engineer as the cause.
2. Has a separate part on what went well (what limited the damage, to be kept).
3. Gives action items each with what changes, an owner who is a person (marking the name as to be assigned is acceptable), a due date, a priority and how completion will be verified (a test, an alert firing in a drill, a check in CI), and replaces the two proposed reminders and training with changes that make the failure impossible or detected.
4. Says to hold a blameless review, link the action items in a tracker, and set a date to check that they were done.
