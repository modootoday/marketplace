---
name: mv3-extension-review
description: Review a Chrome Manifest V3 extension's architecture - a service worker that can be killed at any time, state that survives it, messaging between contexts, content scripts isolated from the page, permissions and host access kept minimal, and no remote code - before release. Use when building or reviewing a Manifest V3 extension, migrating from V2, or debugging an extension that stops working after idle. Not for store listing or policy review.
metadata:
  tier: open
  level: L3
  domain: browser-extension
  install: optional
  keywords: [Manifest V3, Chrome extension, service worker, content script, extension messaging]
---

# Manifest V3 extension review

The service worker is not a background page: Chrome stops it after a short idle
time and starts it again on the next event. Most MV3 bugs come from code that
assumes it stays alive.

## Service worker

- No in-memory state that must survive: put it in `chrome.storage` (session or
  local) and read it back on each event.
- Register every event listener synchronously at the top level, so a restarted
  worker receives the event that woke it.
- Timers: use `chrome.alarms`, not `setTimeout`/`setInterval`, for anything
  beyond a few seconds.
- Long work: keep it short per event, or move it to an offscreen document where
  that is allowed for the use case.

## Messaging and contexts

- Messages between popup, content scripts and the worker can arrive when the
  other side is gone; handle a missing receiver and time out.
- Content scripts run in an isolated world: they share the DOM with the page,
  not its JavaScript. Treat everything read from the page as untrusted input.
- Validate the sender of every message the worker acts on.

## Permissions and code

- Each permission and host match tied to a feature; prefer `activeTab` and
  optional permissions.
- No remote code: everything executed ships in the package; remote data is
  fine.
- Content security policy left at a strict value.

## Test the lifecycle

Stop the service worker from the extensions page and repeat each flow; leave the
browser idle and repeat; update the extension while a flow is running.

## Output

Findings with file and line, the failure each causes, and the fix.
