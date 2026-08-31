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

Gemini CLI has no marketplace. Clone this repository and link a plugin
directory:

```
gemini extensions link <repo>/plugins/<plugin>
```

## Plugins

| Plugin                    | What it does                                                                     | Hooks |
| ------------------------- | -------------------------------------------------------------------------------- | ----- |
| `agent-guardrails`        | Refuse shell commands whose damage is hard to undo                               | yes   |
| `llm-peer-bridge`         | Let two running agent sessions talk to each other at turn boundaries             | yes   |
| `build-concurrency-guard` | Notice uncapped build concurrency and say what capping it looks like             | yes   |
| `hook-contract-matrix`    | Report which lifecycle hook events a runtime actually delivers                   | yes   |
| `agent-rule-projection`   | Keep one rule source per package and project it into each agent's filename       | no    |
| `spec-authoring`          | Write plans, sources of truth and decision records as three distinct things      | no    |

## Trust

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

## License

MIT
