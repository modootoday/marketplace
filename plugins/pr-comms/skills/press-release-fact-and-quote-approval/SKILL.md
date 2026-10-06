---
name: press-release-fact-and-quote-approval
description: Draft a press release or statement in which every sentence carries the id of an approved fact, quotes are copied byte for byte from text the named spokesperson approved, and claims such as AI-powered, first, leading or record-setting are flagged for substantiation instead of written as fact. Sentences with no approved fact are removed and listed, and the draft ends with an approval checklist. Use when someone asks for a press release, announcement or public statement and supplies a fact sheet, approved quotes or both. Not for media lists or pitch angles (media-target-and-angle-verification) or legal review of claims.
metadata:
  tier: open
  level: L3
  domain: pr-comms
  install: optional
  keywords: [press release, fact sheet, approved quote, spokesperson, substantiation, announcement]
  verified-runtimes: [codex-cli, gemini-cli, grok-cli, antigravity]
---

# Press release fact and quote approval

A model asked to "write the release" improves the quote and adds a market figure that sounds
right. Both are published words that someone has to answer for. This skill builds the release only
from what was approved and shows which approved item each sentence rests on.

## Steps

1. Load the inputs and name them: the approved fact sheet (one id per fact: F1, F2 and so on), the
   approved quote text with the speaker's name and title, the dateline, and the release's purpose.
   If a fact sheet is missing, ask for it; do not fill the gap from memory or from the web.
2. Draft in the standard release order (headline, dateline and lead, body, quote, boilerplate,
   contact line) using only the facts you were given.
3. Tag every sentence of the body with the fact id it uses, in square brackets. A sentence that
   needs no fact (a transition) may stay untagged. A sentence that states anything checkable and has
   no id is removed from the draft and listed under "Removed, no approved source", with the missing
   fact named. Never add a number, name, date, ranking, customer or market statistic that is not in the
   fact sheet, even a plausible one.
4. Quotes: copy the approved text character for character, with the same punctuation, spelling and
   capitalisation, inside quotation marks and attributed as approved. Do not shorten, smooth, translate
   or merge quotes. If the quote needs a change to fit, list the wish as a question for the spokesperson,
   and leave the quote as approved. A quote that is not in the approved text is not used.
5. Flag claims that need substantiation: superlatives and priority claims (first, only, best,
   leading, largest), technology labels (AI-powered, patented, certified), comparisons and any
   performance number. For each, say what evidence the fact sheet gives, or write "no evidence
   supplied" and keep the claim out of the headline.
6. End with an approval checklist: each fact id with its source and approver, the quote with
   the name of the person who must re-approve any change, the flagged claims awaiting evidence with
   the role that must sign each off (fact owner, legal or compliance, or "approver to be named"), the
   removed sentences, and the embargo or release date to confirm.

## Output

The draft with fact ids, the removed-sentence list, the quote comparison (approved text and the text
used, identical), the substantiation flags and the approval checklist. Say what you could not verify:
the facts are taken as approved because the user supplied them, and legal or compliance review of the claims
is a separate step for a qualified person.
