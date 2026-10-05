---
name: datasheet-spec-table
description: Compile part numbers, instruments or venues into a specification table where every value is quoted with the maker or source document and its date, unverified cells are marked instead of filled from memory, units and the conditions a figure holds under are kept, and price or availability is left as to be checked. Use when someone asks for package types, ratings, bandwidth, capacity or similar specs for a list of parts or models. Not for choosing a part, for a bill of materials with prices, or for a standards check (see standards-clause-locator).
metadata:
  tier: open
  level: L3
  domain: engineering
  install: optional
  keywords: [datasheet, specification table, part number, package, bandwidth, source document]
---

# Datasheet spec table

A spec table from memory looks complete and is wrong in the cells nobody checks. Every cell is either
traced to a source the user supplied or marked unverified.

## Steps

1. List the items exactly as given (part numbers with suffixes, model names) and the attributes asked
   for. Keep the full ordering code: a suffix can change package, grade or packing, so do not collapse
   two codes into one row.
2. For each cell write the value as printed in the source, with its unit, then the source: maker,
   document title, revision or date, and page or table if known. If the user supplied no document for a
   cell, the cell reads "unverified (no source supplied)" and gives the document to open, such as "the
   maker's datasheet for this ordering code". Do not fill a cell from recollection, even when it seems
   certain. When the only material is a seller listing, forum post or other non-maker text, the value cell
   itself reads "unverified" (the quoted wording may follow in brackets), the source cell names that
   text as insufficient, and no cell cites a document the user did not supply.
3. Carry the conditions with the figure: a bandwidth is at a stated amplitude or probe setup, a rating
   is at a stated temperature, a capacity is for a stated layout. Put the condition in its own column; a
   figure without its condition is marked "condition not stated".
4. Check units and wording across rows: MHz versus GHz, bandwidth versus sample rate, seated versus
   standing capacity, pin count versus pad count. Flag rows that are not comparable as given.
5. Price, stock, lead time and availability are time-sensitive: write "unverified, to be checked with
   the seller on the day" and give no number.
6. Close with the list of unverified cells and the documents needed to close them, each named with the
   revision or date to ask for, as the last list in the reply. After it, say the table
   supports a selection and that a qualified person confirms the part against the maker's current
   document before it is ordered or relied on.

## Output

The table (item, attribute, value with unit, condition, source and date or "unverified"), the
unverified list, and the to-be-checked list for price and availability.
