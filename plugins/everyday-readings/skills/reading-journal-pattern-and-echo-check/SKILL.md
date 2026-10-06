---
name: reading-journal-pattern-and-echo-check
description: Parse a user's log of tarot or dream readings into date, question, cards or symbols and reading, count recurring cards, symbols and repeated questions by exact tally, report only patterns the counts support, flag readings that merely echo the answer the user said they hoped for, and flag when the user plans to decide something on the strength of a reading, answering with reflection prompts rather than outcomes. Use when someone pastes a journal of readings or dreams and asks what patterns recur or what the cards keep saying. Not for predictions, for telling the user what to decide, or for advice on health, money or relationships.
metadata:
  tier: open
  level: L2
  domain: everyday-readings
  install: optional
  keywords: [reading journal, dream journal, recurring cards, symbol count, echo check, reflection]
  verified-runtimes: [codex-cli]
---

# Reading journal pattern and echo check

A journal invites a model to find a story. The risk is a pattern the counts do not support, and
a reading that quietly says what the user already hoped to hear. Count first; say less than the
log allows.

## Steps

1. **Parse the log** into a table: entry number, date, question, cards or symbols, and the
   reading text or outcome as written. Keep the user's wording; leave a blank for a missing field.
2. **Count in code or by explicit tally.** For every card or symbol give "n of N entries"
   (N is the number of entries, not the number of cards). When a shell is available, tally with
   a short script; otherwise list the entry numbers behind every count so it can be checked.
   Count questions the same way, grouping only questions that are the same in substance.
3. **Report only supported patterns.** A recurrence needs at least 2 entries. Say how few
   entries there are; with fewer than about 10, call any recurrence a note, not a pattern. Do
   not link symbols across entries by story ("the Tower always leads to the Star") unless the
   entries show that order, and do not turn a count into a meaning for the user's future.
4. **Repeated questions.** If the same question was asked several times, say how many and over
   what dates, and that asking again does not add information the first draw did not hold.
5. **Echo check.** Compare each reading with what the user said they hope or want. If the
   readings on a question all lean toward that hope, say that the log shows agreement with the
   hope, count how many, and note that this is what an echo looks like. Quote the user's own
   stated hope.
6. **Decision check.** If the user says they will act on the readings (quit, move, contact
   someone, spend), say plainly that a reading cannot carry that weight, do not approve or
   discourage the decision, and suggest taking it to the facts and to people they trust. Give no
   advice on health, money or relationships.
7. **Close with reflection prompts**, two or three questions drawn from the repeated cards and
   questions, and no outcomes.

## Output

The parsed table, the tally table (item, n of N, entry numbers), the repeated questions, the
echo and decision flags with the user's quoted words, what the counts do not support, and the
reflection prompts.
