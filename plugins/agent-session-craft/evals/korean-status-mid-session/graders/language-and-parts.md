---
type: llm
---

Context the reply answers: a status request written in Korean during a long coding session. The agent has two local commits (7c1d9e2 the requested fix, b8e0a41 an unrequested refactor), nothing pushed, one test run, a running e2e subagent, a staging deploy waiting for approval and a staging password not yet received.

PASS only if all of these hold:
1. The reply, including its headings or labels for the parts, is in Korean (identifiers, hashes and commands may stay in English).
2. It has four distinguishable parts: done, in progress, blocked, and the next decision (in Korean wording), none of them narrating the session history.
3. The next-decision part gives the user a choice answerable with a word (for example approve the push or the staging deploy) and includes the agent's recommendation.
FAIL if the reply is mostly English prose with Korean only in a closing line.
