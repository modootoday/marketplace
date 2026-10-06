---
name: bio-analysis-script-pitfalls
description: Write or review a differential-expression script, a GTF or GFF annotation parser or a publication figure script so that input contracts, annotation traps (1-based inclusive coordinates, gene id version suffixes, several transcripts per gene, quoted attributes), filter counts and a hand-checkable fixture are stated before the code is trusted; scripts are reviewed and the fixture's expected numbers are worked by hand, never presented as run. Use when someone asks for such a script or asks whether one is right. Not for refactoring a finished pipeline for parity, choosing statistics for new data or interpreting results biologically.
metadata:
  tier: open
  level: L3
  domain: bioinformatics
  install: optional
  keywords: [GTF, GFF, annotation parser, differential expression, DESeq2, publication figure, coordinates, gene id]
---

# Bioinformatics analysis script pitfalls

Short analysis scripts fail quietly: an off-by-one length, a version suffix that breaks a join, a
count matrix that was already normalised. This skill fixes the contract first, lists the traps
that apply, and ties the code to a fixture small enough to check by hand. Neighbour:
`analysis-pipeline-refactor-parity` covers migrations of finished analyses.

## Steps

1. Input contract before code. State what each input must be: for differential expression raw
   integer counts (not normalised, TPM or FPKM), the sample sheet columns and their order against
   the matrix columns, the design formula and the reference level of each factor, the contrast,
   and the reference genome and annotation version. For annotation, the file format and version.
   Ask for anything missing instead of assuming it.
2. Annotation traps, for a GTF or GFF parser: coordinates are 1-based and inclusive, so length is
   end - start + 1 (100-250 is 151 bp), and a 0-based tool needs an explicit conversion; the gene
   id may carry a version suffix (`ENSG0001.5`) and the code must strip it or keep it on purpose
   and say which, because joins to other tables break silently; one gene has several
   transcripts, so say which length is meant (the gene feature span, the longest transcript or the
   union of exons) and count genes with more than one transcript once, not once per line;
   attributes are `key "value";` pairs whose quoted values can contain a semicolon or a space, so
   split with a quote-aware parse, not a naive split on semicolon; header lines begin with `#`.
3. Differential expression traps: filter low counts on a stated rule, never test genes with
   all-zero rows, use the design that matches the question, correct for multiple testing and say
   which method, and keep the gene id as a key rather than a row position.
4. Figures: set the size in the units of the journal, fonts embedded or named, a colourblind-safe
   palette, labels with units and sample sizes, and export both a vector (PDF or SVG) and a raster
   (PNG at a stated dpi). The plotted numbers must come from the same table as the text.
5. Count what is dropped. The script prints counts at each step: lines read, comment lines,
   malformed lines skipped with the reason, records kept, genes removed by each filter. Each
   skipped line is also reported by line number and its gene id when one can be read, so nothing
   disappears unseen. A script that skips lines without a count is not accepted.
6. Fixture. Give a tiny input (2 genes, 3 transcripts for a parser) and work the expected output
   by hand in the reply, line by line. Say plainly that you reviewed the code and did not run it
   here, so the expected numbers are hand-worked and the user should run the fixture and compare.
   If the user can run it, the pass condition is that the script's output equals the hand-worked
   table.
7. Say what you did not check: your code is unrun, real files may contain cases the fixture does
   not (other feature types, missing attributes, other annotation sources), and results need a
   person who knows the experiment to interpret them.

## Output

Put these statements in prose before the code, one sentence each, so a reader sees them without
reading the code:

- Length is end - start + 1 because GTF coordinates are 1-based and inclusive (worked example from
  the user's own numbers, such as 250 - 100 + 1 = 151); give the arithmetic and result for every
  gene in the user's fixture in that same sentence, not only the first.
- Which id form is used (version suffix stripped or kept) and that a mismatch breaks joins to other
  tables without an error.
- A naive split on semicolon breaks when a quoted value contains a semicolon, so attributes are
  parsed by a quote-aware pattern.
- How "more than one transcript" is counted (distinct transcript ids per gene, not lines), and
  which gene or genes of the user's fixture meet it, by name.
- The code was reviewed, not run; the fixture output below is worked by hand.

Then the contract, the code, the fixture with the hand-worked expected output and the exact
drop-count report it should print (lines read, comment, blank, malformed skipped with reason), and
the open questions. Keep the code short enough to read in one pass.
