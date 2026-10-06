---
name: client-rulebook-copy-check
description: Check copy against one client's, brand's or season's rulebook - banned expressions, required phrasing, tone and format rules - so every finding points to the rule id it breaks, and keep each client's rulebook isolated so rules never leak from one client to another. Use when the user asks to review, proofread or approve copy, captions, banners or scripts for a specific client or brand guideline, or when an agency handles several clients with different rules. Not for general grammar editing or for ad-law claim review without a client rulebook.
metadata:
  tier: open
  level: L2
  domain: content-writing
  install: optional
  keywords: [brand guidelines, client rulebook, banned words, required phrasing, copy review, agency, brand voice, tone check]
  verified-runtimes: [codex-cli]
---

# Client rulebook copy check

Agencies and in-house teams lose time on the same mistakes: a phrase one
client bans slips into their copy, the required legal line is missing this
season, or a rule from client A gets applied to client B because both were
in the same conversation. The fix is mechanical: one rulebook per client,
every finding tied to a rule id, nothing judged from general taste.

This skill is a template. The company supplies the rulebook; the skill
applies it and nothing else.

## Inputs the company supplies

- **One rulebook per client, brand or season**, with an id and a version or
  date. Each rule has a rule id, a type (banned, required, tone, format),
  the exact text or pattern, scope (channel, product, season) and an example.
  Template: `references/rulebook-template.md`.
- **The copy** to check, with the client, channel and date it will run.

If the client or the rulebook is not named, ask. Do not fall back on another
client's rulebook or on a generic style guide.

## Isolation

- Load exactly one rulebook per check. State which one (client, id, version)
  at the top of the result.
- If several clients' rulebooks are in the conversation, use only the one
  for the named client; never carry a rule across, even one that "seems
  sensible" for this client.
- Rules whose scope does not match the channel or date (last season, another
  product line) are not applied; list them as skipped.

## Procedure

1. Confirm client, rulebook id and version, channel, run date.
2. **Banned**: search the copy for every banned expression, including
   inflections, spacing variants and obvious synonyms the rule lists. Quote
   the match and its location.
3. **Required**: check each required phrase or element in scope is present,
   in the required form and position.
4. **Tone and format**: check rules that are stated concretely (sentence
   length, honorifics, emoji use, capitalisation, character limits). A tone
   rule with no concrete test is reported as "needs a person", not scored.
5. For each finding propose a fix that satisfies the rule and breaks no
   other rule in the same rulebook.

## Stop and hand to a person when

- the rulebook contradicts itself, or the copy cannot satisfy two rules at once;
- a rule is vague ("premium feel") and the decision is a matter of taste;
- the copy makes claims that need evidence or legal review - flag them, do
  not rule on them.

## Output

1. Header: client, rulebook id and version, channel, run date.
2. Findings table: rule id, type, quoted text and location, problem, proposed fix.
3. Required elements: present or missing, per rule id.
4. Rules skipped by scope, and rules needing a person.
5. The revised copy with each change marked by rule id.
