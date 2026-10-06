---
name: sql-migration-equivalence-check
description: Prove that a migrated, dialect-converted, optimized or extended SQL query or table returns the same result as the original - number the statements in source and converted script, write row-count, two-way key anti-join and null-safe per-column diff queries, seed deliberate differences to show the checker catches them, and report explained and unexplained differences apart. Use when SQL was converted between dialects, a table was replaced by a new one, a long query was rewritten for speed or got extra joins or filters, and someone asks whether it is equivalent. Not for designing a new schema or writing a query from scratch.
metadata:
  tier: open
  level: L3
  domain: data-engineering
  install: optional
  keywords: [sql migration, dialect conversion, table comparison, equivalence, anti-join, query rewrite, regression]
  verified-runtimes: [claude-code]
---

# SQL migration equivalence check

Practitioners report the same failures: an AI conversion silently drops sections ("unchanged"
placeholders), a rewrite for speed changes the result, a new join multiplies rows, and the
comparison code is itself wrong. Equivalence is a claim that needs a run, not a reading.

## Steps

1. Number every statement in the source script and in the converted script. Map each source
   number to a converted number. Any source statement without a counterpart is a missing
   section: list it. A placeholder comment standing for omitted code counts as missing.
2. Fix the comparison frame: old object, new object, the key (state if it is unique), the
   columns to compare, and the columns allowed to differ (renamed, retyped, added).
3. Write the checks as queries, in the new dialect:
   - row counts of both sides, and distinct key counts of both sides;
   - key anti-join in both directions (keys only in old, keys only in new);
   - per-column value diff on matching keys with a null-safe comparison (`IS DISTINCT FROM`
     or the dialect's equivalent), using agreed rounding for floats and an explicit rule
     for timestamps and time zones;
   - duplicate keys on each side, which show join fan-out.
4. For an optimization or an added join or filter, compare the result of the original and the
   changed query on the same data: row count, key sets and aggregates. Flag fan-out (more
   rows than keys) and a filter that silently drops rows or turns a left join into an inner
   join.
5. Prove the checker works before trusting a clean result: seed a missing key, a changed
   value and a duplicated join row into a copy or a CTE, and show each one is reported.
6. Report two lists: differences explained as intentional (with the reason), and
   unexplained differences (with the key and the columns). Do not write "equivalent" unless
   the checks were run and came back clean; if they cannot be run here, say so and give the
   exact queries to run.

## Output

The statement map with missing items, the check queries, the seeded-difference test, and
the two difference lists.
