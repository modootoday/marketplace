---
description: A researcher asks for a Python GTF parser giving gene length per gene id and genes with more than one transcript, with a small fixture that includes a quoted semicolon and a malformed line. The reply must use inclusive coordinates, handle the version suffix, parse quotes safely, give a hand-worked fixture and count skipped lines.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [bio-analysis-script-pitfalls]
---

Write me a Python script to parse a GTF file. I need (1) the gene length in bp for each gene_id and (2) a table of genes that have more than one transcript. Attribute column looks like: gene_id "ENSG0001.5"; gene_name "TP53"; and some lines have extras such as note "readthrough; see ENSG0002";.

Here is a tiny test file (tab separated, shown here with spaces), 9 lines:

# produced by example tool
chr1 src gene 100 250 . + . gene_id "ENSG0001.5"; gene_name "TP53";
chr1 src transcript 100 250 . + . gene_id "ENSG0001.5"; transcript_id "ENST01.1";
chr1 src transcript 100 180 . + . gene_id "ENSG0001.5"; transcript_id "ENST02.1"; note "readthrough; see ENSG0002";
chr1 src gene 400 500 . - . gene_id "ENSG0002.2"; gene_name "GENE2";
chr1 src transcript 400 500 . - . gene_id "ENSG0002.2"; transcript_id "ENST03.1";
chr1 src exon 400 500 . - . gene_id "ENSG0002.2"; transcript_id "ENST03.1";
chr1 src gene 700 . + . gene_id "ENSG0003.1";
(blank line)

The code and the fixture's expected output, please. I will paste the output into my methods notes.
