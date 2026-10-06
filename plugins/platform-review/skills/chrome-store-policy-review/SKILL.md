---
name: chrome-store-policy-review
description: Check a Chrome extension against the Chrome Web Store program policies before submission or after a rejection - single purpose, permissions justified one by one, user data disclosure and limited use, remote code, deceptive behaviour, and the listing itself - and map a rejection notice to the exact policy and fix. Use when preparing a Chrome Web Store submission, answering a review rejection or adding a permission to a Manifest V3 extension. Not for general extension debugging.
metadata:
  tier: open
  level: L3
  domain: platform-policy
  install: optional
  keywords: [Chrome Web Store, extension review, Manifest V3, permissions, rejection, user data policy]
---

# Chrome Web Store policy review

Most rejections come from a mismatch between what the extension can do and what
it says it does: a permission with no visible use, data collected without a
disclosed purpose, code fetched at runtime. Read the current program policies
before judging; they change, and the rejection email names the policy it used.

## Check the package

- **Single purpose**: one clear purpose the listing states; features outside it
  are a finding.
- **Permissions**: list every permission and host permission with the user-facing
  feature that needs it. Broad hosts (`<all_urls>`) need a reason a reviewer can
  verify; prefer `activeTab` or optional permissions where they work.
- **Remote code**: Manifest V3 forbids executing code not in the package. Remote
  configuration and data are fine; remote scripts, `eval` and dynamically
  constructed code are not.
- **User data**: what is collected, why, where it goes. The privacy practices
  form, the privacy policy and the code must agree, and use must stay within the
  disclosed purpose (limited use).
- **Deception and spam**: no hidden behaviour, no keyword-stuffed listing, no
  misleading screenshots.

## A rejection

Quote the policy named in the notice, find the code or listing text that
triggered it, and propose the smallest change that resolves it (remove or narrow
a permission, add disclosure, move logic into the package). Write the appeal or
resubmission note in plain terms: what changed and where.

## Output

A table: item, finding, policy, fix. Mark anything that depends on reading the
current policy text you did not retrieve.
