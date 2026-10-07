# bioinformatics

## What it does

Refactors of analysis pipelines that must keep results equal: baseline frozen, steps mapped, outputs compared at a stated tolerance, differences explained apart from unexplained ones.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | named fixture cases measured | FASTQ/VCF cases only; see Verify |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install bioinformatics@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add bioinformatics@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `fastq-mate-singleton-conservation-check` | ordered mate identities and eligible singleton/category-0 conservation |
| skill | `vcf-reference-allele-normalization-check` | exact reference and alternate-sequence equivalence with allele/GT/annotation crosswalks |
| skill | `bio-analysis-script-pitfalls` | a differential-expression, GTF parser or figure script reviewed against its input contract and the known traps (inclusive coordinates, id version suffix, quoted attributes, transcripts per gene), with drop counts and a hand-worked fixture; reviewed, not run (rests on three first-person reports) |
| skill | `analysis-pipeline-refactor-parity` | a migration plan and acceptance check for replacing an analysis step with a package, porting a pipeline to a workflow engine or accelerating it: baseline, step map, tolerances, explained and unexplained differences, no claim before the comparison runs |

The newly added `fastq-mate-singleton-conservation-check` and `vcf-reference-allele-normalization-check` review supplied synthetic scientific artifact evidence. Each ships three synthetic cases (normal, exception and missing input); the named Codex fixture comparisons and limits are recorded below. Historical results apply only to their named skills. No biological or clinical interpretation is provided.

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin. A skill that produces files writes them only where the user asks.

## Verify

Ask for something the plugin covers:

```
I am replacing my own R script with DESeq2 and moving a shell pipeline to Nextflow. Give me the migration plan and the acceptance check.
```

The plugin ships an eval suite (`claude plugin eval plugins/bioinformatics --no-publish`).
Scores are the share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- |
| `deseq2-nextflow-migration` | analysis-pipeline-refactor-parity | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005) |
| `gtf-gene-length-parser` | bio-analysis-script-pitfalls | 0.00 | 1.00 | 2 per arm | Sonnet, Sonnet (20261006) |

The two historical sibling skills each have one listed case; the added FASTQ/VCF skills have the three fixtures below.

### Scientific artifact fixture measurements

Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and read-only bwrap isolation. All nine comparisons ran serially on supplied synthetic reports. They measure reasoning, not executed exporters, sequence analysis or microscopy applications. Criteria and measured instructions were unchanged.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `fastq-eligible-conservation-match` | fastq-mate-singleton-conservation-check | 1.00 | 1.00 (open) | 2 |
| `fastq-equal-count-wrong-mates` | fastq-mate-singleton-conservation-check | 0.00 | 1.00 (open) | 2 |
| `fastq-missing-identity-policy` | fastq-mate-singleton-conservation-check | 0.50 | 1.00 (open) | 2 |
| `vcf-local-sequence-equivalence` | vcf-reference-allele-normalization-check | 1.00 | 1.00 (open) | 2 |
| `vcf-ref-swap-stale-pl` | vcf-reference-allele-normalization-check | 0.00 | 1.00 (open) | 2 |
| `vcf-exact-reference-missing` | vcf-reference-allele-normalization-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inferred unmeasured Claude results. Runtime-specific raw scores below qualify only where an applicable narrow effect is admitted; regression and OPEN rows remain nonqualifying.

FASTQ exception supports only fresh sequence/quality retention checks after an explicitly requested repair/retest. All arms already diagnose wrong mates and singleton/category-0 loss correctly. FASTQ missing is OPEN: both baselines reject certification and flag missing consumer requirements; request form and artifact specificity are interpretation-sensitive. VCF missing supports only flanking context/local alternate-sequence comparison and explicit deduplication-policy collection; baselines already request exact reference, artifacts, genotype/header and REF-span evidence. VCF exception is OPEN: all arms diagnose the PL index swap and reject universal strand repair, while bundled original-preservation and future approved-repair criteria over-apply to the current minimal read-only request. Neither With explicitly preserves originals either. Both normal cases are regression checks, not effect evidence.

### Other runtimes: scientific artifact fixtures

These rows apply only to the named additions. Other clients and actual applications remain untested for these additions; historical sibling results retain their scope.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `fastq-eligible-conservation-match` | fastq-mate-singleton-conservation-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `fastq-equal-count-wrong-mates` | fastq-mate-singleton-conservation-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `fastq-missing-identity-policy` | fastq-mate-singleton-conservation-check | 0.50 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `vcf-local-sequence-equivalence` | vcf-reference-allele-normalization-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `vcf-ref-swap-stale-pl` | vcf-reference-allele-normalization-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `vcf-exact-reference-missing` | vcf-reference-allele-normalization-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input; reasoning output is included in output. No OPEN row supports a badge.


## License

MIT
