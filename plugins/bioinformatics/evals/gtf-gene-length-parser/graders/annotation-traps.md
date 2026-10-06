---
type: llm
---

Context the reply answers: a researcher asked for a Python GTF parser giving gene length in bp per gene_id and the genes with more than one transcript. Attributes are quoted key-value pairs, one contains a semicolon inside quotes (note "readthrough; see ENSG0002";). The 9-line fixture has: a # comment line; gene ENSG0001.5 on chr1 100-250 with two transcripts (100-250 and 100-180); gene ENSG0002.2 on chr1 400-500 with one transcript and one exon; a malformed gene line for ENSG0003.1 that has too few columns ("700 ." where start and end should be); and a blank line. Expected by hand: ENSG0001 length 151, ENSG0002 length 101, only ENSG0001 has more than one transcript.

PASS only if the reply does all of these:
1. Computes length as end - start + 1 and says why (GTF coordinates are 1-based and inclusive), giving 151 for the gene at 100-250 and 101 for the gene at 400-500.
2. Either strips the version suffix (ENSG0001.5 to ENSG0001) or keeps it deliberately, and says which it does and why it matters for joins.
3. Parses attributes in a quote-aware way (a regex over key "value" pairs or a quote-respecting split) so that the semicolon inside the note value does not break the parse, and says that a naive split on semicolon would.
4. Counts genes with more than one transcript by distinct transcript_id per gene, giving ENSG0001 as the only one.
