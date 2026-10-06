---
name: hosted-site-prelaunch-smoke
description: Smoke-test a site or small web app on its real hosting target before launch, not only locally - upload paths, deep-link routing after refresh, form saves and where they land, secrets and config not served, no unauthenticated write path, business facts and redirects against the source of truth, analytics firing only after consent with conversions counted once, and third-party API gaps - then triage findings into launch blockers and fixes. Use when a site or app built locally, often with a generator, is about to go live or has just been deployed and needs a go or no-go check. Not for comparing an old and a new site, scanning a repository for leaked secrets, or writing page content.
metadata:
  tier: open
  level: L3
  domain: growth
  install: optional
  keywords: [prelaunch checklist, smoke test, deployment, routing 404, exposed env file, consent, analytics, form handler]
  verified-runtimes: [claude-code]
---

# Hosted site prelaunch smoke test

A site that works on the builder's machine often breaks on the host: server MIME types differ,
routes need a rewrite, a config file is served to anyone, and measurement fires before consent.
Test the deployed URL, in the order below, and rank what you find.

## Steps

1. **Deployed target, not local.** Test against the hosting URL. For each check, record the URL
   or request, the status and what came back. Say which checks you could not run from where
   you are (no network, no deploy access) instead of assuming they pass.
2. **Upload, forms and storage.** Submit a real test inquiry and an image upload. Confirm where
   it lands (database, inbox, file) and that a person will see it. Check the stored record, not
   the success message.
3. **Routing.** Open deep links directly and refresh them (a detail page, a nested route); a 404
   on refresh means the host needs a rewrite or fallback to the app entry. Check redirects from
   old addresses return one hop to the right page, and that the trailing-slash and www
   variants agree.
4. **Secrets and config.** Request the usual leak paths on the deployed host (`/.env`,
   `/.git/config`, build manifests, backup or config files). A 200 with keys is a blocker:
   take it down first, then rotate every key that was exposed and treat each as already
   compromised: while it was public, anyone could have fetched it. Also check the access logs for
   earlier requests.
5. **Write paths.** Every POST or upload endpoint: is authentication, a server-side origin or
   token check, a size limit and a rate limit in place? An open write endpoint is how a form
   becomes a spam or abuse relay. CORS headers only steer browsers and do not stop a script
   from posting, so they are not the protection; the server must check and throttle.
6. **Business facts.** Compare address, route directions, opening hours, phone and prices on the
   page with the source of truth the owner gives you, and check mobile load time on the
   deployed page.
7. **Consent and measurement.** With a clean browser profile, confirm analytics and ad tags do
   not fire before the consent choice, honour a refusal, and that each conversion event fires
   once, not once per render. Measurement that fires before the visitor chooses is a violation
   to fix before launch in every case; do not downgrade it to optional because the audience
   region is unknown.
8. **Third-party data.** Where the page lists items from an API, compare the count and fields
   with the provider's own view. Missing items with no error are a data gap to confirm with the
   provider, not a pass; check per-item access rules (login-only items) and make missing data
   visible on the page rather than silently blank.

## Output

A triage list in this order: launch blockers (exposed secrets, open write paths, broken
checkout or inquiry storage, measurement before consent), fix before launch
(routing, redirects, wrong facts, data gaps), and polish. Each row has the evidence (request and
response), the likely cause, the fix and who owns it. Finish with a go or no-go, the checks not
run, and the re-test to do after the fixes.
