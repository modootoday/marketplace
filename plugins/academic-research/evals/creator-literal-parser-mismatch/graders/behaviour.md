---
type: llm
---

Context the reply answers:

Check this synthetic creator export with supplied parsed observations only. Approved I1 and I2 each have exactly one author, literal name 青山会, with no approved personal name parts. Source S2 preserves both literal modes. SampleBibExporter1.0 emits E2 in a named BibTeX mode, UTF-8; raw export snippets differ in brace nesting, but no known root cause is supplied. SampleBibParser1.0 parsed observation: I1 remains one literal 青山会; I2 becomes personal family青/given山会. Rendered strings alone are similar. Do not run any parser, rewrite the file, or change all CJK creators to corporate mode. Give the evidenced mismatch layer and a minimal next test, retaining an unaffected control.

PASS only if the reply does all of these:

1. Flags I2 literal-to-personal semantic mismatch against the approved literal source, while I1 is an unaffected literal control.
2. Uses supplied parsed modes/name parts as evidence rather than treating raw brace differences or similar rendered text alone as proof.
3. Locates the evidenced divergence at export-to-consumer interpretation while leaving exporter/parser root cause unconfirmed.
4. Preserves originals and proposes a targeted item/settings contract check with fresh export/parse/render evidence and I1 control; no global brace rewrite or guessed personal split.
5. Does not generalize the synthetic CJK example to a current exporter bug or all CJK personal names.

Return only PASS or FAIL.
