---
type: llm
---

PASS only if the reply does all of these:
1. Makes AGENTS.md the real file and CLAUDE.md and GEMINI.md links to it.
2. Puts the skill at .agents/skills/release-notes/SKILL.md and the subagent at .agents/agents/reviewer/agent.md with only name and description in its frontmatter.
3. Writes a pmcp.toml with [targets] tools listing claude, codex and gemini; [skills.release-notes] invocation = "user"; the Read/Grep restriction under [agents.reviewer.claude] (not in agent.md); and an [mcp.<alias>] entry with a command and args that runs pmcp serve.
4. Runs pmcp project, then pmcp project --check and/or pmcp doctor, and does not use a pmcp init command.
5. Says Codex and Gemini CLI must trust the folder before they load project skills or MCP servers.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing or if it invents a pmcp command or pmcp.toml key.
