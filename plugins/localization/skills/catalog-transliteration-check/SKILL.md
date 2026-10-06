---
name: catalog-transliteration-check
description: Check romanized access points for catalog records of non-Latin material (Cyrillic, Greek, Arabic and similar) - the transliteration standard named and applied consistently, original script kept in its own field beside the romanized form and a labelled gloss, unreadable or ambiguous characters flagged instead of guessed, and searchable variant spellings listed. Use when cataloguing or describing books, titles or names in another script so users can find them, including from OCR of a title page. Not for translating running text (translation-postedit-qc) and not a substitute for a cataloguer's authority-file check.
metadata:
  tier: open
  level: L2
  domain: localization
  install: optional
  keywords: [transliteration, romanization, ALA-LC, ISO 9, library catalogue, Cyrillic, access points]
  verified-runtimes: [claude-code]
---

# Catalog transliteration check

A library practitioner reports using an assistant to read Cyrillic title pages and produce
searchable records. Romanization is rule-based, so name the rules and keep the original. This
rests on one report; a cataloguer who reads the script confirms the result.

## Steps

1. Ask which standard the catalogue uses (ALA-LC, ISO 9, BGN/PCGN, or a local rule). If not
   given, propose one, state it and apply it to every field. Do not mix standards.
2. For each access point give three separate fields: original script exactly as supplied,
   romanized form under the stated standard (say whether diacritics are kept, as in ALA-LC
   letters with a breve or hard and soft sign marks, or dropped for a search form), and a gloss
   labelled as a gloss. A gloss is not a uniform title or an established name. Give a gloss
   only for titles and common nouns; for personal names and publisher names write "no gloss"
   (do not write "Leo" for Lev or translate a publisher's name).
3. Names: never translate or invent them, and add nothing the page does not show (no dates, no
   patronymic, no honorific). The established heading is looked up in the library's authority
   file, not produced from memory; say what to look up and that the romanized form here is only
   a transcription of the page. Do not quote a remembered heading with dates as if it were the
   answer; at most say "check the authority file for the established form".
   Keep every field in the one standard: put other standards only in the variant list, and keep
   the place name in the same romanization as the rest (Moscow belongs in the variants).
4. Ambiguous or unreadable input (an OCR error, a damaged letter, a character that could be two
   letters, a name with several accepted spellings) is marked with the characters in doubt and
   the candidates. Do not choose one and present it as certain.
5. Variants: list the spellings a user might search (other standards, common English
   spellings, spellings without diacritics) so the record can carry them as cross-references.
   Head the list "cross-references only, not record fields" and say the record itself is in
   the one named standard.

## Output

A table per record: field, original script, romanized form, standard, gloss, confidence note.
Then the variant list, the characters in doubt, and what the cataloguer must confirm.
