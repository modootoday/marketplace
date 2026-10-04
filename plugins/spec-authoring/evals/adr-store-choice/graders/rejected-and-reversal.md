---
type: llm
---

PASS only if the record has all four:
1. DynamoDB named as a rejected alternative, with the reason it was rejected (transactions across
   an order and its reservations, or the team's existing Postgres operations).
2. A consequence that costs something, such as more tuning or harder write scaling with Postgres.
   A list of benefits only does not count.
3. A condition under which the decision would be reconsidered (for example write volume beyond what
   Postgres handles, or the transactional need going away).
4. A status such as accepted, or a statement that the record is not edited once accepted.

FAIL if any of the four is missing.
