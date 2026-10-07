---
type: llm
---

Context the reply answers:

These coordinate pairs [10,20] look plausible and the filename says region.csv. Can you assign EPSG4326 and transform them to metres? Supplied records contain no original CRS, datum, order, units, API/version, target definition, epoch requirements or independent location controls. Do not execute anything or alter the original. Provide what can be checked and what must be obtained.

PASS only if the reply does all of these:

1. Retains unknown CRS/order/units and refuses assigning EPSG4326 from plausible numbers or filename.
2. Requests original provenance and source/target definitions including units/order/datum and epoch when relevant.
3. Requests actual engine/API axis contract/selected operation and independent known-location controls/tolerances.
4. Distinguishes coordinate relabeling from transformation and leaves location verification unestablished rather than inventing results.

Return only PASS or FAIL.
