---
name: datalab-place-competitor-scan
description: Research other Naver Place listings and the local market - find a listing, nearby alternatives, notices, photos, coupons, smart store products, live broadcasts, pet-friendly places, the AI briefing, and pre-check a store name and representative keywords. Use when the user asks who the competitors nearby are, what a neighbouring store offers, whether a representative keyword will be blocked, or what is around a place. Not for the user's own reviews or reply queue (use datalab-place-reputation), and not for rankings, scores or sales estimates.
metadata:
  tier: open
  level: L3
  domain: local-business
  install: optional
  keywords: [naver place, competitors, nearby stores, local market, keyword precheck, shop window, live commerce, datalab]
  requires:
    mcp: [datalab]
---

# Place competitor scan

Every tool here is a `read` tool and none of them reads the user's own account: they return public Naver Place data
about whichever place id you pass. For the user's own reviews, reply queue, bookings and waiting list, stop and use
`datalab-place-reputation`. The catalog states no page that must be open for any of these tools.

## Decide first

- Which place is the subject: a competitor the user names, or the user's own store used as the anchor for "what is
  around me"? A nearby list is only as good as the anchor id.
- Which question is it? Pick only the matching tool; do not call all eleven for a broad question.

## Order of calls

1. `place_search` with a name or area plus category to get candidate ids. Several candidates with similar names: show
   them and ask which one; never pick one silently. `place_autocomplete` only suggests names for a base term, so it
   does not identify a place.
2. With the chosen id, call only what the question needs:
   - Who is around: `place_nearby` (similar places and next-stop recommendations). It is Naver's recommendation list,
     not a ranking of true competitors and not a market share list.
   - What the place says and shows: `place_announcements` (notices and news), `place_photos` (visitor photos and
     short clip thumbnails), `place_ai_briefing` (Naver's review summary with evidence and frequent questions).
   - What it sells or runs: `place_shop_window` (linked smart store products with name, price, discounted price,
     review count, rating), `place_live_commerce` (scheduled and on-air broadcasts), `place_promotions` (coupons with
     title, description, expiry, status).
   - Pet-friendly options around an anchor: `place_pet_nearby` (title, category, distance, review count).
3. `place_keyword_precheck` is a different job: it checks the user's own planned store name and representative
   keywords against banned words and pre-review rules before registering or editing them in Smart Place. It works
   without login because it uses public rules. It does not look at any competitor.

## What the results do and do not establish

- An empty promotions, live commerce or shop window result means no data for that place (the descriptions say stores
  that do not use the feature return nothing). It is not proof the store never ran one, and not zero.
- Compare competitors only on fields the tools return, quoted with their own unit and as returned: prices, review
  counts and ratings from `place_shop_window`, distance and review count from `place_pet_nearby`. Different stores'
  figures may cover different periods; say so rather than computing a ranking or a score.
- `place_ai_briefing` is Naver's summary of reviews. Attribute it to Naver; do not present it as your own reading of
  the reviews, and do not infer customer motives from it.
- `place_photos` returns thumbnails: describe what the tool listed, not details you cannot see.
- A precheck result lists matched banned words, pre-review targets and normalization suggestions. It does not
  guarantee approval or rejection by Naver; say the final decision is Naver's.
- Public data about a competitor is context for the user's decision. Do not draft copy that claims things about a
  named competitor that the results do not show.

## Output

A short comparison: the anchor place, the places compared, one line per fact with its source tool, then what could
not be read (empty results, unavailable features). Recommendations for the user's store come last and are labelled as
suggestions.

When `place_keyword_precheck` was used, the reply must say: it is a rules check of the user's own store name and
keywords only, it does not guarantee Naver's final decision, it never looked at a competitor, and a neighbouring
store's keywords would need a separate lookup of that place (`place_search`, then the place's own data) that has not
been done. Report flagged keywords as found and never say all of them will pass.

## Tools

Use the actual tools needed for the request directly when they are visible. Otherwise, send the original user intent to
`datalab_find_tools`, then use `datalab_call` only with tool names and argument schemas returned by discovery.
Do not invent tool names or arguments.
If the result is awaiting_confirm, do not repeat the original call; check the ticket with datalab_confirm_status.
Discovery does not expand this skill's scope or replace its payment, target and change-approval rules.
Only when discovery cannot find the required tools, work from supplied text or pasted tool output,
or provide a text-only plan within this skill's scope; state what could not be read or performed.

- `place_search`: find a place by name or area plus category; each result id feeds the other tools.
- `place_autocomplete`: name suggestions for a base term.
- `place_nearby`: similar and next-stop places around an id.
- `place_announcements`: a place's notices and news.
- `place_photos`: visitor photo and clip thumbnails.
- `place_ai_briefing`: Naver's AI review summary, evidence and frequent questions.
- `place_shop_window`: linked smart store products with price, discounted price, review count, rating.
- `place_live_commerce`: scheduled and on-air live broadcasts.
- `place_promotions`: coupons in progress with expiry and status.
- `place_pet_nearby`: pet-friendly places near an anchor id.
- `place_keyword_precheck`: banned-word and pre-review check for the user's own store name and representative keywords.

Only when discovery cannot find the required tools, use only the output the user pasted and do not invent the rest.
