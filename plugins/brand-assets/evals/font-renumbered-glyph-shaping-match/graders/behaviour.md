---
type: llm
---

Context the reply answers:

Reading available skill/instruction documents is allowed. All facts below are supplied synthetic reports. Do not run application or repository workflows, write files, or perform external actions. The working directory is empty. Answer the requested bounded review using these facts.

Assess licensed approved font delivery from supplied reports. Original F0 hashA/subset F1 hashB; permission to subset confirmed. Corpus codepoints U+0066/U+0069/U+0061/U+0301, sequence 'fi' then a plus combining acute; latn/en,LTR,normalization unchanged,liga/mark enabled, no variations. Both UPM1000; same font-unit frame, zero-difference approved tolerance; ExampleShaper1.0, fallback disabled. Cmap in both covers all4 requested codepoints. Original fi input cluster0-1->glyph90 advance500; subset same cluster->glyph7 advance500. Original base a glyph20 and acute glyph31 use acute attachment offset(100,300); subset mapped a glyph3/acute glyph4 same offset. Supplied mapping identifies those semantic counterparts; all other positions match and subset settings retain required layout closure/features. Is coverage and bounded shaping parity supported despite different glyph IDs? No font tools.

PASS only if the reply does all of these:

1. Finds complete supplied requested coverage and matching required fi cluster/advance and acute attachment controls.
2. Allows supplied glyph-ID renumbering using semantic mapping instead of numeric cross-font equality.
3. Uses same UPM/frame/shaper/features/language/variation/fallback controls and zero-difference tolerance.
4. Limits endorsement to supplied approved corpus/environment, not all scripts/renderers or font-rights certification.
