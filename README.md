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
| `monetization`              | Toss Payments integration checked against the docs; refunds and disputes done once | no    |
| `kr-legal`                  | Personal data and crawling reviews against current Korean law                 | no    |
| `data-analytics`            | SQL, metrics and retrieval ranking with language slices and latency evidence   | no    |
| `brand-assets`              | Visual directions, brand tokens, and QA of rendered assets                    | no    |
| `image-assets`              | OG share images rendered from HTML with Korean text and fonts handled         | no    |
| `social-carousel`           | Carousel copy with one ask, and slides rendered and exported after approval   | no    |
| `presentation`              | Deck storylines built from the answer down, one claim per slide               | no    |
| `audio-production`          | Scripts written for the ear; speech mixed and normalised to a measured target | no    |
| `skill-factory`             | Write agent skills evals first, with descriptions that trigger correctly      | no    |
| `agent-session-craft`       | Status briefings, follow-up waves, subagent fan-out and living documents for long sessions | no    |

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
- A plugin with skills ships `evals/` cases for `claude plugin eval`, and its
  README reports the measured scores with and without the plugin.
- A plugin release passes `node scripts/release-gate.mjs plugins/<name>`, which runs
  the whole suite with `--no-publish` under a cost cap (or reads a result with
  `--from`) and refuses fewer than three cases, a skill without a positive case, a
  skill that did not fire (or fired on a negative case) in any run, and a mean
  delta of zero or below.

## License

MIT
