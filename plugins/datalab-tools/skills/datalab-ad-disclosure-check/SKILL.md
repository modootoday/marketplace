---
name: datalab-ad-disclosure-check
description: Check whether a pasted Korean blog or social post needs a sponsorship or ad disclosure, and whether the draft actually carries one, against bundled excerpts of the Korean fair labeling act and the endorsement guidelines. Use when the user asks whether a sponsored, gifted or affiliate post needs an ad label, or whether their disclosure wording and placement are enough. Not for a legal verdict, for drafting terms or privacy policies, or for real estate, finance or environmental ads.
metadata:
  tier: open
  level: L3
  domain: ad-disclosure
  install: optional
  keywords: [sponsored post, ad disclosure, endorsement guidelines, fair labeling act, influencer, blog review, korea, datalab]
  requires:
    mcp: [datalab]
  verified-runtimes: [codex-cli]
---

# Ad disclosure check

Show, with quotes from the bundled source text, whether a disclosure is needed and whether the draft has one. This is
not a verdict tool.

## Input

The text the user pasted is the only input. Do not read the editor through tools: the user should know exactly what
was reviewed. No text pasted: ask for it and stop. Invent nothing.

## Procedure

1. **Economic interest first.** Ask, or take from the message, whether the advertiser gave cash, the product, vouchers,
   points, a discount, employment or a sales commission. None: no disclosure duty arises; quote the exception in
   references/ad-disclosure-rules.md section 1 and stop.
2. **Medium.** Text post, photo, video or live stream. Quote only that medium's item from section 3 of the rules.
3. **Compare the draft.** Find the disclosure wording. If found, quote the sentence exactly and state only facts about
   its placement and clarity against section 2 and 3, for example: it sits mid-body rather than in the title or first
   part; it says only "trial group" (the reviewer-program label), which section 2 lists among wordings not accepted as a clear disclosure; a brand-name
   hashtag alone is not accepted. If none is found, say only that no disclosure wording was found.
4. **Output** in this shape:

```
## Disclosure duty
{yes / no / unclear}: basis {quoted section of the rules file}

## Draft comparison
- Disclosure wording found: {"exact quote"} or "not found"
- Against the medium's requirements: {facts compared with section 3}

## For you to check
{points the user must confirm; nothing decided for them}
```

## Rules

- Cite only what the two reference files contain: the fair labeling act article 3 and the endorsement guideline
  excerpts, and the Naver terms excerpt. No other article numbers, notice names or case numbers; if asked, say it is
  not in the bundled text.
- Never give a final verdict ("this is a violation", "this is fine", "safe"). Not seeing a label is a fact, not a
  violation: it may sit in a photo or first comment this check cannot see.
- No risk scores, fine estimates or detection odds.
- If the user received an economic benefit, the Naver "own-money review" tag cannot be used (Naver terms excerpt).
- Every answer says the result is not legal advice, that the quotes come from a bundled copy of a point in time, and
  that the current text must be checked (national law information center, the Fair Trade Commission, or a lawyer)
  before acting.
- Out of scope: drafting terms or policies, editing the post for the user, real estate, financial products,
  environmental claims, suspension orders, fines.

## Tools

The skill reads no tool on purpose: the pasted text is the input. The extension MCP server `datalab` only needs to be
present for the other skills of this plugin.

Bundled translated sources: references/ad-disclosure-rules.md and references/naver-terms-excerpt.md.
