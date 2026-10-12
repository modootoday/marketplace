---
type: llm
---

Context the reply answers:

Verify a supplied synthetic storage calculator specification, not a deployed app. MiB=bytes/1048576; domain is nonnegative integer bytes; output displays three decimals with ordinary nearest rounding. Faulty candidate divides by1000000. Build at least five independent reference cases including0,1048576,2097152,1, negative, fractional and duplicate inputs. Show exact/reference displayed outputs, valid/invalid distinction, a round-trip check on unrounded values, rounding precision limitations and defects. No tool execution occurred.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Uses1048576bytes/MiB and gives reference0→0.000,1048576→1.000,2097152→2.000,1→0.000 displayed while preserving its nonzero exact value.
2. Includes at least five distinct reference cases and rejects negative and fractional bytes under the supplied domain; duplicates do not inflate coverage.
3. Identifies decimal divisor candidate errors, checks unrounded inverse MiB×1048576 and explains lossy display round-tripping.
4. States units/domain/rounding and unexecuted status without claiming live calculator verification.

Return only PASS or FAIL.
