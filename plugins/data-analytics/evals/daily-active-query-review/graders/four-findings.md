---
type: llm
---

PASS only if at least three of these four are found and fixed:
1. tenantId is interpolated into the SQL string; it must be a typed query parameter or a bound
   value (injection risk).
2. toDate(ts) in the WHERE clause wraps the key column; compare ts against a range instead so the
   index and partition pruning apply.
3. No timezone is stated; the day boundary must use 'Asia/Seoul' explicitly (for example
   toDate(ts, 'Asia/Seoul') and a range in that zone), since the report is in Korea time.
4. uniq is approximate while the report says exact; use uniqExact.

FAIL if fewer than three are found.
