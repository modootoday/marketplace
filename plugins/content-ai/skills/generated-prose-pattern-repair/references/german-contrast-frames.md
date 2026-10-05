# German contrast frames: decision table and worked repair

Read this before rewriting German text. The two ways a German repair fails are a rewrite that
is not idiomatic German and a rewrite that quietly drops or bends a fact.

## Decision table

| Instance in the draft | Real claim? | Action |
| --- | --- | --- |
| "nicht nur A, sondern auch B", A and B are two properties of one thing | no | "A und B", or "neben A auch B", or two plain sentences |
| "nicht nur um X, sondern auch um Y" with a verb that fits only X | no | name the effect of each with its own verb: "spart X und Y" |
| "nicht nur A, sondern auch B" where A is trivially true of the subject | no | drop A only if it is not a stated fact; otherwise keep A as an adjective |
| "nicht X, sondern Y" naming what was measured, scoped or recommended, and a later sentence relies on it | yes | keep word for word |
| "nicht X, sondern Y" where X is the obvious alternative and a reason follows | yes | keep word for word |

A close twin ("nicht bloss ... sondern", "nicht allein ... sondern auch", "weniger A als B")
is the same habit. Do not use it as the replacement.

## Idiom traps

- "zweimal weniger" is not German for "two fewer". Use "zwei Umstiege weniger" or "spart
  zwei Umstiege".
- "verkuerzt um zwei Umstiege" is a logic slip: time is shortened, transfers are saved.
  Fix the verb, keep both numbers.
- Keep the user's spelling: a draft in ae/oe/ue/ss stays in ae/oe/ue/ss, a draft with
  umlauts keeps umlauts. Say so in one line at the end.
- Replace a sentence by a sentence with the same facts in the same order unless the order
  was part of the habit. Use "zugleich", "ausserdem", "daneben", "dazu" as the connective,
  not a calque of "not only".

## Fact ledger (do it before writing the final text)

List every number, adjective and condition per paragraph, then tick each one in the rewrite:
figures, "im Sommer", place names, "denkmalgeschuetzt", adjectives such as "gruen". A fact
that was part of the frame (the "gruen" in "nicht nur gruen") stays as an attributive
adjective or a clause, it is not decoration to delete. Add no praise, no cause, no number.

## Worked example (different text from any eval)

Draft:

(1) Der Hafen ist nicht nur ein Umschlagplatz, sondern auch ein Ort der Begegnung.
(2) Die neue Faehre ist nicht nur guenstiger, sondern auch schneller. Sie spart nicht nur
    zehn Euro, sondern auch zwanzig Minuten pro Fahrt.
(3) Die Erhebung zaehlt nicht die Besucher, sondern die Buchungen. Deshalb weichen die
    Zahlen vom Vorjahr ab.

Count before: (1) 1 nicht-nur, (2) 2 nicht-nur, (3) 0 nicht-nur and 1 "nicht X, sondern Y".
Total 3 + 1. Keep (3): it scopes what the survey counts and the next sentence relies on it.

Rewrite:

(1) Der Hafen ist Umschlagplatz und zugleich ein Ort der Begegnung.
(2) Die neue Faehre ist guenstiger und schneller. Pro Fahrt spart man zehn Euro und zwanzig
    Minuten.
(3) unchanged.

Count after: "nicht nur ... sondern auch" 0, "nicht X, sondern Y" 1 (kept, claim). Ledger: ten
Euro, twenty minutes, harbour, ferry, survey and the year comparison all present, nothing
added.

Output shape: count table per paragraph, keep or rewrite with a one-line reason each,
rewritten text, recount naming the kept instances, one line on spelling.
