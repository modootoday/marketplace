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

## License

MIT
