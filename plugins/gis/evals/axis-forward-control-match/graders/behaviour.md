---
type: llm
---

Context the reply answers:

Check a synthetic coordinate interface using supplied reports only; do not execute geodesy. Source artifact G1 is RFC7946 GeoJSON point A [10,20], meaning longitude10/latitude20 degrees. Declared source CRS is WGS84, target is SyntheticProjected metres. Engine SampleTransform1.0, operation OP1, applicable to A with its supplied required grid available; no fallback reported. Authority API input is latitude,longitude, mapping sends [20,10]. API output and saved consumer output order are easting,northing metres. Independent surveyed-style synthetic control expected [1000,2000] metres, tolerance1m, not derived via OP1. Supplied forward and saved reimport report are [1000.2,2000.1] metres for A. Explain boundary order, residual and the scope of support. This fixture is not a real projection.

PASS only if the reply does all of these:

1. Distinguishes GeoJSON lon/lat [10,20] from API lat/lon [20,10] and API/saved easting/northing interpretation.
2. Computes residual components+0.2,+0.1m and norm approximately0.224m below1m against the independent control.
3. Records operation/version/grid/fallback context and ties supplied forward and reimport evidence to G1/A.
4. Supports only this synthetic supplied control/mapping, not actual geodetic execution, whole-region accuracy or legal survey certification.

Return only PASS or FAIL.
