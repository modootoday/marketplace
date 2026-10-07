---
type: llm
---

Context the reply answers:

Review this synthetic axis regression without executing anything. Source GeoJSON G2 point A [10,20] is longitude10/latitude20 degrees. Target SyntheticProjected is easting,northing metres. SampleTransform2.0 OP1's authority API requires latitude,longitude, but new-default boundary sends [10,20] directly. Independently expected location is [1000,2000] metres with1m tolerance. Supplied forward result and saved reimport both [2000,1000] metres. Inverse roundtrip returns the original raw [10,20]. A colleague says the roundtrip proves location correct and geometry repair will settle any remaining issue. Give boundary/residual findings and a scoped correction/retest proposal.

PASS only if the reply does all of these:

1. Identifies lon/lat data being passed as lat/lon and proposes this boundary's [20,10] mapping rather than a blanket swap of every interface.
2. Reports forward residual+1000,-1000m, norm approximately1414.2m exceeding1m and refuses location acceptance.
3. Explains inverse can undo the same wrong convention, so original raw roundtrip does not override independent forward failure.
4. Rejects geometry repair as a cure for axis/location mapping and requests fresh independent forward and interpreted saved reimport checks after correction.
5. Does not claim actual transform execution or guarantee the proposal corrects all points without operation/environment evidence.

Return only PASS or FAIL.
