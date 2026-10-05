---
name: session-status-briefing
description: Answer "where are we" in a long agent session as a short status in four parts - done (with commit hashes and what ran, how much), in progress (subagents, builds), blocked, and the next decision the user owns - in the user's own language, with a check for work beyond the goal; a resumed or compacted session first runs a preflight (UTC time, HEAD, who owns the dirty files, running processes) and restates the goal and what remains. Use when the user asks for progress, a status, a briefing, "how far along", or when a session resumes after compaction or handover. Not for writing a release note, a postmortem or a commit message.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [status update, progress report, briefing, where are we, session resume, handover, compaction]
---

# Session status briefing

The person reading a status is deciding what to do next with limited attention. A
status that narrates the session, buries the one decision they own, or says
"tests pass" without saying what ran costs them a second round of questions.

## 1. Resumed session: preflight before the first word

After a context compaction, a handover or a gap of hours, the summary you
inherited is a claim, not a measurement. Before reporting anything:

1. Current time in UTC (`date -u`), so "an hour ago" in logs means something.
2. `HEAD` and the remote tip: what is committed, what is pushed.
3. The dirty files, and whose they are. In a checkout shared with other sessions,
   a modified file is not yours because it is modified; check it against your own
   edits, the summary and file times before you claim or touch it.
4. Running processes you may have started: builds, test runs, background agents,
   servers. A "still running" in the summary may have finished or died.

Then restate in two lines the goal you are working toward and what remains. If
the preflight contradicts the summary, the preflight wins and the report says so.

## 2. The four parts

Keep each part to a few lines. Omit a part only by writing "none".

- **Done**: each item with its proof. A commit names its hash. A check names the
  command, how much ran (files, tests, stages, and how many were skipped or
  cached) and on which tree. A deploy names the target and the version or URL
  that now answers. "Fixed" with no proof is not done.
- **In progress**: subagents and builds still running, what each is doing, and
  when you will look again.
- **Blocked**: what is waiting on someone else, and on whom.
- **Next decision**: the one or few choices only the user can make (approve a
  push, pick an option, provide a credential), each phrased so it can be answered
  with a word. Give your recommendation with it.

## 3. Check for work beyond the goal

Before sending, compare what was done with what was asked. List anything done
that the goal did not require (extra refactors, new files, scope that grew) as
its own line so the user can keep or drop it. Silent scope growth is the
complaint that follows most long sessions.

## 4. Language and length

- Answer in the language the user writes in, including the headings. Identifiers,
  paths, commands and hashes stay as they are.
- No session narrative, no list of every file read. If the user wants detail they
  will ask.
- Numbers come from this session's measurements, never from memory of an earlier
  run; if a number was not re-measured since the tree changed, say so.
