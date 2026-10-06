---
name: authoring-import-fidelity-check
description: Compare an approved storyboard or source course against what an authoring tool actually built, imported or cloned - diff text and assessment items block by block and report changed wording, dropped items, reordered answers, a moved answer key and character-limit truncations with counts, and for a cloned course compare dates, access rules, grading settings and links to the source; list every difference for the owner and correct nothing silently. Use when a built or imported module may have drifted from the approved content. Not for writing the storyboard, fixing the module, judging the designer or checking learning quality.
metadata:
  tier: open
  level: L2
  domain: education
  install: optional
  keywords: [authoring tool, storyboard, import, quiz key, character limit, course clone, diff, e-learning]
  verified-runtimes: [claude-code]
---

# Authoring import fidelity check

Authoring tools reword, truncate and reorder on import. The approved storyboard is the reference; the
built module is the thing under test.

## Steps

1. Take the approved text as the reference and the built or imported module as the candidate. Pair them
   block by block (title, body, question stem, each option, feedback). Say which blocks you could not
   pair.
2. For each pair, compare exact text. Report changed wording by quoting both versions, marking the
   differing words. Do not call a change harmless; the owner decides.
3. For assessment items check four things separately: stem wording, option count (dropped or added
   options), option order, and which option carries the correct flag. If the key moved with the
   reorder, say whether it still points at the same answer text; if it points at different text, flag
   it as a changed key.
4. For any stated character limit, count characters of the approved text against the limit and compare
   with the built text. A built block that is cut at the limit is a truncation: show the cut point and
   the lost words. Name the longest approved block and its count.
5. For a cloned course, compare against the source course: dates, access and enrolment rules, grading
   and completion settings, attempts, and links (broken, still pointing at the source, or pointing
   nowhere). Table source value, clone value, same or different.
6. Do not correct anything. Do not re-enter text or reorder options. List the differences, ranked with
   key, dropped-option and truncation problems before wording changes. If asked to fix the module, say the
   check comes first and that the owner decides to accept, fix or re-enter each difference.
7. State what was not compared (media, layout, scripts, tracking data) and that the owner signs off.

## Output

A difference table (location, approved, built, type of difference), the assessment-item summary, the
character-limit check with counts, the clone settings table if relevant, and a line saying nothing was
changed.
