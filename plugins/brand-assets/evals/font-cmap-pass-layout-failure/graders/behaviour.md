---
type: llm
---

Context the reply answers:

Reading available skill/instruction documents is allowed. All facts below are supplied synthetic reports. Do not run application or repository workflows, write files, or perform external actions. The working directory is empty. Answer the requested bounded review using these facts.

Inspect approved/licensed original F0 and subset F2 hash identities with requested U+0066/U+0069/U+0061/U+0301 corpus. Cmap covers all4, subset loads and is smaller. Same ExampleShaper1.0,latn/en,LTR,normalization unchanged,liga/mark ON,no variations,fallback disabled; both UPM1000,font-unit frame,zero-difference tolerance. Original fi cluster0-1 maps to one approved ligature advance500; subset emits separate f/i clusters advances300+300. Original acute attaches above a at(100,300); subset mapped acute offset(100,0). Source/subset mapping is provided; no raw-ID equality required. What does coverage success establish and what blocks shaping handoff? This is a diagnostic review only, no repair sequence or tool execution required.

PASS only if the reply does all of these:

1. Separates requested cmap coverage/load success from shaping failure.
2. Finds required liga cluster/advance divergence (500 versus600) under same enabled-feature controls.
3. Finds acute attachment offset mismatch under same frame/UPM/tolerance.
4. Does not accept file size/load success as parity, require numeric-ID equality or claim universal/current vendor defect.
