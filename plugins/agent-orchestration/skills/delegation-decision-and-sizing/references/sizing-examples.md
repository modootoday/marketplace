# Sizing examples

Synthetic requests, each with the decision a good reply gives.

## A. "Use a team of agents to rename a CSS class used in 5 templates"

Shape: small, write-coupled (same class, same stylesheet). Decision: no fan-out. One agent edits the
5 templates and the stylesheet in sequence; cost of starting helpers exceeds the work. A helper is
justified only to run the visual test suite and return a one-line verdict if its output is long.

## B. "Port 3 modules to the new logger, then update the docs index"

Shape: sequential at the end (the index needs all three). Decision: one agent, or 3 helpers only if the
modules share no files, with the index edited by the coordinator afterwards. State which.

## C. "Check 90 SQL migration files for statements that lock tables"

Shape: wide, read-only, items independent. Decision: fan out; chunk of 15 files gives 6 agents, run in
two batches of 3; expected cost several times a single-agent pass, stated up front; each helper returns
file, line, statement and a verdict from a fixed set; pilot on 2 files first to check the brief
catches a known locking statement; spend cap set in the runtime; coordinator merges and ranks.

## D. "Compare 3 caching libraries for our workload"

Shape: comparison. Decision: 3 helpers, one per library, same output format; coordinator writes the
comparison. If a helper only reads docs and never writes, no isolation is needed.

## E. "Add feature flags across 30 services, then verify each deploys"

Shape: write-heavy with a per-service write set, plus verification. Decision: a script rather than
turn-by-turn helpers (30 items, repeatable, resumable); one write set per service; deploy checks
serialized; pilot on 2 services.
