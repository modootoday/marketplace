---
name: deck-storyline
description: Build the storyline of a presentation before any slide is designed - the one answer the deck argues, the supporting points grouped under it, and one full-sentence message per slide that reads as the whole story on its own. Use when the user asks for a deck outline, a presentation structure, slide titles or a pitch storyline. Not for designing slides or building a pptx file.
metadata:
  tier: open
  level: L2
  domain: presentation
  install: optional
  keywords: [deck storyline, pyramid principle, slide titles, presentation outline, pitch]
  verified-runtimes: [claude-code]
---

# Deck storyline

A deck fails before design when its slides are topics ("Market", "Team",
"Roadmap") instead of claims. A reader who reads only the slide titles should
get the argument; that is the test for every outline you write.

## Start from the answer

Write the deck's governing message first: one sentence that answers the
audience's question and says what you want them to do. If you cannot write it,
the deck is not ready; ask for the missing decision instead of outlining around
it.

Name the audience and the decision they make with this deck. The same content
for investors and for an internal team is two decks.

## Group the support

Under the answer, two to four key points that together justify it, each with its
evidence. Points at one level do not overlap and, together, leave no obvious
gap a sceptic would raise. Order them by what the audience needs to believe
first, not by the order the work was done.

## One message per slide

Each slide title is a full sentence that states the slide's claim
("Repeat customers bring 62% of revenue at a third of the acquisition cost"),
not a label ("Customer analysis"). The body only supports that sentence; if it
supports two, split the slide. Numbers in titles carry their unit and period.

## Output

1. The governing message and the decision asked for.
2. The outline as a table: slide number, title sentence, evidence that goes on
   it, and which key point it serves.
3. The "title read-through": all titles in order as a paragraph. If it does not
   read as the argument, fix the titles before anything else.
4. Gaps: evidence the outline needs that the user has not given, marked as
   missing rather than invented.
