---
type: llm
---

PASS only if the reply does all of these:
1. Merges CLAUDE.md and .cursorrules into one AGENTS.md that keeps both the npm test rule and the feature-flag rule (the union, not either file alone), and turns CLAUDE.md and .cursorrules into links to AGENTS.md.
2. Moves the reviewer to .agents/agents/reviewer/agent.md with only name and description, and puts tools and model in pmcp.toml under [agents.reviewer.claude].
3. Turns the release command into .agents/skills/release/SKILL.md with [skills.release] invocation = "user" in pmcp.toml.
4. Leaves the dated decision record's old citation unchanged, while updating the live script (scripts/lint-rules.sh) or keeping .cursorrules readable as a link.
5. Removes the hand-written .claude/agents/reviewer.md and .claude/commands/release.md before running pmcp project, and finishes with pmcp project --check.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing, or if a rule from either instruction file is dropped.
