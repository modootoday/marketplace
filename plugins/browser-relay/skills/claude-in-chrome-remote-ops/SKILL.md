---
name: claude-in-chrome-remote-ops
description: Report whether this session can do browser work through Claude in Chrome and which route it would take, or run a small read-only smoke test of that route. Use when asked to check the claude-in-chrome-remote setup, whether a browser session is visible, or to verify the route end to end.
metadata:
  tier: open
  level: L2
  domain: browser-automation
  install: optional
  keywords: [claude in chrome, browser, status, smoke test, remote control]
  approval: none
---

# Checking the claude-in-chrome-remote route

The argument is `status`, `smoke` or `setup-check`. With none, run `status`. This
skill only looks. It never edits settings and never reads credentials.

## status

Report these lines, each from something you actually checked this turn:

```
browser tools: present | absent
connected browsers: name, OS and whether it is local, one per line; or none
browser session: browser-bridge visible | not visible
route: direct | relay | none
routes:
  claude-in-chrome: yes | no
  site-mcp: yes | no
catalog: reachable | needs_auth | absent
```

- `browser tools`: look for `mcp__claude-in-chrome__*` tools, loading deferred
  ones with one ToolSearch call.
- `connected browsers`: call `list_connected_browsers` only if the tools exist.
- `browser session`: run ListAgents and look for `browser-bridge`, or the name
  the user gave. Match a row whose name is exactly that name or starts with it
  and a dash. The name depends on where you look from: from another machine it is
  the Remote Control environment name, from the same machine it is the folder name
  plus a changing suffix, so use the name your own ListAgents shows. Say which row
  matched.
- `route`: `direct` when a browser is connected here, else `relay` when the
  browser session is visible, else `none`.
- `routes`: the routes this session could run a request on, one line each.
  `claude-in-chrome` is `yes` when a browser is connected here. `site-mcp` is
  `yes` when a site-specific MCP tool set exists (see the executor skill); if it
  does, call its browsers listing (it only reads) and add its answer, otherwise
  write `no` and that the tools are absent. `codex-app` is reserved and is not
  listed.
- `catalog`: whether this session reaches the skills catalog, which matters when
  these skills came from the catalog and not from an installed plugin. Look for the
  tools of an MCP server that offers skill lookup (a find, a describe and a read
  step), loading deferred ones with one ToolSearch call. They are present and
  answer: `reachable`. Only an authenticate tool of such a server is present:
  `needs_auth`, and say a person has to authorize it in this runtime. No such
  server: `absent`, and say the skills came from an installed plugin or from the
  session's own instructions. Without the catalog, a request may be answered from
  the session's own instructions and not from these skills.

If a line could not be checked, write `unknown` and why. Do not guess.

If you can run `claude --version`, add a line `claude code: <version>`. Below
2.1.290 the "Reconnect extension" command only opens a page and does not restart a
failed connection, so say that when browser tools stop answering with "Receiving
end does not exist" or "Browser extension is not connected".

## smoke

1. Work out the route as in `status`.
2. `direct`: open a new tab in your own tab group, go to `https://example.com`,
   read `document.title`, close the tab you opened. The title should be
   `Example Domain`.
3. `relay`: send one request in the relay format asking the browser session to
   read the title of `https://example.com`, say the answer will arrive as a
   result message, and stop.
4. `none`: say so and stop.

Report what ran and what came back, including any prompt or error word for word.

## setup-check

Advice only, from what you know without reading any settings file:

- Claude in Chrome decides what a session may do on a site. Keep its site
  permissions on "ask" for sites you do not explicitly trust: with direct
  execution a remote session can act on an allowed site while nobody is at the
  browser machine.
- That per-site check only prompts in a session running in manual permission
  mode. In auto mode the session's own classifier approves browser calls and the
  extension skips its per-site check for them. When a person should stay in the
  loop, run the session that holds the browser in manual mode, for example with
  `claude remote-control --chrome --permission-mode default`.
- The session that holds the browser needs to be started with `--chrome` so its
  tools exist, and it must be able to receive messages from other sessions of
  the same account.
- Messages between sessions pass through Anthropic's servers and work only for
  one claude.ai account.
