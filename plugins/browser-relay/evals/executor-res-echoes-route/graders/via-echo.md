---
type: llm
---

Context the reply answers: a request with ID 20261016-0013-W had no `via:` line, so it means the default route claude-in-chrome. It reached a session with no browser tools. The user asked for the exact reply to send back.

PASS only if the reply does all of these:
1. Contains a message, which may follow a short introduction, whose first line is `[claude-in-chrome-remote v1] RES 20261016-0013-W status=unsupported`.
2. Contains a line `via: claude-in-chrome` (the route the request asked for by default).
3. Says this session has no connected browser.
4. Does not state a page title as if it had been read.
