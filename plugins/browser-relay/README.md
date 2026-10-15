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
  ListAgents under the name of the folder it was started from plus a changing
  suffix (for example `browser-bridge-b0`), not under `--name`. The skills match a
  row whose name is the wanted name or starts with it and a dash, so start the
  server from a folder named for the role, and tell a session "use <name>" when
  the default `browser-bridge` is not what you called it.
- Messages between sessions reach only sessions of the same claude.ai account.
  They pass through Anthropic's servers. This is not a remote execution API.
- A session started with `--chrome` on a machine with no browser of its own can
  still see a browser the account has connected elsewhere. Run
  `claude-in-chrome-remote-ops status` to see what a session can reach.

## Message format

One task per message. The first line identifies it.

```
[claude-in-chrome-remote v1] REQ 20261016-0001-A
task: one sentence
url: starting address
expect: the data you want back and its format
limits: for example read-only, at most 5 minutes
```

The answer is `RES` with the same ID and a status: `ok`, `needs_user`,
`blocked`, `error`, `version_mismatch` or `unsupported`. A `HANDOFF` passes
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

`claude plugin eval plugins/browser-relay` runs six cases that need no browser:
the request format, reporting when no route exists, an unsupported answer, a
sign-in that needs a person, the status report, and a plain request that must
not fire any of the skills.

Not covered by an eval: reading an answer message and its status table in the
relay skill. A case for it did not make the skill fire reliably, so that part is
documented behavior, not measured behavior. The no-route case passes with and
without the plugin, so it only guards against regressions.

Measured on Claude Code 2.1.301 with `--model sonnet --judge-model sonnet`, two runs
per case and arm, run on 2026-10-15. The release gate passes with a mean delta of
0.80 across the five positive cases.

| Case | Without | With | Fired |
| --- | --- | --- | --- |
| `req-to-bridge-session` | 0.00 | 1.00 | 2/2 |
| `executor-without-browser-unsupported` | 0.00 | 1.00 | 2/2 |
| `executor-sign-in-needs-a-person` | 0.00 | 1.00 | 2/2 |
| `no-route-reports-without-acting` | 1.00 | 1.00 | 2/2 |
| `ops-status-report` | 0.00 | 1.00 | 2/2 |
| `plain-summary-no-skill` (negative control) | 1.00 | 1.00 | 0/2 |

The table is the run on commit b254c91 (6 cases, cost 0.88 USD). The no-route
case scores 1.00 without the plugin in this run, so it guards against
regressions and is not evidence of an effect. An earlier run on the previous
commit scored `ops-status-report` 0.50 with the plugin, so that status format
varies between runs.

## License

MIT
