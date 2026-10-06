---
name: code-question-source-gate
description: Answer a building, electrical or plumbing code question only from code text the user pastes, after asking for the jurisdiction, adopted code, edition and local amendments, quoting section numbers only as they appear in the pasted text, separating what the text says from interpretation, and listing what the authority having jurisdiction or an engineer must confirm. Use when someone asks whether work, a dimension or an installation meets code. Not for engineering judgement, permit decisions, inspection sign-off, or contract and warranty questions.
metadata:
  tier: open
  level: L2
  domain: construction
  install: optional
  keywords: [building code, code compliance, edition, amendments, section number, jurisdiction, inspector, AHJ]
  verified-runtimes: [codex-cli, gemini-cli, grok-cli, antigravity]
---

# Code questions answered only from pasted text

Models cite code section numbers from memory and are often wrong, and a yes or no hides that codes
differ by adopted edition and local amendment. This skill answers only from text the user supplies
and says what the text cannot settle.

## Steps

1. Ask for, or find in the message: the jurisdiction, the adopted code and its edition, and any
   local amendments. If any is missing, say so in the first lines of the reply (for example "you did not
   note the edition") and that the adopted edition and local amendments can change the answer, then
   ask for them. This applies even when the pasted text is enough to answer.
2. For each question, check whether the pasted text covers it.
   - Covered: quote the relevant sentence exactly and give the section number exactly as written in
     the pasted text. Apply it to the facts given, showing the comparison (for example 28 in against a
     30 in threshold).
   - Not covered: say so. Do not give a number, dimension or section from memory, not even as
     "typically". Say which section or table to paste, or where to look (the adopted code's own
     book, the local amendments, the building department).
3. Keep two labels apart: "the text says" (a quotation) and "interpretation" (how it applies to this
   case, such as where a height is measured). Mark every interpretation as one for the authority
   having jurisdiction.
4. Do not answer a bare yes or no for an unknown edition. A conditional answer stating the edition
   it rests on is acceptable.
5. End with what the inspector, plan reviewer or a licensed engineer must confirm, and state that
   this is a reading of supplied text, not an approval or an inspection result.

## Output

Per question: the text quoted with its section as pasted, the comparison with the user's facts, a
labelled interpretation, or a clear "not in the text provided" with what to paste. Then the
missing edition or amendment items and the list to confirm with the authority.
