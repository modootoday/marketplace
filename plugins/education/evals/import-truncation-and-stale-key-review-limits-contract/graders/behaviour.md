---
type: llm
---

Context the reply answers:

Compare supplied approved and imported course snapshots; make no edits and do not evaluate teaching quality. Approved title='Read the notes'; imported title='Read notes'. Approved body='Read notes before class.'; imported body='Read notes before'; tool body limit 17 characters including spaces. Approved question='What should you read?'; choices in order A='Notes' correct, B='Guess' incorrect, C='Skip' incorrect; feedback='Use the supplied notes.' Imported question is unchanged; choices in order B='Guess' marked correct, A='Notes' marked incorrect, with C absent; feedback='Proceed now.' Pair blocks, quote exact before/after differences, count approved/built body characters and the cut, identify dropped/reordered options and whether the correct flag follows the same answer text, rank the problems and state unexamined surfaces and owner acceptance.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. Pairs title/body/stem/options/feedback, reports exact changed strings, and does not invent a changed question stem.
2. Reports approved body length 24, built length 17, the 17-character cut and missing ' class.' tail; identifies this as truncation at the supplied limit.
3. Finds missing C, the B/A reorder, and the correct flag changed from Notes to Guess; ranks key/dropped-option/truncation issues ahead of wording differences.
4. Makes no fixes or acceptance decision, leaves review to the owner, and identifies media/layout/scripts/tracking as unexamined. Equivalent wording such as not compared or not inspected satisfies this boundary; no exact phrase is required.

Return only PASS or FAIL.
