---
name: incident-postmortem
description: Run a blameless incident postmortem end to end - a UTC timeline built from logs and messages, impact in numbers, the root cause and contributing factors traced past "human error", and action items with owners, dates and a way to verify each - and publish it. Use when the user asks for a postmortem, an incident review or an RCA after an outage or a near miss, in any language. Not for live incident response while the outage is still ongoing.
metadata:
  tier: open
  level: L4
  domain: platform-engineering
  install: optional
  keywords: [postmortem, incident review, root cause analysis, RCA, incident report]
  verified-runtimes: [codex-cli]
---

# Incident postmortem

A postmortem exists so the same failure does not happen again. It fails when it
stops at a person ("the engineer ran the wrong command"), when its timeline is
reconstructed from memory, or when its actions have no owner and quietly die.

## 1. Gather evidence before writing

Collect, with timestamps: alerts, deploy and config change logs, dashboards,
chat messages from the incident channel, status page updates, customer reports.
Convert every time to UTC and keep the source next to each entry. Where sources
disagree, keep both and say so. Do not fill gaps with what "must have"
happened; mark them as unknown.

## 2. Timeline

A table: time (UTC), what happened, source. Mark four moments explicitly:
when it started, when it was detected, when it was mitigated, when it was
resolved. Time to detect and time to mitigate come from these, not from memory.

## 3. Impact

In numbers: users or requests affected, duration, failed transactions, money,
data lost or exposed, SLA or SLO burned. Say how each number was obtained.
Unknown is an acceptable value; a guess is not.

## 4. Causes

- **Root cause**: the condition that, removed, would have prevented this
  incident. Ask "why" until the answer is a property of the system, not a
  person. "Human error" is where the analysis starts: what made the error easy
  and what failed to catch it?
- **Contributing factors**: what made it worse or slower (missing alert, unclear
  runbook, noisy dashboards, a single person with access).
- **What went well**: what limited the damage, so it is kept.

## 5. Action items

Each item: what changes, owner (a person, not a team), due date, priority, and
how its completion will be verified (a test, an alert firing in a drill, a
check in CI). Prefer changes that make the failure impossible or detected over
reminders and training. Five tracked items beat twenty wishes.

Right under the timeline write the four moments as four labelled lines (started,
detected, mitigated, resolved), each a UTC time or "unknown" with the reason, then
time to detect and time to mitigate computed from them, or why they cannot be.
When a status page or chat message claims resolved before the mitigation in the
deploy log, record both and say the sources disagree.

## 6. Review and publish

Hold a blameless review with the people involved: language describes actions
and system conditions, not character. Record dissent. Publish where the team
reads it, link the action items in the tracker, and set a date to check that
they were done. End the draft with that as a closing line of its own: the
blameless review with the people involved, where the action items are linked
(a placeholder when no tracker was named), and the date they are checked.
