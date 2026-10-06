# modootoday marketplace

Agent plugins that behave the same way in more than one coding agent.

Claude Code, Codex CLI and Grok CLI all read the same plugin manifest, so one
plugin directory serves all three. Gemini CLI uses its own manifest, which each
plugin carries alongside the first one.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install <plugin>@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add <plugin>@modootoday
```

Grok CLI:

```
grok plugin marketplace add modootoday/marketplace
grok plugin install <plugin> --trust
```

Grok reads the same manifest and loads a plugin's skills. It registers a
plugin's hooks and then never runs them, so the hook-bearing plugins here reach
Grok as skills only.

Gemini CLI has no marketplace and loads a plugin's skills only: it runs hooks,
but with different event names, timeouts in milliseconds rather than seconds, and
no plugin-root variable, so handlers written for the others fail there. Clone
this repository and link a plugin directory:

```
gemini extensions link <repo>/plugins/<plugin> --consent
```

## Plugins

| Plugin                      | What it does                                                                  | Hooks |
| --------------------------- | ----------------------------------------------------------------------------- | ----- |
| `agent-guardrails`          | Refuse shell commands whose damage is hard to undo                            | yes   |
| `secret-exfil-guard`        | Refuse commands that would print or send a credential file                    | yes   |
| `llm-peer-bridge`           | Let two running agent sessions talk to each other at turn boundaries          | yes   |
| `worktree-awareness`        | Say which checkout a session is in, and who else is in it                     | yes   |
| `build-concurrency-guard`   | Notice uncapped build concurrency and say what capping it looks like          | yes   |
| `monorepo-package-validate` | After an edit, run that package's own check and report only failures          | yes   |
| `hook-contract-matrix`      | Report which lifecycle hook events a runtime actually delivers                | yes   |
| `rule-enforcement-audit`    | Report which written agent rules are actually enforced                        | no    |
| `agent-rule-projection`     | Keep one rule source per package and project it into each agent's filename    | no    |
| `spec-conformance`         | Make an existing pile of design documents navigable                           | no    |
| `spec-authoring`            | Write plans, sources of truth and decision records as three distinct things   | no    |
| `agent-prompt-discipline`   | What belongs in a tool-using agent's prompt, and the symptom of each omission | no    |
| `pmcp`                      | Serve the skills your installed packages ship, one at a time, over MCP        | no    |
| `product-planning`          | Spar on ideas, frame problems, synthesize feedback, rank a backlog, write a Korean PRD | no    |
| `content-ai`                | Korean product copy to the Toss writing principles, Naver blog posts for search | no    |
| `monetization`              | Prices framed as testable hypotheses before anyone builds a pricing page       | no    |
| `kr-legal`                  | AI-generated content and ads labelled per platform and current Korean rules   | no    |
| `data-analytics`            | SQL, metrics and retrieval ranking with language slices and latency evidence   | no    |
| `brand-assets`              | Visual directions, brand tokens, and QA of rendered assets                    | no    |
| `image-assets`              | OG share images rendered from HTML with Korean text and fonts handled         | no    |
| `social-carousel`           | Carousel copy with one ask, and slides rendered and exported after approval   | no    |
| `presentation`              | Deck storylines built from the answer down, one claim per slide               | no    |
| `audio-production`          | Scripts written for the ear; speech mixed and normalised to a measured target | no    |
| `skill-factory`             | Write agent skills evals first, with descriptions that trigger correctly      | no    |
| `agent-session-craft`       | Status briefings, follow-up waves, subagent fan-out and living documents for long sessions | no    |
| `academic-research` | Verify AI-suggested papers, citations and measures before they enter your notes, and check a recommended structure entry for the named ligand against the pasted record | no |
| `ux-research` | Index interview transcripts by theme and timestamp; quotes audited against the source | no |
| `education` | Reading passages at a measured grade level; language drills that stay in one dialect | no |
| `localization` | Translation post-edit checks and subtitle limit checks reported by segment or cue id | no |
| `legal-ops` | Draft billing time entries that follow the client's pasted guidelines, each change tied to a rule | no |
| `real-estate` | Listings screened against must-haves, room layouts checked, tenant dispute records arranged with no legal conclusions | no |
| `sales-ops` | Promised follow-ups recovered from sent email; CRM fields and follow-ups filled only from call transcripts | no |
| `software-qa` | Test cases traced to the change: gaps and duplicates listed, automation proposed for approval | no |
| `accessibility` | Images, charts and screens read for blind and low-vision users: text first, uncertainty marked; alt text drafts reviewed against caption, link target and exported page | no |
| `data-engineering` | Migrated or rewritten SQL proven equal to the original: statement map, two-way key diffs, seeded-difference test; many similar lab workbooks merged with per-file row reconciliation | no |
| `interactive-web-demos` | Browser simulations checked against a reference result, timestep convergence and measured frame time; assistant-built demos made portable with a clean-browser test | no |
| `asset-3d-vfx` | Blender scenes checked against planned dimensions, state collisions, a reference render and web budgets | no |
| `food-service` | Pasted recipes copied to a card unchanged; swaps and appliance changes logged as marked estimates | no |
| `home-hobbies` | Chess and board-game state kept legal with rules cited; crochet and knit stitch counts recomputed with every part joined; product labels read as written; garden plans checked against site facts, plant photo identification with toxic lookalikes named, pesticide label rates and intervals converted to your area | no |
| `everyday-support-boundaries` | Keep a support conversation inside the scope the user chose: no diagnosis, no reframing, only their own step list | no    |
| `events-travel`             | Day plans from fixed times, opening hours, travel legs and protected rest, with backups | no    |
| `agent-governance`          | Audit an unattended agent's permission setup: approval branches, denied retries, credentials, artifact checks | no    |
| `ml-data` | Fine-tuning data checked against the target schema before training: content types, one record per example, reload counts, tool-call turns; bounding-box annotations converted between formats with the source form stated | no |
| `bioinformatics` | Analysis pipeline refactors proven equal: baseline, step map, tolerances, explained and unexplained differences | no |
| `household-admin` | Pay-period schedules from your own numbers, every dollar placed once, arithmetic only; trading journals and insurance paper trails checked | no |
| `procurement` | Spend projection with ledger reconciliation, dedicated lane cost models, provisional freight classification, verified vendor shortlists, purchase-request intake and stage checks, ERP navigation with verification notes (freight classification and ERP navigation rest on one and three weak records) | no |
| `gis` | Raster NoData and scaling, geometry repair and merges, label and view expressions, slope areas from contours, tool substitution; CRS and units stated | no |
| `engineering` | Work instructions from field notes, verbatim clause location with edition, sourced datasheet spec tables, fault evidence logs that name no root cause, device config files built from a pasted register table (rest on one to four weak records) | no |
| `hr-ops` | Sourcing strings built from stated job requirements without protected-trait terms (one single-person report) | no |
| `photography` | Check a photo cull or batch grade from the scores and logs you supply: criteria per subject, rank and flag only, preview versus export; stock-site metadata and CSV checked against the destination's limits | no |
| `it-ops` | Safe patch-back of a fix made on an anonymized script copy, with no real value sent to a model; one-record evidence | no |
| `genealogy-research` | Surname mention index across volumes with gaps and same-name risk, uncertain handwriting readings, tree-export date and relationship checks, evidence-separated ancestor sheets, and search plans that fix the historical jurisdiction first | no |
| `design-delivery` | A wireframe mapped to design-system components with missing ones flagged and tokens kept (one weak record) | no |
| `finance-ops` | Statement rows tied out to balances, documents named from evidence and cash flow bridged by driver; supplied figures only, no advice (two skills, each on two reports) | no |
| `healthcare-admin` | Clinician notes placed into a required template with nothing added: empty fields marked NOT DOCUMENTED, model wording listed (rests on two weak records) | no |
| `construction` | Inspection findings and warranty narratives split into one item per finding, routed by trade, unclear trades flagged, counts reconciled (rests on two first-person reports) | no |
| `commerce` | Second-hand items identified from photos as ranked candidates with photos to request; authenticity and value not claimed (rests on one first-person report) | no |
| `fitness` | Workout logs tabulated, equipment substitutes by movement pattern, load changes left to a trainer; macro targets, wearable exports and running plans checked by arithmetic | no |
| `publishing-production` | Typeset text diffed against the approved manuscript by page and edition; print and EPUB checked against separate rules; automated accessibility results paired with manual items left unverified; house style sheets applied, index locators checked against proofs, series continuity and treatment causality reviewed | no |
| `pr-comms` | Media targets and pitch angles checked against pasted pages; press-release facts and quotes routed to a named approver; interview briefs with stale figures flagged | no |
| `everyday-readings` | Numerology, chart and spread inputs computed only from the rules you name; tarot spreads read by position from a recorded draw; reading journals counted for patterns and echoes; reflection only with no predictions | no |
| `agent-orchestration` | Subagent coordination: delegation sizing, briefs and hand-backs, partitioned writes and merge, claim verification, fair eval comparisons, fan-out scripts | no |
| `datalab-tools` | Naver blog, Place, store, shopping, ad and comment data read through the datalab.tools extension; card news, video and posts built in its editors with no invented numbers | no |
| `trust-safety` | Abuse detection that can be trusted: signals ranked by how abusers work and how cheaply they could evade, rules measured on labelled data before they act, and appeals that restore what a false... | no |
| `growth-community` | Growth and community work: store listings written for the people searching that store, Discord servers run with structure and consistent moderation, newsletters readers open and finish, a month of... | no |
| `platform-review` | Reviews of platform pieces that fail in production for configuration reasons: Cloudflare Worker bindings, Manifest V3 extension lifecycles, Chrome Web Store policy before submission, MCP tool design... | no |
| `operations-cs` | Customer operations: Korean support tickets triaged with incidents spotted across them, status updates that say what is affected and when the next update comes, read-only runbooks for on-call, and... | no |
| `runtime-bridge` | Check allowance, delegate bounded jobs across runtimes, research with cited reports, route costs and verify second opinions | no |
| `video-production` | Video work that can be executed and verified: briefs and storyboards someone else can produce from, Remotion explainers rendered from frame math, talking-head edits with ffmpeg that keep a list of... | no |

## Trust

All four plugin surfaces load skills. Hooks run in Claude Code and Codex CLI
only; the table above says which plugins that limits.

Every runtime here gates hooks behind an explicit trust step, because a hook
runs commands on your machine. Codex asks in its interactive session, Grok wants
`--trust`, and Gemini confirms before linking. Read a plugin's hooks before you
trust them; each plugin's README states what it writes and where.

Codex skips untrusted hooks silently when it is not attached to a terminal, so a
plugin that seems to do nothing in a script has probably never been trusted.

## Conventions

- One plugin is one directory under `plugins/`.
- Plugin scripts are plain Node with no dependencies and no build step.
- Every plugin README states its failure direction: whether it blocks when it
  cannot decide, or gets out of the way.
- Every skill's frontmatter follows `schema/skill-metadata.v1.json`: tier, level,
  domain and install are required, and the per-tier rules sit in the same file.
  `node scripts/check-skills.mjs . --catalog <other tier>...` enforces it, and
  `node --test scripts/skill-rules.test.mjs` covers each rule with a failing case.
- `metadata.verified-runtimes` (optional, inline list of `claude-code`, `codex-cli`,
  `gemini-cli`, `grok-cli`, `antigravity`) names the runtimes with a both-arm eval row
  in the plugin README where the skill fired, With is 1.00 and Without is below 1.00; absent means untested
  or not passing. `node scripts/verified-runtimes.mjs <marketplace> --write` derives it
  from the README tables, `--check` reports drift, and `check-skills.mjs` fails a claim
  no README row supports and only warns about an omission.
- A plugin with skills ships `evals/` cases for `claude plugin eval`, and its
  README reports the measured scores with and without the plugin.
- A plugin release passes `node scripts/release-gate.mjs plugins/<name>`, which runs
  the whole suite with `--no-publish` under a cost cap (or reads a result with
  `--from`) and refuses fewer than three cases, a skill without a positive case, a
  skill that did not fire (or fired on a negative case) in any run, and a mean
  delta of zero or below.

## License

MIT
