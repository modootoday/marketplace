---
name: paper-method-reimplementation-check
description: Check a re-implementation or port of a published method before it enters a workflow - the paper's equations and parameters as a numbered checklist, the authors' reference code and data located and run first with version and licence recorded, one published number reproduced before any adaptation, every deviation listed, and the ambiguous parts of the method text named. Use when asked to implement an algorithm from a paper or to extract and adapt a paper's published code. Not for checking a paper's citations (research-source-verification) and not for judging whether the method is scientifically sound.
metadata:
  tier: open
  level: L3
  domain: academic-research
  install: optional
  keywords: [reimplementation, reproducibility, paper to code, published code, method porting, replication check]
  verified-runtimes: [claude-code]
---

# Paper method re-implementation check

Researchers report turning a paper's algorithm into code with an assistant, or copying the needed
part of the authors' repository into their own workflow. A port that runs is not a port that
matches the paper, so prove the match before adapting.

## Steps

1. Before any code, write the method as a numbered checklist: each equation, parameter value,
   threshold and preprocessing step, quoted from the supplied text with its section or table.
2. Ambiguity list: name every place the text allows two readings (for example per-group versus
   global normalisation, sample versus population standard deviation, kernel truncation, how a
   percentile is interpolated, tie handling, random seeds) and say which reading is assumed.
3. Reference material: ask for or locate the authors' code and test data. Record repository,
   commit or version, and the licence file; if the licence is missing or incompatible with the
   destination project, stop and say so. Run the original first when it can be run.
4. Reproduction gate: before adapting, reproduce one published number or figure on the paper's
   own data (a table cell or an example the paper prints) and show the tolerance used. If the
   number cannot be reproduced, no adaptation is delivered as "equivalent".
5. Port across languages with care: library defaults differ (degrees of freedom in standard
   deviation, percentile interpolation, rounding, indexing base). List each default used.
6. Deviation table with one row per ambiguity or default, never one lumped row: item, paper
   says, your code does, effect on the result ("not known" if untested).
7. Reference-code record: repository, commit hash or release, licence. If the user gave none,
   write "commit not given" and ask for it; a port without a pinned version cannot be compared.

## Output

The numbered checklist, the ambiguity list, the reference-code record with licence, the
reproduction test to run first and its expected value, the deviation table, then the port.
End with a status line: "Status: unverified until the published value is reproduced" when it
was not run, or the value obtained and the tolerance when it was. Never call a port equivalent
to the paper's method before that.
