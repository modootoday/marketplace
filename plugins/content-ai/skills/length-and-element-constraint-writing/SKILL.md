---
name: length-and-element-constraint-writing
description: Write a spoken, read-aloud or fixed-size text (eulogy, toast, bedtime story, bio, short fiction, parody) to a time or character limit and a required-element list - convert the time to a word budget at about 130 words per minute, list the required elements and check each appears, count words or characters by script rather than by feel, trim from the end of each paragraph while keeping the elements, and add no invented facts about real people. Use when a text must run a set time aloud, fit a character or word cap, or include named elements. Not for scoring tone (persona-tone-eval) or editing a long manuscript (ghostwriting-editorial).
metadata:
  tier: open
  level: L3
  domain: content-writing
  install: optional
  keywords: [eulogy, read aloud, word budget, character limit, required elements, bedtime story, bio, toast]
  approval: scripts
  requires:
    bin: [node]
---

# Length and element constraint writing

Drafts for the ear or for a box run long, and a model estimates length badly. A
three-minute speech that takes five minutes, or a bio over the character cap, is a
failure the writer finds on stage or at submission. This skill turns the limit into a
number and checks the number.

Based on five first-person reports (eulogy, bedtime story, short fiction, profile,
parody); the 130 words per minute figure is a planning default for read-aloud English,
not a measurement of the user's pace.

## Steps

1. Convert the limit. Spoken time to words: minutes times about 130 for a normal pace,
   about 110 for a slow, emotional or child-directed reading. Say the pace you used and
   offer the user the chance to time themselves. A character cap stays a character
   cap, with spaces counted or not as the platform says (ask if unknown).
2. List the required elements as a numbered list from the prompt, exactly as given
   (names, places, phrases, facts). If a required element is vague, ask or note the
   reading you chose.
3. Draft to about the budget, not above it. Use only facts the user gave about real
   people. Mood, rhythm and transitions may be written; new events, dates, family
   members, jobs or quotes may not. Personality traits, habits and groups of people
   the facts do not state ("patient", "spent his days", "family, friends and
   neighbors") are inventions too: say what the facts show and no more.
   Reach the budget with framing that needs no new facts: a greeting and thanks to
   the listeners, each supplied fact given its own paragraph and returned to at the
   end, an invitation to the listeners to recall their own memory of the person,
   reflection phrased as the speaker's own feeling about loss or remembering, and a
   closing. Aim for at least 85 percent of the budget with these. Then put
   `[ASK: ...]` where one real detail would help, and say so if the facts alone could
   not honestly fill the rest.
4. Count with the script, not by feel:
   `node scripts/count.mjs <file>` prints words, characters with and without spaces,
   and an estimated minutes at 130 and 110 words per minute, per paragraph and in
   total. Without Bash, count the words paragraph by paragraph by hand and show the
   per-paragraph counts. Never write a count you did not compute.
5. Check each required element appears, quoting the exact sentence that carries it
   and checking the quote against the text before you send it.
6. If over budget, trim from the end of each paragraph first, then shorten the
   closing; never cut a required element. Recount after the cut.
7. Always end with a shorter cut: name which paragraphs to drop or shorten to reach a
   2-minute version (about 260 words) with every required element kept, or write it.

## Output

1. The text.
2. Budget line: limit, pace, budget in words (for example "3 minutes at 130 words per
   minute = about 390 words"), then the word (or character) count and estimated time.
3. Required-elements check: element, the quoted sentence that carries it.
4. Shorter cut, as above.
5. Assumptions and open `[ASK]` items.

A text for a real person's memorial or a child is the user's to approve; do not claim
it captures the person.
