---
name: search-engine-submission
description: Get a new or changed site in front of search engines without a browser session - prove domain ownership with a DNS TXT record through the Site Verification API, add the Search Console property and submit the sitemap as a service account, notify Naver, Bing and other engines through IndexNow, and wire the resubmit into the publish step. Use when the user wants a site indexed, asks to automate sitemap or Search Console submission, or launches pages on a new domain. Not for writing page copy or keyword research.
metadata:
  tier: open
  level: L2
  domain: growth
  install: optional
  keywords: [search console, sitemap, indexnow, site verification, naver search advisor, bing webmaster, seo]
  locales: [ko]
---

# Search engine submission

Crawlers find a site eventually. Submission makes it days instead of weeks and tells you when a
page fails. The work splits into a one-time ownership step and a repeatable submit step; only the
second belongs in the publish pipeline.

## 0. Inventory every public domain first

Submitting the one site you were asked about leaves its siblings unindexed. Before
any engine, list the hosts that actually serve the public:

- Start from the DNS zones and the deploy configs (routes, custom domains), then
  request each host and keep those that answer with real pages.
- Leave out operational and auth hosts (admin, status internals, login, API,
  webhooks) unless the owner wants them found; make sure those carry `noindex`.
- Mark which domains you own and control DNS for. Ownership proof needs DNS or a
  file on the host; a domain you do not control goes back to its owner.
- Record the list with each host's sitemap URL and verification state, so the
  next launch extends it instead of starting over.

## 1. Check the site is worth submitting

Before any engine sees the URL, fetch each page the way a crawler would:

- `robots.txt` names the sitemap and does not disallow the pages you want indexed.
- `sitemap.xml` lists absolute canonical URLs on the right host, with real `lastmod` dates.
- Each page returns 200, carries no `noindex` (meta or `X-Robots-Tag` header), and its canonical
  points at itself. Keep `noindex` on API and auth paths only.

Submitting a sitemap whose pages say `noindex` gets you a report of errors, not an index.

## 2. One identity, not your personal login

Use a service account (or the platform's equivalent) that the pipeline can hold:

- Create it in a project you already use for this brand; give it no project IAM roles. Search
  Console access comes from site ownership, not IAM.
- Enable the Search Console API and the Site Verification API in that project.
- Store its key the way the project stores other secrets. Never paste it into chat, a commit or
  a log; check it by length.

A personal OAuth login works once and then asks for reauthentication on a headless server.

## 3. Prove ownership with DNS (once per domain)

Domain properties (`sc-domain:example.com`) cover every subdomain and protocol, and only DNS can
verify them.

1. Ask the Site Verification API for a token: `POST /siteVerification/v1/token` with
   `{"site": {"type": "INET_DOMAIN", "identifier": "example.com"}, "verificationMethod": "DNS_TXT"}`.
2. Add the returned `google-site-verification=...` value as a TXT record on the apex. Leave any
   existing verification records alone; each owner has its own.
3. Confirm the record from a public resolver (`dig +short TXT example.com @1.1.1.1`), then
   `POST /siteVerification/v1/webResource?verificationMethod=DNS_TXT` with the same site.
4. Add the property: `PUT /webmasters/v3/sites/sc-domain%3Aexample.com`.

The service account is now an owner. If the people who use the console are not already owners,
add them to the web resource's `owners` list so the property shows up for them too. Deleting the
TXT record later silently removes the ownership.

## 4. Submit

- **Google**: `PUT /webmasters/v3/sites/{site}/sitemaps/{sitemap url}`, both URL-encoded. The
  old sitemap ping endpoint is retired; do not use it.
- **IndexNow** (Naver, Bing, Yandex, Seznam and others share submissions): host a key file
  (8 to 128 hex characters, public by design) on the site, then `POST https://api.indexnow.org/indexnow`
  with `host`, `key`, `keyLocation` and `urlList`. Send only URLs that changed. A 200 or 202 means
  received, not indexed; a 403 means the engine could not read the key file.
- **Google Indexing API** is limited to job postings and livestream pages. Do not use it for
  ordinary pages.

## 5. Make it repeatable

Hook the submit step to the moment content changes (a deploy, a catalog publish), after the new
content is live. Check the key file is served before notifying IndexNow, and fail loudly on a
non-2xx so a broken submit does not pass as done.

## 6. What stays manual

Engines without a submission API need a person once. Say which, and what to click: see
`references/naver.ko.md` for Naver Search Advisor, the main gap for Korean sites.

Naver Search Advisor registers each host separately (a subdomain is its own site) and
proves ownership with an HTML file on the host or a `naver-site-verification` meta tag
in the page head. Ship the meta tag or file with the site's build so a redeploy does
not remove it, then have the person click verify and submit the sitemap. Do the
inventory above first so every public host gets registered, not just the apex.

## 7. Report

State what ran against what: the property, the sitemap URL, the IndexNow status code and URL
count. Coverage numbers arrive days later in the console; do not report a submission as indexing.
