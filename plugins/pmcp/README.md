# pmcp

## What it does

Registers the `pmcp` MCP server, which reads `SKILL.md` files out of `node_modules`
and plugin marketplaces and serves them as five tools, so a session pays for the one
skill it opens rather than for the whole catalog. It also ships the
`skill-catalog-navigator` skill, which teaches the agent the order to use them in.

A package can carry usage documentation an agent could read. Once a project has a
few hundred dependencies, nobody knows which ones did. This finds them.

| Tool            | Takes                                 | Answers                              |
| --------------- | ------------------------------------- | ------------------------------------ |
| `skill_catalog`  | a page, optionally a tier             | each skill's name, description, tier |
| `skill_find`     | a sentence, optional filters          | the few skills that match, ranked    |
| `skill_describe` | a skill name                          | its metadata and files, no body      |
| `skill_call`     | a skill name                          | that skill's full body               |
| `skill_read`     | a skill name and a file path          | one reference file, as text          |

## Runtime support

| Runtime     | Supported | Measured on                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| Claude Code | yes       | not measured per runtime; the server answered MCP `initialize` |
| Codex CLI   | yes       | not measured per runtime                                      |
| Gemini CLI  | yes       | not measured per runtime                                      |

Any MCP host that runs a stdio server can use it. What was measured: `npx -y
@modootoday/pmcp`, with no npm credentials, answered MCP `initialize` as `pmcp`
0.1.4 (20260930), and 0.2.0 listed this marketplace's skills from a Claude Code
marketplace clone (20261004).

Only the Claude Code manifest (`.mcp.json`) passes `--marketplace`. Claude Code
copies an installed plugin to `plugins/cache/<marketplace>/<plugin>/<version>`
and keeps the marketplace clone at `plugins/marketplaces/<marketplace>`, so the
manifest points four levels up from the plugin root. If a later Claude Code moves
either directory, the server logs `no .claude-plugin/marketplace.json here` on
stderr and serves the `node_modules` skills only. The Gemini manifest still serves
`node_modules` skills only.

## Install

```
claude plugin marketplace add modootoday/marketplace
claude plugin install pmcp@modootoday
```

Gemini installs from the repository directly:

```
gemini extensions install https://github.com/modootoday/marketplace
```

Without a plugin, any MCP host takes the server as configuration:

```json
{
  "mcpServers": {
    "pmcp": { "command": "npx", "args": ["-y", "@modootoday/pmcp"] }
  }
}
```

## What it registers

| Kind       | Name   | Detail                                        |
| ---------- | ------ | --------------------------------------------- |
| MCP server | `pmcp` | `npx -y @modootoday/pmcp@^0.2.0 serve --marketplace <this marketplace>`, stdio, five tools |
| Skill      | `skill-catalog-navigator` | search, check, load, in that order |

Two manifests, one skill, and no code. The server is the `@modootoday/pmcp` package on npm, and
this plugin only tells your agent to run it. The name is scoped on purpose: an
unscoped `pmcp` does not exist on npm, and a manifest that ran it would run whatever
someone later published under that name.

## Failure mode

If npm cannot be reached the first time, the server does not start and the host
reports a failed MCP server. Nothing else in the session depends on it.

## Configuration and how to disable

Uninstall the plugin, or disable the `pmcp` server in your host's MCP settings. The
server takes `--root <node_modules>`, repeated `--scope <prefix>` to narrow what it
reads, and repeated `--marketplace <dir>` to add plugin marketplaces; add them to the
manifest's `args` if you need them.

## Data written

None by this plugin. `npx` downloads `@modootoday/pmcp` into its cache on first run.
The server reads `SKILL.md` files under `node_modules` and in the marketplace clone
your host already downloaded; reading them needs no login.

## Verify

```
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"probe","version":"0"}}}' | npx -y @modootoday/pmcp
```

It answers with `"serverInfo":{"name":"pmcp", ...}`.

The navigator skill has an eval suite that runs against mocked pmcp tools
(`evals/mocks/pmcp/`, with the server's real tool list in `_tools.json`), so no server or
network is needed: `claude plugin eval plugins/pmcp --no-publish`. Measured 20261004 on
Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that passed every
grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `arithmetic-negative` | negative: the catalog must not be searched | 1.00 | 1.00 | 2 |
| `empty-search-no-invention` | skill-catalog-navigator | 0.67 | 1.00 | 2 |
| `find-then-load` | skill-catalog-navigator | 0.00 | 1.00 | 2 |

With the plugin, the model searched before loading, loaded the exact name the server
returned, and on an empty search read the catalog instead of inventing a skill.

## Security

The server reads documentation that your installed packages ship and hands it to
your agent's context. A dependency's `SKILL.md` is text written by that package's
author, so treat it as you would any third-party instructions.

## License

This plugin is MIT, like the rest of this marketplace. It contains no `pmcp` code; it
names the package.

The `@modootoday/pmcp` package itself is under the Elastic License 2.0, which is
source-available rather than OSI-approved open source. Running it locally as an MCP
server is use; offering it to third parties as a hosted or managed service is what that
licence forbids.
