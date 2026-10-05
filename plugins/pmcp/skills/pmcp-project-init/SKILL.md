---
name: pmcp-project-init
description: Set up a repository so every coding agent reads the same instructions, skills, subagents, rules and MCP servers - one AGENTS.md with CLAUDE.md and GEMINI.md linked to it, sources under .agents/, a pmcp.toml with [targets] and an [mcp.*] entry, then pmcp project and pmcp doctor, plus the one-time trust step each agent CLI needs. Use when starting a new repository the pmcp way, adding pmcp to a repository that has no agent assets yet, or when asked to write a pmcp.toml. Not for moving existing scattered agent files (migrate them instead) or for hosting a skills server.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [pmcp, pmcp.toml, AGENTS.md, .agents, agent assets, project setup, MCP config, multi-agent repository]
  requires:
    bin: [pmcp]
---

# Starting a repository the pmcp way

pmcp 0.8 has no `init` command. You write the sources by hand; `pmcp project` writes every
tool's native files from them, and `pmcp doctor` asks each installed tool what it loads.
Never write the generated files yourself: pmcp refuses to overwrite a file it did not write.

Install the pmcp package as a dev dependency under the scoped name its documentation gives.
Never run an unscoped `npx pmcp`: that name is not the package, and whoever publishes it
later would run in your repository.

## 1. Instructions: one file, two links

```sh
printf '# <project>\n\n' > AGENTS.md
ln -s AGENTS.md CLAUDE.md
ln -s AGENTS.md GEMINI.md
```

`AGENTS.md` is the real file. Claude Code reads `CLAUDE.md` and Gemini CLI `GEMINI.md`, so
the links make them read the same text. pmcp does not create these links. Keep them
file-to-file links; a directory symlink at the repository root (for example `.agents`
pointing at another folder) is rejected by the Codex sandbox.

## 2. Sources under .agents/

| Path | Holds | Frontmatter |
| --- | --- | --- |
| `.agents/skills/<name>/SKILL.md` | a skill; `<name>` equals the frontmatter `name` | `name`, `description` |
| `.agents/agents/<name>/agent.md` | a subagent (directory form; a flat `<name>.md` is not read) | `name`, `description` only |
| `.agents/rules/<topic>.md` | a path-scoped rule | `trigger: glob`, `description`, `globs:` list |

Keep `tools`, `model` and other tool-specific fields out of `agent.md`: Antigravity drops
an agent whose `tools` names another tool's tools. Those fields go in `pmcp.toml`.

## 3. pmcp.toml

```toml
[targets]
tools = ["claude", "codex", "gemini", "grok", "antigravity"]

[mcp.skills]
command = "node"
args = ["${PROJECT_ROOT}/node_modules/<pmcp package>/dist/cli.js", "serve"]

[skills.release]
invocation = "user"

[agents.reviewer.claude]
tools = "Read, Grep"
model = "inherit"
```

Exact schema, as the 0.8 source reads it:

- `[targets] tools` - any of `claude`, `codex`, `gemini`, `grok`, `antigravity`. An unknown
  name is an error. A tool not listed gets no files.
- `[mcp.<alias>]` - `command` (required string), `args` (string list), `env` (table of
  strings), `tools` (string list; only Gemini uses it, as `includeTools`). The alias is
  lowercase letters, digits and `-`. A value naming `${PROJECT_ROOT}` is launched through
  `sh`, which finds the directory holding `pmcp.toml` at spawn time, so committed files
  carry no machine path.
- `[skills.<name>] invocation` - `"any"` (default) or `"user"`: the person starts it and the
  model is not offered it.
- `[agents.<name>.<tool>]` - fields merged into that tool's copy. Claude keeps `name`,
  `description`, `tools`, `model`, `effort`; Gemini keeps `name` and `description` only;
  Codex gets `name`, `description` and the body as `developer_instructions`.
- `[catalog]` - optional; `roots`, `scopes`, `workspaces`, `packages`, `marketplaces`, each a
  string list, paths relative to the file. An unknown key is an error.

## 4. Project and check

```sh
pmcp project          # write; exits 1 if it would overwrite a file it did not write
pmcp project --check  # write nothing; exit 2 on drift, stale, undeclared or dead-glob outputs
pmcp doctor           # exit 1 on any failed check; a tool not installed is skipped
```

`pmcp project` writes `.claude/skills/` and `.grok/skills/` links, `.claude/agents/`,
`.gemini/agents/`, `.codex/agents/*.toml`, `.claude/rules/pmcp/` (rules with `paths:`; never
top level, because Grok loads top-level `.claude/rules/*.md` unscoped), the MCP entry in
`.mcp.json`, `.gemini/settings.json`, `.agents/mcp_config.json`, a marked block in
`.codex/config.toml` and `.grok/config.toml`, and `pmcp.lock`. Commit the lock with the
outputs: `--check` reports a removed source's outputs as stale only from the lock.

Only Claude gets the rules. For the other tools, add one pointer row per rule to
`AGENTS.md` (path and when to read it).

## 5. Trust the folder in each tool

Codex, Gemini CLI and Grok Build skip project assets silently until the folder is trusted;
skills, MCP servers and agents just do not appear. Each developer does this once per tool:

| Tool | Where trust is recorded |
| --- | --- |
| Codex | `~/.codex/config.toml`: `[projects."<absolute path>"]` with `trust_level = "trusted"` |
| Gemini CLI | `~/.gemini/trustedFolders.json` |
| Grok Build | `~/.grok/trusted_folders.toml` |
| Antigravity | `trustedWorkspaces` in `~/.gemini/antigravity-cli/settings.json` |

`pmcp doctor` reports Codex and Grok trust directly (`project trusted`). Run it after
trusting, not before, or its failures only restate the missing trust.

## Report

The files written, the `pmcp project --check` exit code, the `pmcp doctor` table, and which
tools still need the trust step.
