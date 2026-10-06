---
name: listing-copy-spec-fidelity-batch
description: Rewrite many product titles and descriptions from a spec sheet or catalog export for a marketplace or shop, using only facts in each SKU's own row, with titles counted by code against the channel limit, banned words and required attributes checked, and a re-upload sheet with unchanged SKU keys plus a rejected-claims list. Use when a seller or merchant pastes spec rows and wants titles or descriptions for a batch of SKUs. Not for identifying an unknown item (item-identification-from-photos), store-page SEO, or legal review of claims.
metadata:
  tier: open
  level: L2
  domain: commerce
  install: optional
  keywords: [product title, product description, batch, spec sheet, catalog export, character limit, marketplace listing, SKU]
  verified-runtimes: [codex-cli]
---

# Listing copy that stays inside the spec

Generated listing copy fails in two repeatable ways: it adds a feature the spec never states
(waterproof, a year, a warranty), and it misses the title limit because characters are counted by
eye. A buyer then receives something other than what was advertised. This skill writes copy from
the row and checks it mechanically.

## Steps

1. Load the inputs: one spec row per SKU, and the channel rules (title limit, banned words,
   required attributes). If a rule is not given, ask for it or say it is assumed; never invent one.
2. Write each title and description from that SKU's row only. Tag every claim in the description
   with the source column it came from. A claim with no source column is not written.
3. Count each title's characters with code (for example `node -e` on the string), spaces
   included, and show the count next to the title. If a shell is unavailable, count in groups of
   ten and show it. Cut to the limit by dropping the least important words, never by dropping a
   required attribute.
4. Check banned words and required attributes per title and say which were checked.
5. Treat the requester's wish as a request, not a source: when they ask for a claim that the row
   does not state (competitors say it, it is probably true, it sells better), do not write it. Put
   it on a rejected list with the SKU, the claim and "no source column", and ask for the spec value.
6. Output a re-upload sheet with the SKU keys exactly as given and unchanged, new title, character
   count, description, then the rejected list and the questions. Show old against new for any title
   that existed. End the reply with the line "Checked against the pasted spec rows only, not against the
physical products."

## Output

Per SKU: key, title with count and limit, description with source tags. Then the rejected claims,
the banned-word and attribute check result, and what the spec would need to say to allow each
rejected claim. State that the copy was not checked against the physical product.
