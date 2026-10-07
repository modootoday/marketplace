---
type: llm
---

Context the reply answers:

Reading available skill/instruction documents is allowed. All facts below are supplied synthetic reports. Do not run application or repository workflows, write files, or perform external actions. The working directory is empty. Answer the requested bounded review using these facts.

Inspect this supplied gettext delivery. Approved synthetic ExampleLocale has three branches n1->0,n2->1,otherwise->2. Context cart; source IDs singular '%(count)d item for %(name)s' and plural '%(count)d items for %(name)s'. Consumer Python named-percent format supplies count:int/name:str, domain shop/context cart with exact IDs. Delivered PO branch0 '%(name)s: %(count)d item', branch1 '%(nombre)s: %(count)d items'; header nplurals=2. Build exit0 but compiler flags/checking scope unspecified. Shipped/loaded M2 match digest H2 and exact domain/context. Supplied ExampleConsumer1.0 n1 output correct; n2 raises missing key nombre; no n5 output. Give observed failure versus unverified plural delivery. Separately, a C-format translation uses %i where source uses %d and its approved contract allows equivalent signed integer formatting: is that alias itself a proven compiler bug? Do not edit or execute.

PASS only if the reply does all of these:

1. Identifies observed missing nombre key because declared consumer provides name, distinguishing typed role mismatch from prose translation.
2. Flags header two forms versus approved three and absent n5 evidence without inventing an observed n5 crash.
3. Does not treat build exit0 with unknown flags as proof of runtime/argument/plural parity.
4. Does not label allowed %i/%d compatibility a proven compiler bug or enforce universal byte-identical directives.
