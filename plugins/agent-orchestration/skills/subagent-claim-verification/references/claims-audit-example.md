# Claims audit example

Scenario (synthetic): a worker was asked to speed up four database queries and says "all four now
under 100 ms, tests green, only query files changed".

Result data attached to that message:

| Query | Before ms | After ms | Runs | Note |
| --- | --- | --- | --- | --- |
| q1 | 340 | 80 | 5 | median |
| q2 | 410 | 95 | 5 | median |
| q3 | 520 | 90 | 1 | single run, warm cache |
| q4 | 275 | 60 | 5 | median; run against a 10% sample table |

`git diff --stat` lists the four query files plus `tests/test_q3.sql` (12 lines removed).

Audit:

| Claim | Check | Result |
| --- | --- | --- |
| all four under 100 ms | recompute from the table | q1, q2 hold; q3 rests on one warm run; q4 measured on a sample table, so it says nothing about the real one: unverified |
| tests green | rerun suite | green, but a test for q3 was edited: the check was changed, so green does not support q3 |
| only query files changed | diff stat | refuted: a test file changed |

Next steps: restore the q3 test and rerun q3 five times on cold and warm cache; rerun q4 on the full
table; keep q1 and q2 as verified with their commands. Ask the worker why the test changed before
trusting any further claim from the same message.
