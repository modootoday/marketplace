# brand-assets

## What it does

Brand work that decides something: visual directions argued before drawing, a tokens.json and colour names every asset reads, client requests clarified before design, mockup text recovered with its doubts marked, and QA of the rendered asset before it is published.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install brand-assets@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add brand-assets@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `font-subset-shaping-parity-check` | Compare approved font repertoire and shaping controls before and after subsetting using supplied binary identities and named-shaper observations |
| skill | `visual-concept-sparring` | two or three visual directions that differ in more than colour, each with its case against, narrowed to one test |
| skill | `brand-token-kit` | one tokens.json traced to sources, with contrast checked and guesses marked; also names a list of HEX values by role with a collision and contrast check (extended; rests on one record) |
| skill | `mockup-text-recovery` | text, hierarchy and colours recovered from an AI mockup description with every doubt marked and fonts as candidates only (rests on two records) |
| skill | `client-request-clarification` | a vague client request split into ambiguities, at most four questions with confirmable defaults and a short reply (rests on one record) |
| skill | `asset-qa-review` | rendered assets checked for clipping, contrast, logo misuse, forbidden patterns and licences before publishing |

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
Help me decide the visual direction for our bakery's Instagram posts.
```

The plugin ships an eval suite (`claude plugin eval plugins/brand-assets --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `bakery-visual-directions` | visual-concept-sparring | 0.00 | 1.00 | 3 |
| `hex-to-rgb-not-brand` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `qa-render-report` | asset-qa-review | 1.00 | 1.00 | 2 |
| `tokens-from-guide` | brand-token-kit | 1.00 | 1.00 | 2 |
| `name-five-hex-values` | brand-token-kit (colour naming) | 0.25 | 1.00 | 2, Opus subject and judge, both arms, 20261005 (after the names grader context named the user's badge-text and link-text statements) |
| `mockup-text-garbled-ad` | mockup-text-recovery | 0.00 | 1.00 | 2, Opus subject and judge, both arms, 20261005 |
| `vague-client-email` | client-request-clarification | 0.00 | 1.00 | 2, Opus subject and judge, both arms, 20261005 (after the defaults rule in SKILL.md and the reply example were tightened) |

The three 20261005 Opus cases above all score 1.00 with the plugin; the baseline scores 0.00 to 0.25.

brand-token-kit and asset-qa-review show no lift yet: the baseline passed their cases. Their cases stay as regression checks. The Codex scores below add a case with lift for asset-qa-review.

Re-run 20261004 with smaller models answering (`--model`), mean score without and with the plugin over the same cases, 2 runs per arm: brand-token-kit and asset-qa-review: Haiku 0.00 to 0.00, Sonnet 1.00 to 1.00. Haiku fails these cases with or without the skill, so the skills do not yet carry a smaller model through them.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `carousel-slide-dense-readings` | asset-qa-review | 0.25 | 1.00 | 2 of 2 |

### Added artifact contract fixture measurements

Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and read-only bwrap isolation. All nine comparisons ran serially on supplied synthetic reports. They measure reasoning, not actual EPUB reader execution, gettext compilation or font shaping. Criteria and measured instructions were unchanged.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `font-renumbered-glyph-shaping-match` | font-subset-shaping-parity-check | 1.00 | 1.00 (open) | 2 |
| `font-cmap-pass-layout-failure` | font-subset-shaping-parity-check | 1.00 | 1.00 (open) | 2 |
| `font-ascii-preview-missing-baseline` | font-subset-shaping-parity-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inferred unmeasured Claude results. Runtime-specific raw scores qualify only where an applicable narrow effect is admitted; regression and OPEN rows remain nonqualifying.

The missing-input contrast supports only explicit original/subset cluster membership and correspondence control collection, present in both With replies and absent from both baselines. All arms already request permission, artifact identities, repertoire, same-shaper/version controls, positions, UPM/frame/tolerance and fallback and hold readiness unknown. Normal semantic glyph renumbering and observed layout failures are regression evidence. No broad fidelity or readiness advantage is established.

### Other runtimes: added artifact contract fixtures

These rows apply only to the named added skill. Other clients and actual applications remain untested for the addition; historical sibling results retain their scope.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `font-renumbered-glyph-shaping-match` | font-subset-shaping-parity-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `font-cmap-pass-layout-failure` | font-subset-shaping-parity-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `font-ascii-preview-missing-baseline` | font-subset-shaping-parity-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input; reasoning output is included in output. No OPEN row supports a badge.

## License

MIT
