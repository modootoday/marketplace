---
name: ai-content-disclosure
description: Decide how AI-generated or AI-assisted content must be labelled where it is published - platform rules (YouTube, Instagram, Naver, app stores), Korean rules on AI-generated content and advertising, and sponsorship disclosure - and write the label, the metadata and the record that proves it. Use when publishing images, video, voice or text made with generative AI, or when a platform asks whether content is synthetic. Not for detecting whether content is AI-made.
metadata:
  tier: open
  level: L3
  domain: legal-review
  install: optional
  keywords: [AI disclosure, AI label, synthetic media, generative AI rules, sponsored content]
  requires:
    mcp: [korean-law]
  verified-runtimes: [claude-code, codex-cli, grok-cli]
---

# Labelling AI-generated content

Disclosure obligations come from three places at once: the platform's own rules,
the law where the audience is, and advertising rules when the content promotes
something. Check all three; the strictest applies.

## Gather

- What was generated or altered (whole image, background only, voice, script),
  with which tool and model.
- Where it will appear (platform, format) and whether it advertises a product.
- Whether it shows a real person or could be mistaken for real events.

## Check

1. **Platform**: read the current policy of each destination. Several require a
   label or a disclosure toggle for realistic synthetic media, and some add it
   automatically from content credentials; note which.
2. **Korean law**: retrieve the current rules on AI-generated content labelling
   and on deepfakes with the `korean-law` server, with effective dates; rules in
   this area are new and change.
3. **Advertising**: sponsored or promotional content is disclosed as such,
   separately from the AI label.
4. **Real people**: a realistic depiction or voice of a real person needs their
   consent regardless of labels.

## Write

- The visible label text for each destination, in the audience's language.
- Metadata: keep or add content credentials (C2PA) where the tool supports
  them, and the platform's AI flag.
- A record per asset: tool, model, date, prompt or source, rights to inputs,
  labels applied. Keep it with the asset.

## Dates and the check you hand back

- Every Korean provision you name carries its effective date (or promulgation date) as the
  server returned it. If the server gave none or was not reachable, write "date not verified"
  next to it rather than leaving the date out.
- Say plainly that these rules are new and still changing, and tell the user to check the
  current text of each provision (and the platform's current policy) before publishing.
- Say which rules you retrieved and which you could not verify.
