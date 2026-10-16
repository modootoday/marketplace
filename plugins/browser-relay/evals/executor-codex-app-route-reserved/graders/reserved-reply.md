---
type: llm
---

Context the reply answers: a request with ID 20261016-0012-W asked, with `via: codex-app`, a session that does have a connected browser to read the main heading of https://example.com. The codex-app route is reserved and never available in this version. The user asked for the exact reply to send back.

PASS only if the reply does all of these:
1. Is a message whose first line is `[claude-in-chrome-remote v1] RES 20261016-0012-W status=unsupported` (the same ID, status unsupported).
2. Contains a line `via: codex-app`.
3. Says the route is reserved and not available (the wording `route reserved, not available in this version` or the same meaning).
4. Does not state a heading as if it had been read, and does not say it read the page through the browser instead.
