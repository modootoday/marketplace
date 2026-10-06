---
name: ux-writing-toss
description: Write or fix Korean product copy - buttons, titles, body text, errors, empty states, notifications - to the public Toss writing principles, and say which principle each change follows. Use when the user asks to write, review or correct Korean UI text, microcopy or error messages. Not for blog posts, documents or English copy.
metadata:
  tier: open
  level: L2
  domain: content-writing
  install: optional
  keywords: [Korean UX writing, microcopy, Toss writing, UI text, error message]
  locales: [ko]
  verified-runtimes: [claude-code]
---

# Korean UI copy, Toss style

The rules are not ours to invent. Toss published eight writing principles and a
consumer UX guide; this skill applies them. Examples of every rule, in Korean,
are in `references/rules.ko.md` - read it before writing.

## The rules that are broken most

1. **One register: haeyo-che.** Every sentence ends in the polite -yo form. A
   screen that mixes it with the formal -mnida form or with plain speech reads
   like two products.
2. **Words you can say out loud.** Latin-script jargon that is not pronounced in
   a Korean sentence (digest, permit, executor, epoch) never reaches the screen.
   Internal identifiers stay internal.
3. **No noun stacks.** A chain of Sino-Korean nouns ("execution permission
   delegation contract") becomes a sentence with a verb.
4. **Words everyone knows.** No term whose meaning depends on age, job or
   schooling. If one is unavoidable, explain it the first time and add the
   original term in brackets.
5. **Say what can be done, not what cannot.** An error tells the next step.
6. **Suggest, do not force.** No urgency, loss or anxiety used to push a choice;
   the reader keeps the freedom to decline.
7. **A button predicts the next screen.** Reading the button alone tells what
   happens. The dismiss button of a dialog says "close", not "cancel", because
   cancel reads as undoing work.
8. **Cut what adds nothing.** Filler sentences and anything said twice on one
   screen go.
9. **Lower excess honorifics.** The over-polite forms listed in the reference
   become their plain polite equivalents.
10. **Promise nothing the product does not do.** Copy cannot be wider than the
    product. When unsure whether a feature exists, ask instead of writing it.

## How to reply

For a review, return a table: original, revised, and the rule number. Keep
lines that already pass and say so; do not rewrite for the sake of it. For new
copy, write the strings first, then list any assumption about what the product
does that the copy depends on.

Do not apply these rules to code comments, commit messages or design documents;
they govern what a user reads on a screen.
