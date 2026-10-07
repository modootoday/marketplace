---
name: csv-formula-injection-export-check
description: Check a CSV export against spreadsheet formula interpretation and machine-value contracts, including import and save/reopen evidence. Use when reviewing CSV safety, escaping or spreadsheet delivery. Not for exploit payloads or a universal sanitizer guarantee.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [csv, formula injection, export, round trip, spreadsheet]
  verified-runtimes: [codex-cli]
---

# Check CSV consumer behavior

CSV syntax and spreadsheet interpretation are separate contracts. Quoting a
field does not prove it will remain text after saving and reopening. Identify
the recipient app, version, locale and import route, plus each machine
consumer's exact-value requirements before choosing a mitigation.

Inspect decoded cell boundaries, not just the start of the source row. Separators,
quotes, leading control characters and locale-dependent formula prefixes can
change which value reaches a cell. Do not erase legitimate values such as
negative numbers merely because their prefix deserves review.

Use a local synthetic fixture with harmless `=1+2`; never use network or command
execution formulas. Record source value, encoded field, imported value/type,
saved CSV value and reopened interpretation separately. A canary interpreted as
3 in an untreated control shows that route can evaluate formulas; a missing
positive control leaves a non-evaluation test inconclusive. Test the actual
consumer route rather than assuming a documented recipe covers every app.

Distinguish a spreadsheet-viewing output from a machine-ingestion output. A
prefix such as a tab can affect the underlying value even when the spreadsheet
looks correct. Do not call that byte/value-preserving without evidence or silently
relax the machine contract. If one output cannot meet both contracts, describe
separate validated delivery routes or leave the unresolved route unverified.

Report a compact cell/route matrix: expected raw value, observed value and
formula interpretation at each stage, app/version/locale, machine fidelity,
and untested routes. Supplied observations are evidence supplied by the user,
not tests you executed. A passed first import does not establish save/reopen
safety; a failed round trip blocks endorsement of that route. Request missing
consumer settings or fidelity contracts instead of prescribing universal escaping.

Sources: [OWASP's CSV interpretation and mitigation trade-offs](https://community.owasp.org/attacks/CSV_Injection)
and [the historical save/reopen report](https://github.com/OWASP/www-community/issues/517).
The historical report motivates verification; it does not establish a current
defect in an untested spreadsheet version.
