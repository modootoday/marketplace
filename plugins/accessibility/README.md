# accessibility

## What it does

Read images, scans, charts and device screens for blind and low-vision users: the text first, in order, with trends stated and uncertainty marked.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast for 1 case; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

Requirements: None. Image reading needs a runtime that can see the image; the skill governs how the result is reported.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install accessibility@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add accessibility@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `accessible-visual-reading` | photos, scans, charts, signs and screens read as text in order, chart trends stated, uncertain parts marked, device steps given one at a time |
| skill | `nonvisual-task-route-and-navigable-output` | keyboard and screen reader task routes with confirmed or unverified key commands and a completion signal per step, long answers shaped as numbered headings with a summary first |
| skill | `contextual-alt-text-review` | image alternatives reviewed with caption, link target and audience in view: decorative images left empty, buttons described by action, charts by takeaway, invented emotions and identities removed, and the alternative the exported page carries checked; rests on three public practitioner reports, one of them a snippet |
| skill | `pdf-reading-order-export-check` | Compare an exported PDF's intended sequence, tag tree, form tab order and reader observations by element ID |

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
I am blind. Read me this handwritten note and tell me what the chart shows.
```

The plugin ships an eval suite (`claude plugin eval plugins/accessibility --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `note-and-chart-reading` | accessible-visual-reading | 0.00 | 1.00 | 2 |

| `nvda-two-factor-route` (Opus subject and Opus judge, 3 grader files) | nonvisual-task-route-and-navigable-output | 0.00 | 1.00 | 2 |

Each skill has one case; two more are needed per skill for the three-case release gate. The
`nvda-two-factor-route` row was measured with Opus as subject and judge on 20261005, with the
five-item rubric split into three llm grader files (keys and wording, assumptions and
confirmation, heading structure). Earlier the same case scored 0.50 with the plugin. The change
was references only: `references/screen-reader-keys.md` is now a sourced table (key, effect,
mode, source) and `references/nonvisual-wording.md` is new. Sources: the NVDA User Guide and
Commands Quick Reference (nvaccess.org), Microsoft Windows keyboard shortcuts, W3C WCAG 1.3.3
and 3.3.8 understanding pages, WebAIM, and a Microsoft Authenticator help page. The Firefox
shortcuts page could not be fetched by script, so its rows rest on a search excerpt. The
graders' list of real keys was extended with the sourced keys; no rubric item was changed.
Both arms ran 2 runs; every grader passed in both with-plugin runs, and both baseline runs
failed all three grader files.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `newsletter-alt-drafts` | contextual-alt-text-review | 0.50 | 1.00 | 2 of 2 |

### Other runtimes

Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `newsletter-alt-drafts` | 0.25 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `newsletter-alt-drafts` | 0.50 | 0.75 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `newsletter-alt-drafts` | 0.25 | 1.00 | 2/2 | 20261006 |

### CSV/PDF fixture measurements

These synthetic reports test bounded reasoning, not real spreadsheet/PDF tool
execution or universal safety/accessibility. Supplied observations remain supplied
evidence. Each case used gpt-6.1-sol subject/judge, two runs per arm, j2, three
judge votes, proxy authentication and a read-only isolated sandbox. Cases ran
serially on Codex CLI.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `pdf-order-scoped-match` | pdf-reading-order-export-check | 1.00 | 1.00 | 2 |
| `pdf-reader-and-tab-mismatch` | pdf-reading-order-export-check | 0.00 | 1.00 (open) | 2 |
| `pdf-order-screenshot-only` | pdf-reading-order-export-check | 0.00 | 1.00 | 2 |

The normal order case is a 1.00/1.00 regression check. Both arms separate semantic/tag/label-association evidence from keyboard focus and limit the supplied pass to the named reader, assistive technology and mode. No general accessibility or actual-reader effect is claimed.

The reader/tab mismatch case has raw Without 0.00 and With 1.00, but is excluded for judging sensitivity. Both arms correct the authored tab order, preserve correct tags and leave the reader cause unresolved. One baseline's only judged failure is not repeating version numbers despite retaining versioned results and both-reader rechecks. The other baseline lacks a specific configuration/annotation check, but that does not establish an effect across both baseline runs. No runtime badge is derived from this row.

The screenshot-only case supports a narrow evidence-collection effect: With requests relevant reader/assistive-technology modes alongside reading and keyboard observations, which both baseline replies omit. Both arms already reject screenshot-based approval, and one baseline explicitly distinguishes intended and observed focus. The result does not establish generally better reading-order diagnosis; mode collection improves reproducibility of the proposed verification only.

Baseline 1.00 is regression evidence. Only a defensible With 1.00, Without
<1.00 and Fired 2/2 supports a runtime effect; open judging is excluded. No result
is transferred to an unmeasured runtime.

### Other runtimes: CSV/PDF fixtures

The following comparisons used Codex CLI only.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `pdf-order-scoped-match` | 1.00 | 1.00 | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `pdf-reader-and-tab-mismatch` | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `pdf-order-screenshot-only` | 0.00 | 1.00 | 2/2 | 2026-10-07 |

Three initial CSV comparisons lacked the LLM grader declaration. They contain
12 subject runs and no judge calls; their raw zeroes are unscored invocation-only
results, excluded from semantic scores and retained in the evaluation ledger.
Only the required grader frontmatter was added, preserving criteria unchanged.
Their usage is included in total usage. No metered runtime was used. costUsd is
null because the harness has no price mapping; USD conversion is unknown, not
measured zero. Cached input is included in input, not additional consumption.

## License

MIT
