---
name: series-treatment-causal-review
description: Compress a long series bible or season outline to a short treatment while keeping each episode's cause, choice and consequence chain, tie each major event to the lead's goal, choice and cost, mark steps where motivation exists only in the script and not on the page, and list what was cut and why with names and dates kept from the source. Use when a writer must shorten a bible to a page limit or a producer says the character's change or motivation is not visible in the outline. Not for line edits, new plot, or a continuity check of a draft chapter (manuscript-continuity-audit).
metadata:
  tier: open
  level: L3
  domain: fiction-editing
  install: optional
  keywords: [series bible, treatment, season outline, motivation, cause and effect, compression, episodes]
  verified-runtimes: [claude-code]
---

# Series treatment causal review

A short treatment fails when it lists events and drops the reasons between them. Compress by
keeping the chain, not by trimming adjectives.

## Steps

1. **Extract per episode.** From the pasted bible only, write for each episode: the event, the
   cause (what made it happen), the choice the lead or key character makes, and the
   consequence that feeds the next episode. Fill each cell from the text, including the link
   the text itself gives to the neighbouring episode (the previous episode's consequence is
   this one's cause). Write `not on the page` only for a cell the text truly does not
   supply, never for one you can read off the adjacent episode. A cell holds only what the
   text says: no inferred event, object or state ("still has the ledgers") that the text does
   not state, and no cell that contradicts another row. Read `references/worked-example.md`
   first: it shows the table, how a consequence is read off the next episode, and the last
   episode's consequence as "end of the outline" rather than an invented outcome. A choice
   cell holds the action the text gives (hides, refuses, takes), not `not on the page`.
2. **Goal, choice, cost.** For each major event state the character's goal at that point,
   the choice made and what it costs them. Where the bible does not state one of these, write
   `not on the page` and mark it as a place the producer's note applies: motivation present
   only in the script is invisible in the outline.
3. **Compress to the limit.** Fit the stated length (count the words or pages asked, state the
   count achieved). Land within about 10 percent of it: spare room is for restoring chain
   links and the cost of each choice, not for stopping short. A treatment of 100 words for a
   150-word request is a miss even when the reasons are missing; count before sending and add
   the stated costs and links until the count is in range. Write the treatment as connected sentences that carry the chain ("because",
   "so", "which forces") rather than one line per episode, and keep every episode's choice.
   Use "because" or "so" only for a link the text states; use "then" where it states none
   (see the treatment section of the worked example). State the word count of the treatment.
   Cut secondary characters, repeated beats and description. Keep names, dates and place names
   exactly as in the source.
4. **Cut list.** List only what you actually condensed or removed from the pasted text, per
   episode, quoting the dropped words, with the reason (secondary, repeated, no downstream
   consequence). Material that was not pasted is reported as `not seen`, never as a cut, and
   you do not guess what it contains or how long it is. Mention any cut that a later event
   depends on and restore it.
5. **No new plot.** Do not add scenes, motives or twists. A gap is reported as a gap with a
   question for the writer, not filled. Every question and every table cell may rest only on
   words in the pasted text: before sending, check each one against the paste and delete any
   that assumes a relation the text does not state (who owns what, who knows whom, what is
   mentioned in which episode). A question asks what the reason is; it does not propose a
   candidate reason, fact or plot point ("is he named in the ledgers?", "did she know?"). The
   treatment adds no framing phrase either ("the same brother whose debt...", "the licence she
   lost") that restates one episode inside another: it uses only the source's own words and links.
6. **Approved changes.** When a table read or note approved changes, carry them into episode
   and per-actor documents by speaker, scene and script version, and list any not yet
   carried.

## Output

The treatment at the requested length, then a table of episodes with cause, choice and
consequence, a list of missing-motivation steps with questions for the writer, and the cut
list. Every decision stays with the writer.
