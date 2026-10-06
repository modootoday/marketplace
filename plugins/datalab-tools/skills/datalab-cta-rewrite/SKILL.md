---
name: datalab-cta-rewrite
description: Rewrite the call to action that closes a blog post into two or three clear, specific candidates, each with the technique and the reason, using real search phrasing when the post promotes something. Use when the user asks to polish a post's closing line, fix a CTA, or write a purchase or sign-up prompt for a Naver blog post. Not for conversion predictions, A/B test design, invented social proof or urgency, or landing pages.
metadata:
  tier: open
  level: L2
  domain: copywriting
  install: optional
  keywords: [cta, call to action, blog closing, copywriting, naver blog, search keywords, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# CTA rewrite

Rewrite the closing call to action of a blog post. The output is 2 or 3 candidate lines; nothing is inserted into the
editor. The user pastes the one they choose.

## Get the source

1. CTA or full post pasted by the user: that is the source; skip the rest.
2. Draft open in the editor: `editor_read`, `editor_read_structure`.
3. Published post: `my_content_read`, `my_content_detail` (needs a title or URL).
4. None of these: ask for the text and stop. Invent nothing.

## Find the CTA

Find the closing paragraph that asks for an action. If there is none (a purely informational post), propose new
candidates and do not say you "fixed" an existing line.

## Search phrasing (when it applies)

If the CTA points at a product or service, `search_keywords` and `autocomplete_keywords` show how people actually search
for it; work that wording in and name the phrase you used. Skip for posts that promote nothing. Search statistics
describe searchers, not this blog's readers; never use them to claim who the readers are.

## Rewrite

- Clarity: one verb, one action; the line says what happens on click.
- Specificity: what they get or how long it takes ("get a 3-minute quote"), only when true.
- Less friction: say a step is short only if it is.
- Keep the original register (formal or casual speech level) and do not turn an informational post into a hard sell.

Output for each candidate: the line, the technique (clarity, specificity, less friction, search phrasing), and a
one-line reason, plus the original CTA quoted (or "none, new proposal"). Format: references/output-format.md;
principles: references/principles.md.

## Never invent

- Conversion or click-through predictions, uplift, ROI, revenue: no tool observes them. When asked, say so.
- Unverified numbers like "chosen by 10,000 people" or "N% satisfied": only counts the user confirms as real.
- Urgency that is not a fact (low stock, closing soon): only if the user confirms it is true. Otherwise leave it out
  and say why (a false scarcity claim can be a misleading ad).
- A/B test design or sample sizes: there is no tool to split traffic.

## Not done here

The editor is not changed. Product detail and landing pages are out of scope. Store sales are not linked to the CTA:
no tool connects a reader to a purchase, and linking them would pass correlation off as cause.

## Tools

- `editor_read`, `editor_read_structure`: read the unpublished draft open in the Naver editor.
- `my_content_read`, `my_content_detail`: read a published post identified by title or URL.
- `search_keywords`: search volume for the product's phrasings; only when the CTA promotes something.
- `autocomplete_keywords`: how searchers complete the product name; same condition.

When these tools are not available, work from the pasted text and any pasted keyword output.

