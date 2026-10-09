---
type: llm
---

Context the reply answers:

Explain whether my blog traffic fell during 2026-10-01 through 2026-10-03 compared with 2026-09-28 through 2026-09-30. I suspect ranking changes. Give a diagnosis and the smallest next checks, using only this supplied packet; do not execute tools or fetch data. You may read catalog guidance.

Returned my_traffic_series kind=view has requested and returned windows matching those dates. Baseline daily rows are Sep28=100, Sep29=150, Sep30=200 views. Current rows are Oct01=100, Oct02=120, Oct03=null (unavailable), and the source says coverage is incomplete on Oct03. All dates include the year. Returned kind=visit supplies Sep28=50, Sep29=60, Sep30=70; Oct01=40, Oct02=0 explicitly observed, Oct03 unavailable. Returned daily kind=uv supplies Oct01=30 and Oct02=20, with no period-deduplicated unique-reader total.

my_blog_summary returned date=2026-10-08, views=600, visits=200, uniqueVisitors=120; it is settled-yesterday evidence and its schema accepts {} only. A pasted third-party score is 42 with no method or comparable history. No inflow, ranking, demand or post-level breakdown was supplied. Do not turn the daily UV sum into deduplicated three-day people.

PASS only if all of the following hold:

1. Distinguishes views, visits and daily unique visitors, and keeps the Oct08 summary outside the requested comparison rather than treating 600 as period views.
2. Preserves Oct02 visits=0 and Oct03 unavailable separately; reports any subtotal/intersection with its dates and coverage instead of declaring complete three-day totals or missing-day zero.
3. Does not use the daily UV sum as deduplicated period readers or the undocumented score as an explanation of measured traffic.
4. Separates comparable observed changes from ranking/demand hypotheses and names discriminating missing evidence for those hypotheses rather than claiming a cause.

FAIL if any required distinction is contradicted or omitted. Equivalent accurate organization and wording are acceptable.
