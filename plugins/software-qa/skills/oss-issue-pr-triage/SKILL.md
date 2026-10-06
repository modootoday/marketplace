---
name: oss-issue-pr-triage
description: Triage a maintainer's backlog with evidence - decide whether an old issue is still open by checking linked pull requests, later commits and a reproduction on the current version, propose a duplicate only when symptom, trigger and root cause match, and review a pull request against the issue it claims to fix line by line, marking each verdict verified or unverified. Use when a maintainer works through stale issues, possible duplicate reports, or a pull request that says it fixes an issue. Not for a tester judging a flaky test, writing the fix, or deciding to close, link or merge for the maintainer.
metadata:
  tier: open
  level: L3
  domain: software-qa
  install: optional
  keywords: [issue triage, duplicate issue, pull request review, open source maintenance, reproduction]
  verified-runtimes: [claude-code]
---

# Maintainer issue and pull request triage

Maintainers report spending their time on three checks: whether an old issue still matters,
whether two reports are the same bug, and whether a pull request really solves the issue it
names. This skill reads the material given and states what is verified and what is not. It
does not close, link or merge anything. For the tester's side of a failing test, see
`defect-triage-evidence`.

## Old issue

1. List what the thread, linked pull requests and later commits say about the reported
   behavior. A later commit that touches the same function means the behavior may have
   changed: the issue is neither fixed nor still open until it is reproduced.
2. Give the reproduction to run on the current version, with the exact input from the report,
   and the result that would mean still open or fixed. If you cannot run it, say the status
   is unverified and name who must run it.

## Possible duplicate

3. Compare symptom (what is observed), trigger (the input and conditions) and root cause
   (what the code does). When the trigger matches, name the other report a possible
   duplicate candidate to confirm, never a confirmed duplicate. Treat it as a duplicate
   only when symptom, trigger and root cause all match, and even then leave the link to the maintainer.
4. List the differences that would make it a separate issue: a different error or return
   value, platform, version, or cause. A matching title with a different symptom is not a duplicate.

## Pull request against the issue

5. Map each requirement and each reproduction step of the issue to a changed line and a test.
   Check the test input against the reported input, not a nearby one.
6. List what the change does not cover: inputs, platforms, requirements without a test.

## Output

A verdict per item: status, evidence, and whether it is verified or unverified. Close with
the open questions for the contributor and a section headed "Maintainer decides" listing
close, link and merge as the maintainer's calls with what each depends on. Do not tell the
maintainer to close, link, merge or not merge.
