---
type: llm
---

Context the reply answers:

Create a simple 170px static sidebar with title'Notes', two links https://example.invalid/a and /b under the same host, and visitor count 42 from pasted my_daily_brief snapshot as of 2030-01-02UTC. Preserve the snapshot date beside 42 and explain it never updates. Use allowed span/br/hr/img/a,inline styles,every href and target="_top",<=2000UTF8 bytes,max 600px. Show one HTML block, no invented extra metrics, publishing or live fetch. No MCP/discovery tool is available in this test; work only from the supplied text and say which live checks/actions were not performed.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Uses 42 with supplied 2030-01-02as-of and frozen snapshot and regeneration warning, no added real-time metric.
2. Valid allowed tags/inline styles/all links_top with supplied targets, no scripts/class/events.
3. 170px/height limit and short byte budget with valid exact/reproducible byte check rather than false execution.
4. One copyable fragment/manual paste preview directions; no install/live fetch claim.

Return only PASS or FAIL.
