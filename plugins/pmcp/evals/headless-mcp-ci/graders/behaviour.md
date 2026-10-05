---
type: llm
---

Context the reply answers: a CI job runs Claude Code, Gemini CLI and Grok Build headless, each meant to call the search tool of a project MCP server named "docs". Claude used --allowedTools search, Gemini used --allowed-tools search and says "not available", Grok used --allow mcp__docs__search --disallowed-tools shell and exits 0 without calling the tool. The runner home holds another team's ~/.claude/settings.json with "defaultMode": "auto". MCP config is generated from pmcp.toml. The agent cannot run CI, so judge the fixed job it writes.

Reference for judging flag spellings: grok accepts --permission-mode default alongside --allow; pmcp doctor accepts --tool <name>, repeatable, to limit its checks; Gemini's folder trust lives in ~/.gemini/trustedFolders.json, so writing it under a fresh HOME counts as trusting the folder.

PASS only if the reply does all of these:
1. Uses mcp__docs__search for Claude Code (not the bare tool name) and pins --permission-mode default or otherwise does not rely on the runner's defaultMode.
2. Uses --allowed-tools mcp_docs_search for Gemini CLI (single underscores), with --allowed-mcp-server-names docs, and says the folder must be trusted.
3. Uses --allow docs__search for Grok (not mcp__docs__search); says the ~/.claude/settings.json defaultMode auto overrides Grok's own permission settings, so the job must keep that file away from the agents (delete it from the runner home or run with a separate, clean HOME); and says a deny rule such as --disallowed-tools cannot be relied on.
4. Replaces the exit-code check with an assertion that the tool was actually called (expected output or a proxy log).
5. Adds pmcp project --check and pmcp doctor to the job.

Wording does not matter, and extra correct advice is fine. Any item missing, or a flag spelling above that is wrong, means the reply fails.
