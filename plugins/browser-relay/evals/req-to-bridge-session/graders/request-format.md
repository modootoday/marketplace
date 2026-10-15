---
type: llm
---

Context the reply answers: the user asked the agent to write the message it would send to a session named browser-bridge, asking it to read the main heading of https://example.com read-only, without signing in, within 3 minutes. No tool was to be run.

PASS only if the reply does all of these:
1. Shows one message addressed to browser-bridge.
2. The first line of that message begins with `[claude-in-chrome-remote v1] REQ` followed by an ID made of eight digits, a dash, four digits, a dash and one capital letter (for example `20261016-0001-A`).
3. The message has `task:`, `url:`, `expect:` and `limits:` lines, the url is https://example.com, and `limits:` says read-only and no sign-in and mentions the 3 minute limit.
4. The message asks for one task only and contains no password, cookie or token.
