---
name: media-target-and-angle-verification
description: Prepare a media target list and pitch angles for a PR pitch without inventing facts - each journalist candidate gets a beat, a byline URL and the date it was seen taken only from pages the user pasted, or is marked unverified; no email or phone that is not on a source page; each editorial-calendar or news hook is tied to approved expertise only, with its event date and source, and a passed deadline is not treated as open; sensitive or fast-moving news is flagged for a human check. Use when someone asks to find journalists, outlets, editorial-calendar slots or news hooks for a client pitch. Not for writing the pitch itself or judging a named person.
metadata:
  tier: open
  level: L3
  domain: pr-comms
  install: optional
  keywords: [media list, journalist beat, editorial calendar, pr pitch, news hook]
  verified-runtimes: [claude-code]
---

# Media target and angle verification

Media lists go stale, calendar slots expire and a model with no browsing invents names and
addresses that look right. This skill produces a checkable worksheet of targets and angles. It
works only from outlet pages, calendars and client material the user pastes in this conversation.

## Steps

1. Record the inputs: client, approved expert topics (the only topics any angle may use),
   today's date, and which pages the user pasted. If nothing was pasted, say you cannot browse
   and that every outlet and person below is a lead to check, not a fact.
2. Calendar and news hooks. For each hook write the event or issue, its date, the deadline and
   the source. Compare each date with today's date: a deadline already passed is closed, say
   so, and offer the next realistic use (a later issue, a follow-up, the next cycle) as something
   to confirm with the outlet. Map a hook to an approved topic only; a hook with no approved
   topic is listed as "no fit", not stretched.
3. Journalist candidates. For each, write outlet, beat, one recent byline URL and the date seen,
   all copied from a pasted page. Without a pasted page write "unverified" in each of those
   fields and do not invent a name; describe the role to look for instead (for example the
   healthcare supply chain reporter at a named outlet). Never write an email or phone number
   that is not on a pasted source page; point to the outlet's contact or masthead page instead.
   Describe only what the pasted page says about a person's work; no assumptions about interests,
   views or character, and no profile beyond the beat.
4. Flag for a human check, before any pitch: breaking or sensitive news (incidents, recalls,
   deaths, legal or regulatory action), anything whose facts may change within days, and any
   claim about the client that is not in the approved material.
5. List what to verify manually: the journalist is still at the outlet, the current beat, the
   contact route, the calendar line on the outlet's own page, and the submission rules.

## Output

A table of hooks (hook, date, deadline status against today, source, approved topic or no fit),
a table of candidates (outlet, beat, byline URL and date or unverified), the human-check list,
and the manual verification list. State what you could not verify.
