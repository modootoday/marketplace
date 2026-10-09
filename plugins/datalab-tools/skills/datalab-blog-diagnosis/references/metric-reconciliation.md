# Reconcile metric evidence

Use this when figures conflict or their periods and definitions differ.
Record each source's target, metric definition, unit, requested dates, returned dates, coverage and aggregation rule.
Separate visits, views and unique visitors rather than using their names interchangeably.

Choose a comparable intersection only when the returned dated evidence supports it.
Retain an unavailable day as a gap; a returned explicit zero remains an observation.
Report observed subtotals with their covered dates, not as complete period totals.
If daily unique visitors are supplied, summing them counts daily memberships; it does not establish deduplicated unique people for the whole period.
Do not convert an average into a weighted aggregate without its matching denominator.
Keep overall-blog, named-post, source and device scopes separate until their relationships are evidenced.

State which discrepancy is explained by scope or definition, which remains unresolved, and the narrow missing evidence needed to resolve it.
Comparable changes may support a hypothesis; they do not establish a cause or validate a third-party diagnostic score.

## Current local tool contract boundary

The creator-advisor tool definitions inspected on 2026-10-09 expose `my_blog_summary` with an empty parameter object and settled-yesterday counts.
`my_traffic_series` supports returned period evidence and a visit/view/uv kind; use its actual returned schema for period arguments.
`my_content_info` returns cumulative post views, which are not requested-period views.
`my_content_detail` uses a content URL and recent days, default 14; daily display labels can omit the year.
Do not invent dates from a shortened label or treat a requested reporting range as the returned range.
Runtime-returned schemas and coverage take precedence over these dated notes.
