---
description: What pmcp-project-init should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [pmcp-project-init]
---

새 저장소를 시작하는데 팀원들이 Claude Code, Codex, Gemini CLI를 섞어 써. pmcp로 지시문, 스킬 하나(release-notes, 사람이 직접 시작하는 것), 서브에이전트 하나(reviewer, Claude에서는 Read와 Grep만 쓰게), 그리고 pmcp 자체를 MCP 서버로 붙이고 싶어. pmcp는 dev dependency로 node_modules에 설치돼 있어. 만들 파일과 pmcp.toml 전체, 실행할 명령을 순서대로 알려줘. 지금 디렉터리는 비어 있으니 내용은 답에 직접 써 줘.
