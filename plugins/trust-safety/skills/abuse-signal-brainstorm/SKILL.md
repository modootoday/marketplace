---
name: abuse-signal-brainstorm
description: Generate and rank candidate signals for a specific abuse pattern - fake reviews, sock-puppet accounts, scraped or spun content, bought engagement - by how an abuser would behave, what data shows it, how cheaply the abuser could evade it, and what legitimate users it would also catch. Use when starting to detect a new kind of abuse or when existing rules miss a pattern. Not for writing the final rule or deciding on a ban.
metadata:
  tier: open
  level: L1
  domain: trust-safety
  install: optional
  keywords: [abuse detection, fraud signals, fake reviews, spam signals, sock puppets]
---

# Brainstorming abuse signals

A signal list made from what is easy to compute catches the clumsy abuser and
the innocent power user. Start from how the abuse is done.

## 1. Describe the abuse as a workflow

Who does it, for what gain, with what tools, at what scale, and what it costs
them per unit (an account, a review, a post). The signals hide in the steps that
are expensive to vary: buying accounts, writing unique text, waiting.

## 2. Candidate signals, three kinds

- **Behaviour**: timing (bursts, regular intervals, activity at odd hours for
  the claimed locale), sequence (sign-up straight to the action), velocity.
- **Content**: near-duplicate text, templates, unusual length or sentiment
  extremes, copied images.
- **Network**: shared devices, IPs, payment instruments, accounts that always act
  together, a cluster of new accounts touching the same target.

## 3. Score each signal

| Signal | Data available? | Evasion cost for the abuser | False-positive risk | Notes |
| --- | --- | --- | --- | --- |

Prefer signals that are expensive to evade and rare among legitimate users.
Combinations beat single signals: two independent weak signals together are
often strong.

## 4. Pick what to test

Choose two or three, describe the labelled sample needed to measure precision
and recall, and name a legitimate population to check for false positives (for
example a real shop owner who replies to every review at night).

Do not label any real account as abusive from this exercise; it produces
hypotheses.
