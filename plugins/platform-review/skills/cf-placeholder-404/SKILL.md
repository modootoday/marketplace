---
name: cf-placeholder-404
description: Retire a redirect on a Cloudflare zone and answer 404 instead on the free plan - a small module Worker on the apex and www routes, attached before the redirect rule is deleted so there is no 522 gap, then verified with curl. Use when a domain should stop redirecting and return not found, when parking or retiring a Cloudflare zone, or when a WAF custom response is refused as not entitled. Not for writing a Worker's application logic or reviewing wrangler bindings.
metadata:
  tier: open
  level: L2
  domain: edge-platform
  install: optional
  keywords: [Cloudflare, placeholder worker, retire redirect, 404, free plan, dynamic redirect, 522]
  verified-runtimes: [claude-code]
---

# Answering 404 on a retired Cloudflare zone

A redirect you no longer want often sits on a zone whose origin is a dummy address
(`192.0.2.1`). Remove the redirect and that dummy origin answers, which Cloudflare reports as
522. The goal is a clean 404 with no gap in between.

## Why a Worker

A WAF custom rule with a custom block response looks like the obvious tool, but on the free
plan the API refuses it ("not entitled to use a custom response"). A Worker route is available
on every plan and answers before the origin is contacted.

## Steps, in this order

1. Write a module Worker that answers every request with 404:

   ```js
   export default {
     fetch() {
       return new Response("Not Found", {
         status: 404,
         headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
       });
     },
   };
   ```

   `no-store` keeps the 404 out of caches, so the zone can be reused later without purging.
2. Upload it and attach routes `<zone>/*` and `www.<zone>/*` (and any other hostname the
   redirect covered). Confirm both routes are listed on the zone.
3. Only now delete the dynamic redirect rule (or the redirect list entry).

The order matters because the redirect ruleset runs before Workers. While the redirect exists
the Worker is attached but unreached, which is harmless. Delete the redirect first and every
request falls through to the dummy origin and answers 522 until the routes exist.

## Verify

```
curl -sI https://<zone>/
curl -sI https://www.<zone>/
curl -sI https://<zone>/some/deep/path?q=1
```

Each must show `404`, `cache-control: no-store`, and no `location` header. A `301` means the
redirect rule is still active; a `522` means a hostname has no route. Report the three status
lines verbatim.
