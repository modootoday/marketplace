---
name: stock-photo-metadata-format-check
description: Draft and check titles, descriptions, keywords and upload CSVs for an existing photo batch against the destination's limits - field lengths, keyword syntax and count, ordering, escaping of commas and quotes, encoding, one row per exact filename - keep unknown locations, identities and species out of the text until the photographer confirms them, and list files with no notes. Use when a photographer asks an assistant for stock-site metadata or a CSV for a batch. Not for generating or editing images, choosing keepers, release or licence validity, or sales promises.
metadata:
  tier: open
  level: L3
  domain: photography
  install: optional
  keywords: [stock photography, keywords, metadata CSV, microstock, titles, upload batch]
  verified-runtimes: [codex-cli]
---

# Stock photo metadata format check

Photographers report generated keywords that ignore the requested form ("single words" has to
be repeated), descriptions far over the limit and generic text that needs rewriting. This skill
works from the rules, notes and filenames supplied; it does not look at pixels it was not given.

## Steps

1. Get the destination's current rules from the user or their page: limits per field, keyword
   count and form (single words or phrases, case, separator, order), required columns, file
   encoding. Do not assume a site's rules from memory; mark any unsupplied rule as unknown.
2. Separate what the photographer wrote from what is only visible. Do not state a place,
   person, species, event or date that no note confirms; put each doubtful one in a "to
   confirm" list and leave it out of titles and keywords until confirmed.
3. Draft per file: a title in plain words, a description, and keywords ordered by importance
   with repetition and unsupported terms removed. Single-word keywords only when asked or required.
4. Validate with counts shown: characters per title and description against the limit, keyword
   count against the range, forbidden forms, duplicates. Rewrite what is over.
5. Build the CSV: header as required, a field containing a comma or quote wrapped in quotes
   (quotes doubled), one row per exact filename, similar names kept distinct. Re-read the
   finished CSV field by field to confirm every row has the same number of fields.
6. Reconcile against the file list: files supplied versus rows made, missing notes, names that
   differ only by a suffix.

## Output

The CSV, then a check table (file, title length, description length, keyword count, flags),
the to-confirm list, files without enough notes, and what was not verified: the photos were
not seen and no parser was run unless one was. Close by asking the photographer to approve the
CSV against the actual files, row by row for a sample, before upload. Release, licence and
sales questions go to the photographer or the agency.
