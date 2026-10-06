---
name: false-positive-appeal
description: Decide an appeal against an automated abuse action - re-read the evidence the rule recorded, check it against the rule's definition and known false-positive patterns, gather what the appellant adds, decide uphold or reverse with the reason written, restore what the action removed, and feed confirmed false positives back into the rule. Use when a user, seller or creator disputes a ban, penalty, removal or abuse label. Not for writing the rules themselves.
metadata:
  tier: open
  level: L3
  domain: trust-safety
  install: optional
  keywords: [appeal, false positive, ban review, moderation appeal, abuse detection]
  verified-runtimes: [claude-code]
---

# Appeals against automated actions

An appeal process that only says "upheld" teaches users nothing and the rule
nothing. Every decision should name its evidence, and every confirmed false
positive should make the rule better.

## 1. Gather

- The action, its date, and the rule and version that triggered it.
- The evidence recorded at the time (the signals and their values), not a fresh
  re-run that may see different data.
- The appellant's statement and any proof they add.
- The account's history, read for context, not as a reason by itself.

## 2. Check

- Does the recorded evidence meet the rule's definition as written?
- Does the case match a known false-positive pattern (shared networks, legitimate
  heavy use, a seasonal spike, a reseller with many customers)?
- Is there evidence of the abuse beyond the rule's signals?

## 3. Decide

Uphold or reverse, with a reason that cites the evidence. When it is genuinely
unclear, the default should follow the harm of each error: reversing a wrong ban
is cheaper than leaving one.

## 4. Act

On reversal: restore what was removed (access, content, scores, earnings),
remove the label, and tell the user plainly. On uphold: explain which behaviour
broke which rule, without revealing detection details that would help evasion.

## 5. Learn

Log each reversal with the rule and the pattern. When a pattern repeats, propose
a rule change and measure it on labelled data before shipping.
