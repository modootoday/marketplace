---
type: llm
---

Context the reply answers: in an empty directory, the user wants pmcp to set up shared instructions, one skill (release-notes, started only by a person), one subagent (reviewer, limited to Read and Grep in Claude) and pmcp itself as an MCP server, for a team mixing Claude Code, Codex and Gemini CLI. pmcp is a dev dependency in node_modules. The reply should give the files, the full pmcp.toml and the commands in order.

PASS only if the reply does all of these:
1. Makes AGENTS.md the real file and CLAUDE.md and GEMINI.md links to it.
2. Puts the skill at .agents/skills/release-notes/SKILL.md and the subagent at .agents/agents/reviewer/agent.md with only name and description in its frontmatter.
3. Writes a pmcp.toml with [targets] tools listing claude, codex and gemini; [skills.release-notes] invocation = "user"; the Read/Grep restriction under [agents.reviewer.claude] (not in agent.md; a string such as tools = "Read, Grep" is the valid form); and an [mcp.<alias>] entry whose command and args start the pmcp server with "serve" (node with the package's dist/cli.js path and "serve", or the pmcp bin with "serve"; a placeholder for the package name is fine).
4. Runs pmcp project, then pmcp project --check and/or pmcp doctor, and does not use a pmcp init command.
5. Says Codex and Gemini CLI must trust the folder before they load project skills or MCP servers.
6. Uses only these pmcp subcommands: project, project --check, doctor, serve. Uses only these pmcp.toml tables: [targets], [mcp.<alias>] (command, args, env, tools), [skills.<name>] (invocation), [agents.<name>.<tool>], [catalog].

Wording does not matter, and extra correct advice is fine. Any item missing means the reply fails.
