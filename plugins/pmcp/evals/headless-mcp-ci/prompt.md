---
description: What headless-agents-ci-scaffold should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [headless-agents-ci-scaffold]
---

CI에서 Claude Code, Gemini CLI, Grok Build를 headless로 돌려서 각자 우리 프로젝트 MCP 서버 "docs"의 search 도구를 한 번씩 호출하게 하고 싶어. 지금 스크립트는 아래인데 Grok은 항상 exit 0으로 끝나는데 로그를 보면 도구를 안 불렀고, Gemini는 "not available"이 떠. CI 러너 홈에는 다른 팀이 쓰던 ~/.claude/settings.json이 있고 거기 "defaultMode": "auto"가 들어 있어. 이 job을 고쳐 줘. pmcp.toml로 MCP 설정을 생성하고 있어서 그것도 CI에서 검사하고 싶어.

```sh
claude -p "Use docs search for 'refund' and print the first title" --allowedTools search
gemini -p "Use docs search for 'refund' and print the first title" --allowed-tools search
grok -p "Use docs search for 'refund' and print the first title" --allow mcp__docs__search --disallowed-tools shell
```
