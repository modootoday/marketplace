---
type: llm
---

Context the reply answers:

Recover and refactor these synthetic spreadsheet routines as pseudocode; no workbook execution. R1 loops inputs in order, skips blank or x<10, computes y=floor(x/10+0.5), writes y and adds y to global total. R2 skips blank or x<=10, computes y=floor(x/10), writes y and replaces global last with y. Initial total0,lastnone. Inputs blank,9,10,15,20. Give a routine/input/global/side-effect ledger, hand-check outputs/states, factor shared logic with explicit threshold/rounding/state policy parameters, and show caller differences that preserve behaviour. Do not silently standardize thresholds or rounding.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. R1 accepts10,15,20→1,2,2 with total5; R2 accepts15,20→1,2 with last2, skips10 whileR1 accepts it.
2. Separates blank handling, strict/inclusive boundaries, rounding and cumulative-versus-last globals, preserving row output positions.
3. Proposes shared logic with explicit threshold, rounding and state-policy inputs. Global state is passed and returned, and ordered row writes are either returned explicitly or performed through an explicitly passed output callback. Both original caller policies and skipped-row positions remain intact; no hidden dependency is introduced.
4. Gives boundary/sample verification and states pseudocode unexecuted, no claimed workbook repair.

Return only PASS or FAIL.
