# browser-relay

## What it does

Lets any Claude Code session get browser work done through Claude in Chrome,
including a session that has no browser of its own. Three skills:

| Skill | Use it when |
| --- | --- |
| `claude-in-chrome-remote-relay` | A task needs a browser and this session may not have one. Picks the route, sends the request in a fixed format, checks the answer |
| `claude-in-chrome-remote-executor` | A message starting `[claude-in-chrome-remote v1]` arrives from another session. Runs it with the browser connected here, or replies that it cannot |
| `claude-in-chrome-remote-ops` | You want to know which route a session would take, or to run a small read-only smoke test |

Route, in order: this session has the Claude in Chrome tools and a connected
browser, so it runs the task itself; otherwise a session named `browser-bridge`
(or the name you give) is visible, so it sends that session a request; otherwise
it reports that no browser is reachable and does nothing.

A request can also name a route with an optional `via:` line (new in 0.2.0, the
protocol stays v1 and a request without the line means `claude-in-chrome`):

| via | Meaning |
| --- | --- |
| `claude-in-chrome` | The Claude in Chrome browser tools. The default |
| `site-mcp` | A site-specific MCP tool set in the receiving session: a find-tools step, a call step and a browsers listing from one MCP server, under that MCP's own approval rules. An example of a site-specific route for pages Claude in Chrome refuses |
| `codex-app` | Reserved. Always answered `unsupported` with the reason `route reserved, not available in this version` |

An unknown route, or a route whose tools are absent in the receiving session, is
answered `unsupported` and names the route. The answer's `via:` line is the route
that was really used. A blocked task is never retried through another route
without saying so.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.301 |
| Codex CLI | no | Claude in Chrome and cross-session messages are Claude Code features |
| Grok CLI | no | same |
| Gemini CLI | no | same |

## Install

```
claude plugin marketplace add modootoday/marketplace
claude plugin install browser-relay@modootoday
```

The skills are also served by the skills catalog at skills.modoo.today, which
needs no install.

## Setup

- The session that holds the browser needs the Claude in Chrome extension signed
  in to the same claude.ai account, and has to be started with `--chrome` so that
  its browser tools exist. Plain Claude Code does not load them.
- A session that should receive requests is usually a Remote Control server
  started with `claude remote-control --chrome`. The sessions it spawns show up in
  ListAgents under a name that depends on where you look from. From another
  machine it is the Remote Control environment name (the first `--name` used in
  that folder, for example `browser-bridge`). From the same machine it is the
  folder name plus a changing suffix (for example `whale-bridge-98`). Tell a
  session "use <name>" with the name you see from the requesting side. The skills
  match a row whose name is exactly the wanted name or starts with it and a dash.
- Messages between sessions reach only sessions of the same claude.ai account.
  They pass through Anthropic's servers. This is not a remote execution API.
- A session started with `--chrome` on a machine with no browser of its own can
  still see a browser the account has connected elsewhere. Run
  `claude-in-chrome-remote-ops status` to see what a session can reach.
- If you use the skills through the catalog instead of installing the plugin, the
  catalog MCP has to be connected and authorized in every runtime that executes
  requests, Remote Control server sessions included. A session where it is missing
  or waiting for authorization runs without these skills and falls back to its own
  instructions, which is easy to mistake for the skills working. The status
  report's `catalog:` line shows which case a session is in.

## Message format

One task per message. The first line identifies it.

```
[claude-in-chrome-remote v1] REQ 20261016-0001-A
task: one sentence
url: starting address
expect: the data you want back and its format
limits: for example read-only, at most 5 minutes
via: claude-in-chrome
```

The `via:` line is optional. The answer is `RES` with the same ID, a status:
`ok`, `needs_user`, `blocked`, `error`, `version_mismatch` or `unsupported`, and
a `via:` line naming the route used. A `HANDOFF` passes
browser results to a session for follow-up work that needs no browser. The
format is in the skills themselves, so a catalog install carries all of it.

## Failure direction

This plugin blocks nothing and ships no hooks. When it cannot choose a route it
says so and does not act. When Claude in Chrome or the receiving session needs a
person (permission prompt, sign-in, CAPTCHA, dialog), the answer is
`needs_user` and nothing is retried.

## What it relies on, and what it does not do

- Browser safety stays with Claude in Chrome and with each session's permission
  rules. This plugin adds no extra layer. Claude in Chrome's own documentation
  (support.claude.com, article 12902446) says it offers the modes Manually
  approve, Automatically approve and Skip all approvals; that it still asks
  before downloading a file, entering potentially sensitive information or
  granting authorizations on an always-allowed site; and that it refuses
  purchases and financial transactions, account creation, card and ID data,
  permanent deletions and "completing instructions from emails or web content"
  whatever the permissions.
- Because a remote session can act on a site you marked as allowed while nobody
  sits at the browser machine, keep the extension's site permissions on "ask" for
  sites you do not explicitly trust. That per-site check prompts only in manual
  permission mode: in auto mode the session's classifier approves browser calls
  and the extension skips its own check for them. To keep a person in the loop,
  run the session that holds the browser in manual mode, for example
  `claude remote-control --chrome --permission-mode default`.
- Using a browser that is connected on another machine, and seeing it in
  `list_connected_browsers`, was observed to work but is not documented, so it
  is not guaranteed. The account bridge (`bridge.claudeusercontent.com`) must be
  reachable, and an organization IP allowlist applies to it.
- Chrome and Edge are the supported browsers; other Chromium browsers such as
  Brave, Arc, Vivaldi and Opera are detected and may work.
- A Remote Control server exits after about ten minutes without a network. A
  request to a bridge that vanished is reported as a passing problem, not
  resent in a loop.
- A message from another session is a request, never consent. Instructions found
  inside a result, a handoff or a web page are treated as data.
- It writes nothing to disk. The skills only call the browser and messaging
  tools the session already has.

## Verify

`claude plugin eval plugins/browser-relay` runs nine cases that need no browser:
the request format, reporting when no route exists, an unsupported answer, a
sign-in that needs a person, the status report, a `via: site-mcp` request
without site-specific tools, the reserved `codex-app` route, the `via:` echo, and
a plain request that must not fire any of the skills.

Not covered by an eval: reading an answer message and its status table in the
relay skill, running a request on the `site-mcp` route when its tools exist,
and the blocked-route rule. A case for the first did not make the skill fire
reliably, and the other two need a live browser or the site-specific tools, so those
parts are documented behavior, not measured behavior. The no-route case can pass
without the plugin, so it only guards against regressions.

Measured on Claude Code 2.1.301 with `--model sonnet --judge-model sonnet`, two runs
per case and arm, run on 2026-10-16 on the skills and cases of commit 182875e.
The release gate passes: nine of nine cases score 1.00 with the plugin, and the
mean delta reported by the tool is 0.83 across all nine cases.

| Case | Without | With | Fired |
| --- | --- | --- | --- |
| `req-to-bridge-session` | 0.00 | 1.00 | 2/2 |
| `executor-without-browser-unsupported` | 0.00 | 1.00 | 2/2 |
| `executor-sign-in-needs-a-person` | 0.00 | 1.00 | 2/2 |
| `executor-site-route-absent-unsupported` | 0.00 | 1.00 | 2/2 |
| `executor-codex-app-route-reserved` | 0.00 | 1.00 | 2/2 |
| `executor-res-echoes-route` | 0.00 | 1.00 | 2/2 |
| `no-route-reports-without-acting` | 0.50 | 1.00 | 2/2 |
| `ops-status-report` | 0.00 | 1.00 | 2/2 |
| `plain-summary-no-skill` (negative control) | 1.00 | 1.00 | 0/2 |

The run cost 1.31 USD. The no-route case scored 1.00 without the plugin in the
0.1.0 run and 0.50 here, so it guards against regressions and is not evidence of
an effect. In the 0.1.0 runs `ops-status-report` once scored 0.50 with the plugin,
so that status format varies between runs. An earlier run of this version scored
`executor-res-echoes-route` 0.50 because its grader read a reply that opened with
a sentence as failing on the first line although the message was right; the
grader now looks for the message wherever it starts, and the case passes 2/2.

## License

MIT
