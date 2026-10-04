---
type: llm
---

PASS if the reply gives gitignore lines that ignore .env files and re-include .env.example with a
negation (for example `.env*` then `!.env.example`). FAIL otherwise.
