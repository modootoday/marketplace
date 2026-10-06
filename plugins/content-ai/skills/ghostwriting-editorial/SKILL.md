---
name: ghostwriting-editorial
description: Edit or ghostwrite long-form text in a client's own voice - capture the voice from their samples, keep their claims and facts as theirs, flag anything that needs a source, track every change, and never present invented experiences as the author's. Also checks a draft against numbered voice rules taken from two samples and flags each drift. Use when writing a book chapter, essay, column or long blog post on someone's behalf, editing their draft, or checking whether a draft matches a client's voice. Not for short marketing copy or UI text, and not for scoring a persona's tone on test prompts (persona-tone-eval).
metadata:
  tier: open
  level: L3
  domain: content-writing
  install: optional
  keywords: [ghostwriting, editing, author voice, manuscript, long-form writing]
  verified-runtimes: [claude-code]
---

# Ghostwriting and editing

The text will carry the author's name, so two things are not negotiable: it
must sound like them, and it must not say anything they did not experience or
believe.

## Capture the voice

From at least two of their own samples, note sentence length, register,
recurring phrases, how they open and close, what they never do. Write a short
voice sheet and check drafts against it.

## Check a draft against the voice sheet

When the user hands over samples and a draft (theirs, a colleague's or an earlier
generation) and asks whether it sounds like the client, run the check in this order:

1. List the voice rules as numbered, observable items taken from the samples only:
   sentence length range, person and address (I, we, you), register, punctuation habits,
   how paragraphs open and close, recurring phrases, and what the samples never do.
   Quote the sample line that shows each rule. A rule only one sample shows is marked
   "one sample".
2. Check the draft rule by rule. For each rule write kept, drifted or not testable, and
   for every drift quote the draft sentence and the rule number it breaks.
3. Count where a count is possible (average sentence length of the samples against the
   draft, number of exclamation marks, number of questions) instead of judging by feel.
   Count word by word and show the counts; never state a figure about a sample you did
   not count, and do not credit a sample with a habit (contractions, questions) it does
   not show.
4. Flag drift in claims too: a claim, number or stance in the draft that no sample
   supports goes on the facts list for the author, not into the voice verdict.
5. Offer a rewrite of only the drifted sentences, in the voice, with the rule number
   beside each. Do not rewrite sentences that kept every rule. A rewrite may re-voice
   what the draft already says; it may not add a claim, habit or experience for the
   author ("most failures I see...", "in my years..."). Where a removed sentence left
   a gap, put a bracketed question for the author instead of a replacement claim. Every
   drifted sentence still gets its own line with a voiced rewrite and rule number, even when
   its unsupported claim is cut: write the rewrite without the claim, or "[cut]", and put the
   question beside it, so no drifted sentence is left without a rewrite line.

Say what two samples cannot show (for example how the client writes when angry or in a
different channel) instead of extending the rules to it. The check judges the text
against the client's samples. It does not judge the client.

## Keep the facts theirs

- Use only experiences, numbers and opinions the author provided. Where the text
  needs one they did not give, leave a bracketed question for them instead of
  inventing an anecdote.
- Mark every factual claim that needs a source and every quotation that needs
  checking.
- Keep their position even where you would argue differently; raise the
  disagreement as a margin note.

## Edit in passes

1. Structure: does each section do one job in a sensible order?
2. Paragraphs: one idea each, transitions that carry the argument.
3. Sentences: cut repetition and filler, fix ambiguity, keep their rhythm.
4. Proof: names, numbers, dates, spelling.

## Track changes

Deliver the revised text with a change list (or tracked changes) and the open
questions, so the author approves rather than discovers.
