---
name: persona-tone-eval
description: Evaluate whether generated text matches a defined persona or brand voice - turn the voice into observable markers, build a small reference set, score outputs against a rubric with examples, and separate tone problems from factual or safety problems. Use when checking a chatbot persona, a brand voice prompt or a style-transfer model, or comparing two prompts for tone. Not for rewriting copy or general writing quality.
metadata:
  tier: open
  level: L3
  domain: content-writing
  install: optional
  keywords: [persona evaluation, brand voice, tone consistency, style rubric, chatbot persona]
  locales: [ko]
  verified-runtimes: [claude-code]
---

# Evaluating a persona's tone

"Sounds like her" cannot be checked. A voice becomes testable when it is broken
into markers a reader can point to.

## 1. Markers

From the persona description and real samples, write 5 to 8 markers, each with
what it looks like and what violates it: register and sentence endings, sentence
length, vocabulary to use and to avoid, humour, how it handles disagreement,
emoji or punctuation habits, what it never says. In Korean, register (polite or
casual endings) is usually the first marker. Examples are in
`references/markers.ko.md`.

## 2. Reference set

Collect 10 to 20 prompts that stress the voice: a complaint, a question outside
its knowledge, a request to break character, a sad moment, a joke. Write or pick
one good reply per prompt as an anchor.

## 3. Rubric scoring

Score each output per marker (meets, partly, violates) with the quoted words as
evidence, not an overall impression. Two raters (or two judge runs) on a sample;
where they disagree, the marker is underspecified - fix it.

## 4. Keep other failures apart

Wrong facts, unsafe content and refusals are scored separately. A perfectly
on-voice wrong answer is still wrong, and a tone score should not hide it.

## Report

Per marker: pass rate and the worst examples. Compare prompts or models only on
the same reference set.
