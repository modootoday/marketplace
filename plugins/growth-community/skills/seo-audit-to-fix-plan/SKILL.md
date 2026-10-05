---
name: seo-audit-to-fix-plan
description: Turn a site-audit export, a list of pages or a sample of search results into a fix plan grouped by root cause, with affected URL counts, internal link placements built only from pages and anchors that exist, a staged rollout for large page sets, and a verification step per fix. Use when you hold a crawl or audit export, a page list to interlink, or a SERP sample to shape a landing page outline. Not for writing robots.txt or sitemaps (static-site-crawl-files) or submitting to search engines (search-engine-submission).
metadata:
  tier: open
  level: L3
  domain: growth
  install: optional
  keywords: [seo audit, duplicate title, redirect chain, internal links, pagination, serp, landing page structure, indexing rollout]
---

# From audit export to fix plan

An audit tool lists symptoms row by row. One cause usually produces many rows, and one wrong
fix applied to all rows can hurt pages that were fine. Work from the rows you were given; do not
invent URLs, counts or search-engine behaviour beyond them.

## 1. Group rows by root cause

- Read every row type with its count. For each type, split the rows by what produced them:
  a paginated series (`/blog/page/2`), a template that omits the page name, parameters,
  a trailing-slash or host variant, a real content duplicate. Say which rows you could not
  classify and what you need to see (the URL list, one sample page's HTML).
- Output a table: group | cause | affected URL count | fix | verification. Counts come from the
  export; if the groups do not add up to the row total, say so.
- Priority is affected count first, then whether the URLs are meant to be indexed. Rows on
  pages that are blocked or noindex on purpose are not defects: list them as "no action" with
  the reason.

## 2. One fix per group, stated as a change

Name the change in the form someone can implement: the template field, the redirect rule, the
link to repoint. Do not recommend a blanket action (noindex all, redirect all) across a group
whose members have different causes. Where a fix needs a decision from the owner (which of two
duplicates stays), put it as a question, not as a default.

## 3. Verify each fix by what is observable

Give every group its own check, and say what result means done:

- titles and meta: view the rendered HTML (`curl -s <url>` and read the `<title>`), not the
  template source;
- redirects: `curl -sIL <url>` shows one hop to a 200;
- broken internal links: recrawl the pages that linked to them, or grep the built output for
  the old path;
- indexing: a recrawl of the audit tool after deploy, and the search console report you already
  use. State that a recrawl shows the fix was deployed, not when search engines will react.

## 4. Internal links: only from what exists

When asked for link placements, use only the pages and text the user supplied.

- For each placement give: source page, the exact sentence that hosts the link, the anchor text
  taken from that sentence, and the target page. If the sentence is not in the pasted content,
  say you cannot place it rather than writing a plausible one.
- Do not propose a target that is not in the page list, and do not link a page to itself or
  stack several links to one target in a paragraph.
- Check each target is a live, indexable page that resolves directly.

## 5. A SERP sample to a landing outline

- For each result in the sample, record its search intent and format (guide, list, product page,
  map) and its section order. Do not copy their claims, wording, prices or numbers.
- Build the outline from the user's own facts and the intent the results share. Mark every
  claim in the outline as "owner supplies" or "from the owner's pages".
- Checks before shipping: the page is not a paraphrase of one result, each claim has a source in
  the owner's material, and the mobile layout reads in the same order.

## 6. Many generated pages: stage the rollout

When thousands of pages exist or will be published at once:

- Publish a priority set first (the pages with a real searcher and unique content), link it from
  navigation and category pages, then add the next tranche once the first is reported indexed.
- Give navigation and category or search pages their own entry in the plan: pages reachable only
  by search box have no link path.
- Verify with a sample: pick pages from each tranche, check they return 200, carry a canonical
  to themselves and appear in the sitemap, then read the indexing report. If a tranche is not
  indexed, reduce what is published rather than resubmitting the same set.

## 7. Report

Fix plan table, the "no action" list, the placements or outline, the rollout order, and a last
line listing what you could not verify (live indexing state, pages you were not shown).
