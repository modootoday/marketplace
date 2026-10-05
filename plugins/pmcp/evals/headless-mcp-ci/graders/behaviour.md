---
type: llm
---

PASS only if the reply does all of these:
1. Uses mcp__docs__search for Claude Code (not the bare tool name) and pins --permission-mode default or otherwise does not rely on the runner's defaultMode.
2. Uses --allowed-tools mcp_docs_search for Gemini CLI (single underscores), with --allowed-mcp-server-names docs, and mentions the folder must be trusted.
3. Uses --allow docs__search for Grok (not mcp__docs__search), and says the ~/.claude/settings.json defaultMode auto overrides Grok's own permission settings so it must be removed from the runner home, and that a deny rule such as --disallowed-tools cannot be relied on.
4. Replaces the exit-code check with an assertion that the tool was actually called (expected output or a proxy log).
5. Adds pmcp project --check and pmcp doctor to the job.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing or a flag spelling above is wrong.
