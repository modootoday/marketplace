---
name: csp-live-verification
description: Set or tighten a Content-Security-Policy on a page behind a CDN that injects scripts, by loading the live page in a headless browser, collecting CSP violations and network requests, allowing only what the owner wants, hashing the site's own inline script from its source text, and re-loading to confirm the beacon succeeds and only deliberate blocks remain. Use when adding, tightening or debugging a Content-Security-Policy header, or when an analytics beacon or inline script is blocked by CSP. Not for general security reviews or CORS errors.
metadata:
  tier: open
  level: L2
  domain: edge-platform
  install: optional
  keywords: [Content-Security-Policy, CSP, script-src, connect-src, CSP hash, web analytics beacon, headless browser]
---

# Verifying a CSP against the live page

A CSP written from the source files misses what the CDN adds at the edge: an analytics beacon,
bot-detection inline snippets, an email-obfuscation script. The policy is only right when the
page the visitor actually receives loads cleanly under it.

## Steps

1. Load the live page (not a local build) in a headless browser such as Playwright or
   Puppeteer. Collect console messages that report CSP violations and every network request with
   its status.
2. List each blocked or injected resource and ask the owner which ones they want. Do not allow
   everything that appeared.
3. For a wanted beacon:
   - its script host goes in `script-src`;
   - its report endpoint goes in `connect-src`. Some CDNs proxy the report to a same-origin path
     (for example under `/cdn-cgi/`), which needs `'self'` in `connect-src`, not the vendor host.
4. Inline snippets the CDN injects per request (with a per-request nonce or random content) stay
   blocked. Do not add `'unsafe-inline'` to make the console quiet; that disables the protection
   for every inline script.
5. Hash the site's own inline script from the same text the page inlines: compute the
   `sha256-...` in the build step from the exact string written into the HTML, so editing the
   script cannot leave a stale hash. A hash copied by hand from a console message drifts on the
   next edit.
6. Deploy, then load the live page again and confirm:
   - the beacon request succeeded (for example `204`);
   - the console shows no CSP violations except the ones deliberately left blocked, each named.

## Report

The final header, a table of each resource (allowed, blocked on purpose, why), and the beacon
request status from the second load. A policy is not verified until that second load ran.
