---
name: analysis-pipeline-refactor-parity
description: Plan and accept a bioinformatics refactor that must keep results equal - replacing a hand-written analysis step with an official package, porting a shell or script pipeline to a workflow engine, or accelerating it on GPU or in parallel - by freezing a baseline with seeds, versions and checksums, mapping every old step to its replacement, comparing outputs at a stated tolerance and reporting explained and unexplained differences apart. Use when a researcher asks for a migration plan or acceptance check for an analysis that already produced results. Not for designing a new analysis, choosing statistics for new data or SQL migrations.
metadata:
  tier: open
  level: L3
  domain: bioinformatics
  install: optional
  keywords: [pipeline migration, workflow engine, nextflow, snakemake, deseq2, gpu, regression, reproducibility, baseline]
  verified-runtimes: [claude-code]
---

# Analysis pipeline refactor parity

A refactored analysis is a new analysis until a run shows otherwise. Equivalence and speedup
are claims that need measured numbers; a plan can only say how they will be measured.

## Steps

1. Baseline first. Before any change, run the old pipeline once on a small input and freeze:
   the input checksums, the seeds, the tool and package versions, the parameters, the exact
   commands, and a checksum or row count of every output file. For the full input, keep the
   existing result table as the reference and record its headline numbers.
2. Map the old steps. Number every old step and write its replacement beside it. A step with
   no counterpart is listed as unmatched with its options: keep as a custom step, drop with a
   reason, or ask the owner. A step that a package now does implicitly (normalisation,
   filtering, multiple-testing correction) is mapped to that behaviour, not skipped.
3. Name the known behavioural differences before running: defaults that differ between the
   old code and the package (normalisation or size-factor method, filtering rule, test,
   dispersion estimate, tie handling, floating point precision, sort order, random seeds,
   GPU versus CPU numerics). These are the expected differences and are explained up front.
4. Fix the comparison before looking at results. Exact match for ids, counts, row sets and
   categorical calls. A stated numeric tolerance for floats (relative and absolute). For
   a ranked or thresholded result: overlap of the selected set (both-way counts and Jaccard),
   rank correlation of the statistic, and sign agreement of effect sizes. Show the diff
   table, not only a pass or fail.
5. Report differences in two lists. Explained: each tied to one named cause from step 3 and
   shown by switching that setting to match the old code and re-running. Unexplained: nothing
   is claimed about them, they block acceptance until a cause is found.
6. Benchmark the old and new versions on the same input, the same hardware and a stated number
   of repeats, with wall time and peak memory. For GPU or parallel work, include the CPU
   single-thread baseline.
7. Acceptance wording. Until the comparison has been run, say "not yet shown equivalent" and
   "speedup not yet measured". Never write a speedup factor or "identical results" from
   reasoning alone. If the numbers are given in the prompt, use only those.
8. Orchestration moves (shell to a workflow engine) also need: the same inputs and outputs
   per step, the environment pinned per step (container or lock file), resume and cache
   behaviour tested, and the final outputs compared with step 4.

## Output

A short plan with the baseline checklist, the step map table with unmatched steps, the known
differences, the comparison design with tolerances, the two difference lists (empty before the
run), the benchmark protocol and the acceptance rule. Offer to turn it into the comparison
script once the user can run both versions.
