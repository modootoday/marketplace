---
name: static-site-crawl-files
description: Write the crawl files of a static marketing or docs site per origin and per locale - robots.txt, a sitemap.xml with canonical URLs and honest lastmod, the IndexNow key file, llms.txt - plus reciprocal hreflang for language twins and noindex headers for app documents, then fetch each file to prove it is served. Use when launching or auditing a static site's robots.txt, sitemap, llms.txt, hreflang or an English twin of a page. Not for submitting a sitemap to search engines or writing page copy.
metadata:
  tier: open
  level: L2
  domain: growth
  install: optional
  keywords: [robots.txt, sitemap.xml, llms.txt, hreflang, indexnow key, x-robots-tag, static site, bilingual site]
---

# Crawl files for a static site

Static generators produce these files with quiet defaults: a lastmod stamped at build time on
every URL, a sitemap that skips the blog, a robots.txt with no Sitemap line. Crawlers trust what
the files say, so a wrong file is worse than a missing one.

## 1. One set per origin and per locale root

List every origin the site answers on (apex, `www`, docs subdomain) and every locale directory
(`/`, `/en/`). Each origin serves its own `robots.txt` and sitemap; a locale directory is
covered by the origin's sitemap but needs its own entries.

## 2. robots.txt

- No blanket `Disallow: /`. Disallow only paths that must not be crawled (app shells, search
  result pages).
- A `Sitemap:` line with the absolute sitemap URL on the same origin.
- If the owner wants to be cited by AI answers, name the LLM crawlers explicitly with `Allow: /`
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended and the like). Ask; do not decide for them.
  Look up the current user-agent names rather than writing them from memory.

## 3. sitemap.xml

- Canonical URLs only: the exact form each page's `<link rel="canonical">` uses, same host,
  same trailing-slash style. No redirects, no `noindex` pages.
- Include every page type. Enumerate the build output and diff it against the sitemap; blog
  posts, tag pages and locale twins are the usual omissions.
- `lastmod` only when the real change time is known, for example the date of the last git
  commit that edited the page's source (`git log -1 --format=%cI -- <file>`). Build time is not a
  change time; when you cannot know it, leave `lastmod` out.
- For language twins, add `xhtml:link rel="alternate" hreflang="..."` entries on each `<url>`,
  matching the `<head>` links exactly.

## 4. IndexNow key file and llms.txt

- The key file is `/<key>.txt` whose body is exactly the key: no trailing newline, served as
  `text/plain`. Check with `curl -s https://example.com/<key>.txt | od -c | tail -2`.
- `llms.txt` at the origin root: the site name, one paragraph on what it is, then linked lists of
  the pages worth reading, with machine-readable twins (`.md`) where they exist.

## 5. Language twins

For each page that exists in two languages (`/p/` and `/en/p/`):

- In `<head>` of both: `<link rel="alternate" hreflang="ko" ...>`, `hreflang="en"`, and
  `hreflang="x-default"`, all absolute, all reciprocal. A one-way hreflang is ignored.
- The language switch links to the twin of the current page, not the other locale's home.
- `<html lang>` and `og:locale` set per page, not inherited from a shared layout default.

## 6. Documents that must not be indexed

App or SPA shells, previews and authenticated pages get `X-Robots-Tag: noindex, nofollow` from
the server, not only a meta tag: the header also covers non-HTML responses and a shell that
renders its meta tags late. Do not disallow them in robots.txt as well, or the crawler never
sees the header.

## 7. Verify what is served, not what is in the repo

1. Validate the server config in a container before reloading (`nginx -t` inside the image that
   will run it).
2. For each origin, fetch each file and record status and `content-type`:
   `curl -sI https://<site>/robots.txt` (`text/plain`), `/sitemap.xml` (`application/xml` or
   `text/xml`), `/<key>.txt`, `/llms.txt`.
3. Fetch one page per type and confirm its canonical is in the sitemap, its hreflang set is
   reciprocal, and an app document carries the `X-Robots-Tag` header.

Report a table: origin, file, status, content-type, finding.
