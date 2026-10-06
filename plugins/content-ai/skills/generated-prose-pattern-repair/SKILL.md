---
name: generated-prose-pattern-repair
description: Find and repair stock frames that AI drafts repeat in any language - the not-X-but-Y contrast, promotional openers and adjectives, verdict-style backchannels, choppy fragment runs, tangled modifiers - by counting the frame per paragraph first, keeping contrasts that carry a real claim, rewriting with the target language's own connectives and word order, adding no new facts, and re-counting afterwards. Use when a draft or chat reply keeps using one phrasing habit that an instruction to stop did not remove, or the user asks to make AI-sounding text read natural in German, Chinese, Japanese, French or English. Not for matching a client's voice, checking a persona, or rewriting Korean UI copy.
metadata:
  tier: open
  level: L3
  domain: content-writing
  install: optional
  keywords: [AI prose, repeated phrasing, not X but Y, promotional tone, fragments, modifiers, draft repair]
  verified-runtimes: [claude-code]
---

# Generated prose pattern repair

Users in several languages describe the same thing: one frame shows up in almost every
paragraph, and "stop doing that" removes it for a reply or two. The fix that holds is to
measure the habit in the draft, repair it where it carries no claim, and measure again.

For German text read `references/german-contrast-frames.md` first: it has the keep-or-rewrite
table, idiom traps (for example "zweimal weniger" is not German for "two fewer") and a worked
repair.

## Steps

1. Name the frame(s) to hunt: from the user, or from the draft's most repeated shape (for
   example "not only X but also Y", "it is not X, it is Y", a promotional opener, an
   evaluative reaction before the answer, a run of one-to-three-word sentences).
2. Count before editing. Give a table with one row per paragraph and the number of instances
   of each frame, plus the total. Quote the instance when it is short.
3. Classify each instance. Keep it when the negation carries a real claim: it corrects a
   misreading the text itself raises, or it scopes what the sentence denies (what the study
   did not measure, what a rule does not cover). Rewrite it when it only decorates, adds
   praise, or sets up a point that could be stated directly.
4. Rewrite in the target language, not by translating the English fix. Use that language's
   own connectives, clause order and politeness: German verb-final subordinate clauses and
   its own concessive particles, Chinese logical links between clauses, French informational
   openers instead of promotional ones, Japanese distance and politeness kept at the level
   the user set. Do not swap one frame for its twin ("not merely ... but rather" is the
   same habit).
5. Before writing the final text list every fact, number and qualifier per paragraph and
   tick each one off in the rewrite; a qualifier that sat inside the frame (an adjective, a
   season) stays as an adjective or clause. Read the rewrite once as a native reader: any
   sentence that is a calque or a wrong idiom is a defect even if the facts are right.
   Preserve every fact, number, hedge, scene event and intended emphasis. Add no praise, no
   new claim and no new event. For a tangled modifier, name actor, action and target first;
   when the intent is unclear give two readings and ask, rather than choosing.
6. Count again on the rewritten text and report remaining instances and why they stay.

## Output

The per-paragraph count table, the keep-or-rewrite list with a one-line reason each, the
rewritten text, and the recount with the kept instances named.
