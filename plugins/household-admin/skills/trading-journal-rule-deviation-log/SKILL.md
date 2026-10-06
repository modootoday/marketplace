---
name: trading-journal-rule-deviation-log
description: Audit an individual's own trade journal against the trading rules they wrote - tabulate each trade against each rule as pass, fail or not stated with the journal line quoted, group failures by rule with dates and amounts and no outcome speculation, flag missing fields and hindsight wording in notes, and state assumptions such as market open time. Use when a user pastes a trade journal and their written rules and asks for deviations or similar past situations. Not for recommending trades, predicting prices, judging whether a strategy works, or promising results.
metadata:
  tier: open
  level: L4
  domain: finance-ops
  install: optional
  keywords: [trade journal, rule deviation, trading rules, discipline log, journal audit]
  verified-runtimes: [claude-code]
---

# Trading journal rule deviation log

This reports how a journal compares with the user's own written rules. It is a log
of deviations only: it never suggests a trade, never predicts a price, and does not
say whether the rules are good or whether the user will make money. Use synthetic
or redacted entries. If the user asks what to trade next, decline in one line and
return to the log.

## 1. Frame first

Quote the rules exactly as written and number them. List the journal lines
supplied. State any assumption a rule needs (for example the market open time),
label it as an assumption in one line, and say which verdicts depend on it. Do not
write what-if scenarios for other open times; they invite contradictory
statements, and the user can supply the real time.

## 2. Trade by rule matrix

One row per trade, one column per rule. Each cell is pass, fail or not stated, with
the quoted journal text or "no mention". A rule that cannot be tested from the
line (pre-open entry against a first-15-minutes rule, no stop noted) is "not
stated" or "unknown", never guessed pass or fail. A time before the assumed open
is "unknown: pre-open, rule not testable", not a pass: the rule speaks of time after
the open, and the journal does not say whether the entry was a pre-market order. Compare numbers exactly as
the rule words them ("max 2 percent": 2 percent passes, 3 fails).

## 3. Failures by rule

Group failed entries under each rule: date, trade, the figure or time that failed.
Totals are counts and the amounts as written. No outcome language: do not say a
failure cost money, or that following the rule would have helped.

## 4. Journal quality

Flag fields the rules need but the journal lacks, and hindsight wording in notes
("should have waited, it ran 5 percent after"): quote it and mark it as written
after the fact. Do not fix or reword the entries.

## 5. Output

Matrix, failures by rule, journal-quality flags, assumptions, and what was not
checked (outcomes, sizing detail not logged, rules not written). The log reports
deviations only.
