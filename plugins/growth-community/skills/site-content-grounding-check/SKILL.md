---
name: site-content-grounding-check
description: Check a generated landing page, portfolio or data explorer against its source material - list every claim, feature and number on the page, tie each to a source line or screenshot, strike invented claims and filler, recompute totals from the raw data, and click every call to action and download link. Use when a page was generated or heavily rewritten from a README, resume, screenshots or a dataset and must show only what the source supports. Not for site-level smoke tests of routing and consent (hosted-site-prelaunch-smoke) or launch email copy (launch-announcement-email).
metadata:
  tier: open
  level: L3
  domain: growth
  install: optional
  keywords: [landing page, generated site, unsupported claim, portfolio, data explorer, download link, grounding, fact check]
  verified-runtimes: [claude-code]
---

# Grounding a generated page in its source

Generated pages fill gaps with plausible content: customer counts, award badges, AI features,
a client list. Each one is a claim the owner is then answerable for. The source material the
user gave is the whole truth for this check; anything not in it is unsupported, not false.
This skill rests on a few first-person reports of generated pages; keep to the materials shown.

## 1. Build the claim ledger

Go through the page top to bottom and list every claim, feature, number, name, date and
testimonial. Output a table: claim | where on the page | source line or screenshot | verdict
(supported, unsupported, partly supported). A claim with no source line is unsupported; do not
mark it supported because it sounds reasonable. Count the rows by verdict.

## 2. Strike what is invented

- Remove or flag unsupported numbers ("trusted by N"), invented clients, jobs, awards, quotes
  and ratings. Offer a replacement only if the source holds a real fact to use; otherwise leave
  a visible placeholder for the owner and say so.
- Strike filler and buzzwords that carry no checkable content, and say what concrete fact from
  the source could take their place.
- For portfolios and profiles, put the owner's real cases first and keep contact links that
  exist; do not add a role, employer or date that the source lacks.
- A feature the source names but shows no screen for is "supported by text only"; say so.

## 3. Recompute data, do not trust the summary

For explorers and tables built from raw data: recompute each shown total, count and average from
the raw rows, and compare. Then check that each tab, filter and search term shows the right set
(sample at least one per tab and one search with a known answer, including an empty result).
Report the expected value, the shown value and the difference. If you cannot run the data, give
the exact recomputation to perform and mark the item unverified.

## 4. Click every call to action

List every button, link and download: label, target and what loads. A link to `#`, a placeholder
domain, a file that is not in the build, or a mail address that is not the owner's is a defect.
If you cannot click, inspect the href values in the source and say the click-through was not
done.

## 5. Report

1. The ledger with counts.
2. Defects in order: unsupported claims, wrong numbers, dead or wrong links.
3. A corrected claim list: only supported claims, each with its source line.
4. What you could not check (live links, owner facts that are missing) and the question the
   owner must answer.
