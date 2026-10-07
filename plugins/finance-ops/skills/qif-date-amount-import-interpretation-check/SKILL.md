---
name: qif-date-amount-import-interpretation-check
description: Compare QIF exporter date/year and field-specific numeric conventions with independent controls and actual stored importer rows. Use when totals match but imported transaction dates or amounts may be misinterpreted. Not for financial advice, postings, bank duplicate reconciliation or guessing ambiguous locale/currency.
metadata:
  tier: open
  level: L3
  domain: finance-ops
  install: optional
  keywords: [QIF, date parsing, amount parsing, bank import, locale, field crosswalk]
  verified-runtimes: [codex-cli]
---

# QIF date and amount import interpretation check

Obtain exact source QIF and field roles, exporter/version and declared date/year interpretation, field-specific thousands/decimal conventions, account/currency/sign context, independent dated controls, importer/version/settings and supplied stored-row observations. Display preferences are not proof of parsing rules. QIF alone may lack currency or exchange-rate context.

## Compare field meaning before totals

1. Preserve raw D/T and relevant account/record identities beside approved interpreted values. Resolve day/month and two-digit year from source provenance and independent controls, not majority inference from an ambiguous single-date file.
2. Apply documented numeric conventions per field. Do not assume every numeric field shares separators or infer currency from amount syntax. Keep signs and debit/credit conventions explicit.
3. Crosswalk each approved transaction into actual stored date, signed amount, account and currency. Distinguish stored values from display formatting. A parse-success message or visually plausible row is not an independently verified transaction meaning.
4. Check date/period and amount findings separately from opening/movement/closing arithmetic. Identical totals can conceal shifted dates. Reuse financial-document-intake-tieout for aggregate arithmetic, preserving the parser findings.
5. If correction is requested, preserve original source and imported observations; propose a documented parser-format/settings correction and request new stored-row/control evidence. Do not post entries, invent a bank error, silently choose a date/century or overwrite financial records.

## Output and limits

Provide raw-to-approved-to-imported field crosswalk, evidence for each date/year/amount convention, period/sign/account discrepancies and unresolved consumer interpretation. When provenance is missing, expose ambiguity and request controls without choosing an interpretation. Duplicate reconciliation, categorization, tax and financial advice are outside scope.

[GnuCash QIF format notes](https://github.com/Gnucash/gnucash/blob/stable/gnucash/import-export/qif-imp/file-format.txt) describe inconsistent source and field conventions, not a universal formal standard. The [historical Manager thread](https://forum.manager.io/t/imported-bank-statements-for-a-single-date-converts-the-dates/14332/) includes a2018 daily-import date report,18.1.66 resolution and later18.12.22 context; it is not proof of a current defect. No bank data, actual import or AI failure is demonstrated. Historical source evidence does not establish model effect; comparative results and limits are recorded in the plugin README.
