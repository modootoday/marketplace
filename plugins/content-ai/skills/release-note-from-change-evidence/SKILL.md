---
name: release-note-from-change-evidence
description: Write release notes or support articles from developer notes, tickets, pull requests and diffs so that every claim cites a ticket, PR or note, unsupported claims are cut, UI and screen names appear only if they come from a screenshot, a string in code or the docs, and missing facts become questions instead of inventions. Use when someone asks for release notes, a changelog entry, a what's-new post or a support article from scattered dev notes, ticket titles or a diff. Not for marketing copy, ad claims or release notes for changes with no source material at all.
metadata:
  tier: open
  level: L3
  domain: content-writing
  install: optional
  keywords: [release notes, changelog, support article, tickets, pull requests, evidence, screen names]
  verified-runtimes: [claude-code]
---

# Release note from change evidence

AI drafts of release notes invent screen names and pad vague dev notes into confident
claims. A note is only as good as the evidence behind each line.

## Steps

1. Collect the evidence the user gave: dev notes, ticket or PR ids and titles, diffs,
   screenshots, UI strings, docs. List each source with its id.
2. Turn each source into one candidate line. Attach the id (for example #412) to every line.
   A line with no id or note behind it is removed or turned into a question.
3. Use UI names only if they come from a screenshot, a string in code or the docs. Otherwise
   write a neutral description and mark the name as unknown, for example "the filter on the
   dashboard (screen name needed)". Never invent a menu, tab or button name.
4. When a note is vague ("performance improvements"), do not write a number or a claim. Ask
   for the measured change, the affected action and the ticket. Do not publish the vague
   line as a note: put it in a "Not ready to publish" list with the question that blocks
   it, so no release section contains a claim the sources do not support.
5. Separate sections: new for users, fixes, known issues, not ready to publish and open questions. Say what a user
   can do now, not how the code works.
6. End with a list of questions for the author: each missing fact, with the line it blocks.

Read `references/evidence-table.md` for the line format and a worked example.
