# Worked readings

Synthetic tables; not any real eval.

| Case | Without | With | Fired | Reading and next step |
| --- | --- | --- | --- | --- |
| `invoice-total` | 0.00 | 0.00 | 0/2 | Description problem. Add "Use when" phrases for the words in the prompt. Rerun with only SKILL.md changed. |
| `ledger-split` | 0.50 | 1.00 | 2/2 | Healthy. Record two runs per arm. |
| `rename-file` | 1.00 | 1.00 | 2/2 | Baseline passes: regression case. Add a harder case. |
| `tax-memo` | 1.00 | 0.75 | 2/2 | One judge item fails in one run: rerun once before editing. |

Re-measure note: a row recorded with the skill arm only showed 1.00; measured on both
arms it showed 0.50 without and 0.75 with. The honest delta is the second one.

Reference check: if a worked example uses the same customer, amounts and dates as the
prompt, replace them with another scenario and re-measure both arms.
