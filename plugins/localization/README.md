# localization

## What it does

Quality checks for translations and subtitles: omissions, footnote parity, naturalness, and cue limits reported by id.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | named fixture cases measured | added skill only; see Verify |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: nothing is required. `subtitle-qc` can run `scripts/srt-check.mjs` when node is available and does the same checks by hand otherwise.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install localization@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add localization@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `gettext-catalog-runtime-contract-check` | Compare gettext PO/MO message identity, typed format arguments and plural selection with supplied consumer rendering controls |
| skill | `translation-postedit-qc` | a source-to-target check for omissions, footnote parity, naturalness and terms, with spots flagged for a native reviewer |
| skill | `subtitle-qc` | subtitle cues checked for line length, reading speed and overlapping timing, reported by cue id; ships `scripts/srt-check.mjs` (needs node) and a long-cue split reference |
| skill | `language-variety-and-register-lock-check` | generated text checked against a language policy (regional variety, dialect, speech level, intended foreign lines) span by span and turn by turn, with drift listed by line and protected spans left unchanged |
| skill | `catalog-transliteration-check` | romanized access points for non-Latin catalogue material: standard named, original script kept beside the romanization and a labelled gloss, doubtful characters flagged, search variants listed; rests on one user report |
| skill | `comic-localization-lettering-handoff` | licensed comic or webtoon pages: reading-order and speaker table, translator brief, bubble fit with overflow listed, manual-confirmation list and slice-versus-scroll check |

| skill | `xliff-source-target-code-handoff-check` | Check XLIFF unit/source/target roles and permission-aware inline-code reconstruction against approved extraction and merge contracts |

The added skill has supplied-fixture measurements in Verify; existing runtime scores retain their listed case scope.

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
Check these six SRT cues against 42 characters per line and 17 characters per second.
```

The plugin ships an eval suite (`claude plugin eval plugins/localization --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `german-footnote-calque` | translation-postedit-qc | 0.00 | 1.00 | 2 |
| `srt-limits-overlap` | subtitle-qc | 0.00 | 1.00 | 2 per arm, Sonnet subject and judge, 20261006 |
| `srt-limits-overlap` (Opus) | subtitle-qc | 0.50 | 1.00 | 2, Opus subject and judge |
| `pt-br-drift-two-turns` | language-variety-and-register-lock-check | 0.00 | 0.50 | 2 |
| `pt-br-drift-two-turns` (Opus) | language-variety-and-register-lock-check | 0.00 | 1.00 | 2, Opus subject and judge |
| `cyrillic-title-page` | catalog-transliteration-check | 0.00 | 1.00 | 2 per arm, Sonnet subject and judge, 20261006 (grader context clarified: variants in other standards are cross-references, personal and publisher names take no gloss) |
| `manga-page-and-slices` | comic-localization-lettering-handoff | 0.00 | 1.00 | 2, Sonnet subject and judge |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

### Artifact contract fixture measurements

Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and read-only bwrap isolation. All nine comparisons ran serially on supplied synthetic reports. They measure reasoning, not actual LMS execution, bank imports or XLIFF merging. Criteria and measured instructions were unchanged.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `xliff-permitted-code-reorder` | xliff-source-target-code-handoff-check | 1.00 | 1.00 (open) | 2 |
| `xliff-source-overwrite-code-loss` | xliff-source-target-code-handoff-check | 0.00 | 1.00 (open) | 2 |
| `xliff-reconstruction-contract-missing` | xliff-source-target-code-handoff-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inferred unmeasured Claude results. Runtime-specific raw scores qualify only where an applicable narrow effect is admitted; regression and OPEN rows remain nonqualifying.

XLIFF exception supports only a new merger/native-placeholder control after the explicitly requested correction/recheck. All arms already identify independent source, delivery and protected-code failures and propose scoped restoration; no actual repair, merge or better diagnosis is demonstrated. Normal permitted reordering is regression evidence. Missing-input grading is OPEN: baselines explicitly request editing hints/constraints/preservation requirements and source/unit/version/language/reference/skeleton/merge/native evidence, so the claimed absence of permissions is not established. Target-delivery wording versus generic acceptance criteria/expected output is not a robust effect.

### Other runtimes: artifact contract fixtures

These rows apply only to the named added skill. Other clients and actual applications remain untested for the addition; historical sibling results retain their scope.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `xliff-permitted-code-reorder` | xliff-source-target-code-handoff-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `xliff-source-overwrite-code-loss` | xliff-source-target-code-handoff-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `xliff-reconstruction-contract-missing` | xliff-source-target-code-handoff-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input; reasoning output is included in output. No OPEN row supports a badge.

### Added artifact contract fixture measurements

Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and read-only bwrap isolation. All nine comparisons ran serially on supplied synthetic reports. They measure reasoning, not actual EPUB reader execution, gettext compilation or font shaping. Criteria and measured instructions were unchanged.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `gettext-three-branch-consumer-match` | gettext-catalog-runtime-contract-check | 1.00 | 1.00 (open) | 2 |
| `gettext-missing-key-and-plural-gap` | gettext-catalog-runtime-contract-check | 1.00 | 1.00 (open) | 2 |
| `gettext-compile-badge-missing-consumer` | gettext-catalog-runtime-contract-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inferred unmeasured Claude results. Runtime-specific raw scores qualify only where an applicable narrow effect is admitted; regression and OPEN rows remain nonqualifying.

The missing-input contrast supports only explicit consumer/runtime version collection, present in both With replies and absent from both baselines. All arms already request policy, header, plural entries and branch-count reports; approval and branch-index wording is excluded from the effect claim. Normal and observed named-key/plural-gap cases are regression evidence. No general runtime-parity or compiler-diagnosis advantage is established.

### Other runtimes: added artifact contract fixtures

These rows apply only to the named added skill. Other clients and actual applications remain untested for the addition; historical sibling results retain their scope.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `gettext-three-branch-consumer-match` | gettext-catalog-runtime-contract-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `gettext-missing-key-and-plural-gap` | gettext-catalog-runtime-contract-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `gettext-compile-badge-missing-consumer` | gettext-catalog-runtime-contract-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input; reasoning output is included in output. No OPEN row supports a badge.

## License

MIT
