---
name: product-feed-disapproval-triage
description: Triage a shopping feed or marketplace diagnostics export, grouping disapproved or flagged products by the attribute the issue names, giving each fix as a value taken from the product source or marking it needs source, never inventing identifiers, brands or prices, and re-checking every row with counts per issue before and after. Use when a merchant pastes diagnostics and feed rows after items are disapproved or missing attributes. Not for ad bidding or campaign structure (paid-media-plus) or for policy and legal questions about what may be sold.
metadata:
  tier: open
  level: L2
  domain: commerce
  install: optional
  keywords: [product feed, disapproved, merchant center, missing attribute, GTIN, diagnostics, marketplace feed, data quality]
  verified-runtimes: [codex-cli, grok-cli]
---

# Product feed disapproval triage

A feed fix is a data fix: the value must come from the product's own source. A made-up GTIN, brand
or price can get an item approved and then suspend the account or mislead a buyer. This skill
groups the issues, fixes what the source supports, and says plainly what it cannot fill.

## Steps

1. Take the diagnostics export and the feed rows (and any product source, such as a supplier sheet
   or the landing page text). Say which of the three you were given.
2. Group issues by the attribute named in the issue text (GTIN, brand, colour, price, availability,
   image link, and so on), not by product. Count rows per group.
3. For each row, give the fix as a value found in the source, with where it was found. If the source
   has no value, write `needs source` and who can supply it. Never generate, guess or "make valid"
   a GTIN, brand, MPN, price or availability. A GTIN you cannot read from the source stays blank, or
   the merchant uses the platform's documented exemption route if it applies. When asked to invent
   one, decline in one sentence and say why: fake identifiers can lead to disapproval or account
   suspension and break product matching.
4. Where two sources disagree (feed price against landing page price), do not pick one, not even
   the likelier one: state both values, say the feed and landing page must match, leave the price
   column in the corrected rows unchanged and mark it `needs decision`. A decision row is not
   counted as resolved.
5. Re-check every row against its issue after the proposed fix and mark it resolved, needs source or
   needs decision. Output counts per issue before and after.
6. Say that approval is decided by the platform on re-crawl, so "resolved" means the row now fits the
   documented rule, not that it was approved.

## Output

A table of issue group, rows, proposed value with source, status; a before and after count per
issue; the rows that need source or a decision; the corrected feed rows ready to upload with
untouched columns left as they were.
