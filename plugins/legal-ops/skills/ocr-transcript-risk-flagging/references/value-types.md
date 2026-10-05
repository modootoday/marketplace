# Value types to check, and what each is compared against

Read this at step 3 of SKILL.md, before writing the table. Go through the rows in order for every
line of the input; a value that matches a row gets a table row unless it is clean and
cross-checked.

## Table

| Value type | Examples | Compared against | Flag when |
| --- | --- | --- | --- |
| Dose with unit | `5OOO mg`, `10 ml`, `0.5 g` | the ordinary daily dose range for that drug, from general knowledge, named in the row | the literal reading exceeds the usual maximum by a clear factor, or the unit does not fit the drug |
| Date | `03/l5/2O22` | the other dates in the same document, and whether month/day order is ambiguous | it goes backward, is impossible, or has look-alike characters |
| Time and weekday | `before noon`, `on Friday` | other times and weekdays in the same text | it is the only anchor for a claim, or conflicts with another |
| Measurement | `BP l2O/8O` | the plausible range for that measurement | look-alike characters, or an implausible value |
| Amount without unit | `nine hundred` | whether a currency or unit appears nearby | no currency or unit, or it sits next to an unintelligible gap |
| Name | drug, person, place | other spellings of it in the text | spelled two ways, or a look-alike character |
| Negation or hedge | `Denies`, `no`, `not` | nothing; it is high-consequence by itself | always list it, rank low if the text is clean |
| Speaker turn | `Speaker 2` asks, `Speaker 2` answers | the labels of neighbouring turns | one label both asks and answers, or a turn that does not follow from the previous one |
| Unintelligible span | `(unintelligible)`, `[...]` | nothing | always mark it `[inaudible hh:mm:ss]`; never fill it |

## Ranking

Rank by what a wrong reading would cost: doses and amounts first, then dates, times and
measurements, then names, negations, and speaker turns last unless the speaker decides a fact.
A dose that is implausible as written ranks above a date that only has look-alike characters.

## Candidate readings

- OCR: look-alike pairs only (`l` or `I` for 1, `O` for 0, `S` for 5, `B` for 8, `rn` for m). List the
  reading as a possibility ("O read as 0 gives 5000"), never as the answer, and do not list other
  digit counts, other numbers or other words.
- Speech: no candidate readings at all. Write "none given, the audio decides". Do not offer
  similar-sounding words or numbers ("nineteen hundred"), and do not guess what an unintelligible
  span or a transcribed word could have been.

## Worked example

Input: `L2: Metformin 5OOO mg daily.` Row: rank 1, L2, `5OOO mg`, dose and look-alike characters, "letter
O where digits are expected; read literally as 5000 mg a single daily dose is about twice the
usual maximum daily dose of metformin (about 2000 to 2550 mg), compared from general knowledge, a
drug reference must confirm", candidate: "O read as 0 gives 5000".

Input: `[00:01:10] Speaker 2: Did you sign...?` then `[00:01:14] Speaker 2: Yes, I signed...`. Row: locator
`00:01:10 and 00:01:14`, risk speaker turn, "the same label asks and answers; probable mix-up", candidates: none given.

Input: `[00:01:20] Speaker 1: (unintelligible) the amount was nine hundred.` Marks: `[inaudible 00:01:20]`.
Row: `the amount was nine hundred`, amount without unit next to a gap, candidates: none given.

## If the script can be run

`node scripts/transcript-scan.mjs <file>` lists look-alike tokens, numbers with units, dates, times,
speaker-label repeats and unintelligible marks, with line numbers. It finds candidates; the ranking
and the reasons are still yours.
