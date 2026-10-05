---
name: notes-to-recall-cards
description: Turn pasted study notes into a small deck of atomic recall flashcards plus a spaced review schedule that ends before the exam - one testable fact per card, each card traceable to a line of the notes, no card that only restates its own answer, trivia skipped and listed, the deck capped and prioritised, and every card checked against the notes. Use when someone wants flashcards or a review plan from their own notes. Not for inventing facts the notes lack, replacing the course material, judging a learner or generating large decks.
metadata:
  tier: open
  level: L2
  domain: education
  install: optional
  keywords: [flashcards, active recall, spaced repetition, study notes, review schedule, retrieval practice]
---

# Notes to recall cards

Big auto-made decks create more reviewing than learning. Keep the deck small, make every card force a
retrieval, and plan the reviews.

## Steps

1. Read the notes and number the lines or sentences so each card can cite one. Ask for the exam date
   or study window if it is missing; otherwise state the window you assume.
2. List candidate facts, then keep only what is worth retrieving: definitions, mechanisms, quantities,
   distinctions and cause-effect links. Skip trivia (names, dates, anecdotes) unless the user says it
   is examined, and list what you skipped in one line, including the note line it came from.
3. Write atomic cards: one question, one short answer, one concept. Split any question that asks two things (what and where,
   what and why) and any answer that joins two facts with "and". Reject a card whose question contains its answer or whose answer only repeats
   the question's wording. Do not make several cloze cards from the same sentence.
   Default to one card per note line. Give a line a second card only when it holds two facts that
   can each be recalled alone, and then name the other fact's line part in the source column. Two
   cards on the same line that ask about the same structure or process (what it is called and why it
   matters) are near-duplicates: keep the one that tests the more useful fact. Never write a question
   When a line holds several facts, card the load-bearing one: the mechanism, function or consequence
   (what drives what, why a structure matters) beats its label or a count, and a mechanism card is
   a top-priority card. Rank the deck so mechanism and process cards sit above labels and counts. Never write a question
   in two parts ("describe X and Y", "what are A and B") or a back that lists two items.
4. Cap the deck at 10 cards for a short note, also when the user asks for a card for everything: say
   the cap and why (more cards means more reviewing, not more learning), rank by importance, mark
   the top few, and offer a second batch. Do not exceed the cap. Reach it by dropping the lowest-priority
   facts, never by merging two facts into one card or by adding a card that overlaps another.
   Before showing the deck, read references/card-self-check.md and run its three tests on every card:
   no back word repeated in its front, one item per front and back, one card per note line.
5. Check each card against the notes: add the source line number and do not add a fact the notes do
   not contain. If the notes look wrong or incomplete, say so rather than silently correcting.
6. Give a review schedule as dated or day-numbered sessions with expanding gaps (for example day 0,
   1, 3, 7, 12) that fit the window and finish at least a day before the exam. State how long each
   session takes (cards times seconds per card) and the rule for a missed card (return it to the next
   session).
7. Do not claim the schedule guarantees a result. It is a plan the learner adjusts.

## Output

The deck as a table (number, front, back, source line, priority), the skipped list, the schedule, and
a one-line note on which cards to drop first if time runs short.
