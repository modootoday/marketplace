# publishing-production

## What it does

Checks for books before release: typeset text diffed against the approved manuscript, print and EPUB rules kept apart, automated accessibility results paired with the manual items they cannot prove, a project style sheet applied across chapters, index locators checked against page proofs, and new chapters of long fiction checked against the author's canon ledger and outline with every ruling left to the author.

Verify approved DOCX revision choices, comment remnants and saved/reopened/attachment identity.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes, for the cases listed in Verify | measured 20261006 with gpt-6.1-sol |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install publishing-production@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add publishing-production@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `epub-resource-graph-handoff-check` | Check a selected EPUB package's manifest, spine and local resource references against packaged files and supplied reader evidence |
| skill | `book-layout-proof-and-epub-check` | typeset text diffed against the approved manuscript by page and edition, print and EPUB checked against separate rules, automated accessibility results listed beside the manual items still unverified |
| skill | `book-style-sheet-copyedit` | a project style sheet built from counted variants and the named style manual, applied chapter by chapter with a located change log, singular they left alone, a re-scan to prove no variant remains (rests on five records, medium evidence) |
| skill | `index-locator-verification` | every index locator searched on its page in the proofs and marked found, not found or off by one, range gaps queried, see and see also targets resolved, counts and a fix list (rests on two records, low confidence) |
| skill | `series-treatment-causal-review` | a series bible compressed to a length limit with each episode's cause, choice and consequence kept, missing motivation marked as questions, and a cut list; rests on one moderate record |
| skill | `manuscript-continuity-audit` | new chapters checked against a canon ledger and outline, with repeated information, unmotivated actions and tense or POV slips reported and the author's prose left alone |
| skill | `docx-revision-comment-delivery-check` | owner-approved text, revision/comment residuals and exact saved/reopened/attachment identity |

The two fiction skills came from the former `fiction-editing` plugin, now merged here.

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
I exported a Word manuscript to print PDF and EPUB with the same template. Check the layout rules for each and what the accessibility check cannot prove.
```

The plugin ships an eval suite (`claude plugin eval plugins/publishing-production --no-publish`). Scores
are the share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject / judge |
| --- | --- | --- | --- | --- | --- |
| `print-epub-proof-check` | book-layout-proof-and-epub-check | 0.00 | 1.00 | 2 | Sonnet / Sonnet, Claude Code 2.1.289, 20261005 |
| `chapter-canon-drift` | manuscript-continuity-audit | 0.00 | 1.00 | 2 | Sonnet / Sonnet, Claude Code 2.1.289, 20261005 |
| `bible-two-page-motivation` | series-treatment-causal-review | 0.00 | 1.00 | 2 | Opus / Opus, 20261006 (after one SKILL.md edit: questions propose no candidate reason, no framing phrases in the treatment; earlier Opus run 0.75, Sonnet rounds below 1.00) |
| `style-sheet-number-variants` | book-style-sheet-copyedit | 0.00 | 1.00 | 2 | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |
| `index-locators-against-proofs` | index-locator-verification | 0.00 | 1.00 | 2 | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |

The layout skill rests on three evidence records and checks only what the user pastes; it does not certify
accessibility. A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

### Other runtimes

Both arms, 2 runs per arm, 3 judge votes, the model as subject and judge. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `style-sheet-number-variants` | 0.00 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `style-sheet-number-variants` | 0.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `style-sheet-number-variants` | 0.00 | 1.00 | 2/2 | 20261006 |

### Artifact handoff fixture measurements

These self-contained synthetic observations measure reasoning on supplied reports, not actual application execution, archive extraction, private-document cleanup or manufacturing readiness. Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and a read-only bwrap sandbox. All 15 comparisons ran serially; no criteria or measured skill instructions changed.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `docx-approved-text-matching-artifact` | docx-revision-comment-delivery-check | 1.00 | 1.00 (open) | 2 |
| `docx-hidden-markup-different-attachment` | docx-revision-comment-delivery-check | 0.00 | 0.00 (open) | 2 |
| `docx-clean-screenshot-no-approval` | docx-revision-comment-delivery-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inference of unmeasured Claude results. The runtime-specific table below preserves raw scores; only admitted effect rows omit that marker. Other rows are regression or OPEN interpretation-sensitive results, not effect evidence.

No applicable effect is admitted for the DOCX skill. The approved-artifact case is 1.00/1.00 regression evidence. The different-attachment case is OPEN: the request says inspect without cleanup or deciding edits, while graders demand future finalization before A2 findings exist. The missing-input case is OPEN: baselines already reject blanket acceptance and collect approved content, comment policy, saved hash and same-file recipient evidence; judges require separate replies/reopened/attachment wording. The richer With checklist is preserved without claiming demonstrated confidentiality or safety superiority.

### Other runtimes: artifact handoff fixtures

These rows apply only to the named new skills and fixture reasoning. Other clients and actual receiving applications remain untested.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `docx-approved-text-matching-artifact` | docx-revision-comment-delivery-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `docx-hidden-markup-different-attachment` | docx-revision-comment-delivery-check | 0.00 | 0.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `docx-clean-screenshot-no-approval` | docx-revision-comment-delivery-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input tokens; reasoning output is included in output. No score from OPEN judging supports a badge.

### Added artifact contract fixture measurements

Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and read-only bwrap isolation. All nine comparisons ran serially on supplied synthetic reports. They measure reasoning, not actual EPUB reader execution, gettext compilation or font shaping. Criteria and measured instructions were unchanged.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `epub-selected-package-resource-match` | epub-resource-graph-handoff-check | 0.00 | 0.50 (open) | 2 |
| `epub-case-path-and-spine-edge-failure` | epub-resource-graph-handoff-check | 0.00 | 0.00 (open) | 2 |
| `epub-preview-missing-package-evidence` | epub-resource-graph-handoff-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inferred unmeasured Claude results. Runtime-specific raw scores qualify only where an applicable narrow effect is admitted; regression and OPEN rows remain nonqualifying.

All three EPUB rows are OPEN and establish no admitted effect. Every arm correctly assesses the bounded package graph or requests exact packaged and receiving evidence. Normal-case version/base/case/SHOULD NOT restatement requirements do not expose a wrong lookup in the fixture. Exception generic incompleteness wording is redundant to the explicitly identified remaining blockers. Missing-case accessibility-disclaimer grading exceeds the package-only claim already made by the baselines. Raw failed votes and the With normal partial score remain visible; no new runtime badge is supported.

### Other runtimes: added artifact contract fixtures

These rows apply only to the named added skill. Other clients and actual applications remain untested for the addition; historical sibling results retain their scope.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `epub-selected-package-resource-match` | epub-resource-graph-handoff-check | 0.00 | 0.50 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `epub-case-path-and-spine-edge-failure` | epub-resource-graph-handoff-check | 0.00 | 0.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `epub-preview-missing-package-evidence` | epub-resource-graph-handoff-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input; reasoning output is included in output. No OPEN row supports a badge.

## License

MIT
