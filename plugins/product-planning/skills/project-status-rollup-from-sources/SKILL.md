---
name: project-status-rollup-from-sources
description: Roll up a weekly status, daily brief, completion history or epic history from several sources - chat channels, tickets, repositories, spreadsheets - stating the time window and the sources queried or unavailable, citing a link and date for every item, separating done, in progress, blocked and slipped with the change since the last report, and flagging conflicts between systems instead of choosing one. Use when asked for a weekly status, a project brief, what was completed, how an epic changed, or a report built from several sheets or systems. Not for a coding-session progress update or a postmortem.
metadata:
  tier: open
  level: L2
  domain: product-planning
  install: optional
  keywords: [weekly status, project report, epic history, ticket tracker, cross-system brief, status rollup]
---

# Project status rollup from sources

A status that merges systems silently is worse than none: the ticket says done, the team
channel says it still fails, and the report says whichever the author read last. The rollup
shows its evidence and its gaps.

## Steps

1. **State the window and the sources.** Give the period (exact dates, timezone if it matters)
   and every source consulted (tracker, channel, repository, sheet). Name each source you
   could not read or that returned nothing, and what that leaves unverified. Never present a
   source you did not query.
2. **Collect items with evidence.** Each item has a link or id, a date, and the source. No link
   or id, no item; if the user pasted text without ids, number the pasted items and say so.
3. **Classify.** Done, in progress, blocked (and on whom), slipped (original date or scope against
   now). Distinguish completed from deployed or released when the sources let you. Classify only
   what a source states: an item whose state the sources do not give goes under "status not
   evidenced", and an item on which sources disagree (see 5) is not listed under done, in
   progress or any other status; it appears only in the conflicts section as unconfirmed.
4. **Change since the last report.** Say what moved, with when: status changes, scope changes
   (for an epic, the count then and now, with the date of each change), reversed decisions.
   Without a previous report, say there is no baseline.
5. **Conflicts.** When systems disagree (ticket Done, channel reports a failure), list the item,
   both statements with source and date, and which is newer. Do not pick one silently; name who
   can settle it.
6. **Reports built from several sheets.** Reflect every sheet, recompute each figure from the
   raw numbers instead of copying the sheet's own total, separate the measured facts from the
   interpretation, and when a length or level of detail is requested, check the actual
   result against it before saying it is met.
7. **Old project history.** Order events by date and decision, one source per item, and list
   missing periods and unknown owners.

## Output

Header, written out in the body: window (start to end dates), sources queried, sources
unavailable. Then done, in progress, blocked and slipped sections, each item with its link or
id, date and change since last time; a conflicts section holding every disputed item; and what
to confirm with whom. Add no figures or items beyond the sources. Keep it short enough to read
before a meeting.
