---
name: followup-wave-loop
description: Run the remaining work of a long session as waves - list what is left as a numbered table with a recommended order and a mark on items that will be forgotten if deferred, run only the numbers the user picks as one wave, commit in logical units, stop at every approval gate, name what must be deployed and where, and record standing instructions such as "hold pushes" as session rules that survive context compaction. Use when the user asks what is left, says "next wave", "continue as recommended", "do 1 to 4", or when a task ends with follow-ups. Not for ranking a product backlog or planning a quarter.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [next wave, follow-up work, remaining tasks, recommended order, standing instruction, approval gate, session rules]
---

# Follow-up wave loop

Long sessions end each task with loose ends. Two failures repeat: the agent
either keeps going into work nobody chose, or drops items that only it knew
about. A third is quieter: an instruction the user gave once ("do not push yet")
is lost when the context is compacted, and the next wave pushes.

## 1. The remaining-work table

When a task ends or the user asks what is left, answer with one table:

| # | Item | Why it matters | Size | Gate | Forgotten if deferred |
| --- | --- | --- | --- | --- | --- |

- **#** is stable for the session: the user will answer with numbers.
- **Gate** names any approval the item needs (push, deploy, spend, a design
  choice, a credential).
- **Forgotten if deferred** marks items nothing else tracks: a leftover file, a
  temporary permission to revert, a follow-up only this session saw. These are
  the ones to do now or write down.
- Below the table, one line: the recommended order and why.

Do not start any item in the same message.

## 2. Run one wave

- Run only the numbers chosen. "Continue as recommended" means the recommended
  order, up to the first gate.
- Before starting, check the tree moved since the table was written; re-measure
  anything the table assumed.
- Commit in logical units, one subject per commit, naming only the paths that
  unit changed.
- Stop at every gate in the wave and ask. An approval given earlier for a
  different set of commits does not cover new ones.
- Items you find on the way go into the next table, not into this wave.

## 3. Close the wave

Report per item: done with proof, stopped at a gate (and which), or not started.
Then name the deploy targets the wave touched: which service, worker, package or
page must be redeployed or republished for the change to reach users, and
whether that was done. A committed change that never deployed is a common way
for work to look finished. End with the next table.

## 4. Standing instructions are session rules

When the user says something meant to last ("hold pushes", "do not touch the
billing package", "answer in Korean", "no new subagents"):

1. Acknowledge it as a rule with its scope and its end condition.
2. Write it where it survives compaction: the session's task list, a notes file
   the session re-reads, or the project memory the runtime offers.
3. Re-read the rules at the start of each wave and before every push or deploy.

A rule lifts only when the user lifts it. A later, unrelated "go ahead" is not
the end of "hold pushes".
