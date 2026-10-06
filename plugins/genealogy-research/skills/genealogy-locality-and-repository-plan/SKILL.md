---
name: genealogy-locality-and-repository-plan
description: Plan where to search next for a named person, place and period - separate the historical jurisdictions (township, civil county, parish, diocese and their predecessors) from the nearest named place, match record series to coverage, date range, surviving volumes and custodian from the finding aids supplied, tell indexes from images and online from onsite, and return an ordered search plan with a log that keeps "not searched" apart from a documented negative. Use when a family historian asks which records, archive or collection to try next. Not for confirming ancestry, transcribing handwriting, checking tree exports, locating living people or deciding citizenship or inheritance rights.
metadata:
  tier: open
  level: L3
  domain: genealogy
  install: optional
  keywords: [genealogy, research plan, jurisdiction, parish registers, county boundaries, finding aid, search log]
  verified-runtimes: [codex-cli]
---

# Genealogy locality and repository plan

Family historians report plans that infer the jurisdiction from the nearest named place rather
than the documented residence, and that name the wrong diocese or county for a date before a
boundary changed. This skill plans where to look; it does not claim what a record says.

## Steps

1. Write the research question, the documented residence timeline (place, date, source),
   evidence in hand and searches already done, each with its result.
2. For every date in the question, fix the jurisdiction in force then: township, civil county,
   parish, diocese. Where a unit was created, split or renamed after that date, name the
   predecessor and the date of the change. Use only the boundary facts the user or the
   supplied finding aids give; mark any other as "to confirm in a boundary reference".
3. List the record series that could answer the question, each with the custodian, the
   coverage of place and years, surviving volumes and gaps (damaged, lost, closed), and the
   catalog or collection identifier as supplied.
4. For each series state what is actually available: index only or images, online or onsite,
   originals only, access rules. A record type that "sometimes lists parents" is not a promise
   that this entry does; say "may include", never "will give". A series with no index and
   originals only has to be read volume by volume, in person or through a hired researcher; say so.
5. Return an ordered plan: step, jurisdiction and dates, repository, collection identifier,
   expected usefulness and why, what a hit would still need. Rank by fit to the dates, not by
   what is easiest to search online.
6. Keep a search log with three states: not searched, searched with a hit, searched with a
   documented negative (what was searched, index or images, which volumes). A search of a
   series that does not cover the date is not a negative. Enter the searches already done
   first, with the repository, collection, years and index-or-images scope as far as the user
   gave them; where the scope is missing, ask for it and mark the result "negative, scope
   unrecorded". Planned entries list the volumes still to read.

## Search log format

One row per search, done or planned, with these columns: repository, collection or volume,
years covered, index or images, status (not searched, hit, documented negative, negative with
scope unrecorded), and note. Fill every cell of every planned row, including index or images,
from the finding aid. For each done search with an empty cell, write a direct question to the
user at the end ("Which years of the Tallow deed index did you read, and did you view images?").

## Output

The jurisdiction table, the ordered plan, the search log, the questions for the user, and the
claims left open. State what
was not verified (finding aids not seen, boundary dates taken from the user). Living people
and legal status conclusions are out of scope.
