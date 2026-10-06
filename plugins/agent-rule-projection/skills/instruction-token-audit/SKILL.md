---
name: instruction-token-audit
description: Measure agent instruction files - root and per-package AGENTS.md or CLAUDE.md, rule files, skill metadata - in tokens through the provider's token-counting endpoint, report the distribution and the bytes-per-token spread, and convert existing byte budgets to token equivalents. Use when sizing or budgeting agent rule files, asking how much context instruction files cost, or setting a size limit for AGENTS.md. Not for counting tokens of a single prompt or estimating API cost of a conversation.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [token count, AGENTS.md size, context budget, instruction files, bytes per token, rule file budget]
  verified-runtimes: [claude-code]
---

# Measuring instruction files in tokens

Budgets on rule files are usually written in bytes because bytes are easy to count. The model
pays in tokens, and the ratio is not constant: Korean, Japanese or Chinese text can cost several
times more tokens per byte-equivalent of meaning than English, and code differs again. A byte
budget that fits an English file can let a Korean one cost far more.

## Steps

1. Enumerate the files that load into context: the root instruction file, every per-package
   `AGENTS.md` or `CLAUDE.md`, path-scoped rule files, and the name and description of every
   skill (the part that loads on every session).
2. Count each file with the provider's token-counting endpoint for the model in use (for
   Anthropic, `POST /v1/messages/count_tokens`). Do not estimate with a characters-per-token
   rule; the spread across languages is the thing being measured.
3. Read the API key from the project's env file inside the script. Never print it, echo it or
   pass it on a command line; check that it is present by its length only.
4. Subtract the endpoint's fixed overhead: count an empty or one-word message once and take it
   off every file.

## Report

- Distribution per file group: count, min, median, p90, max tokens, and the total that loads at
  session start.
- Bytes per token per file, with the min and max named, and the language mix that explains the
  spread.
- Each existing byte budget converted to its token equivalent at the measured ratio for that
  file group, and which files are within the byte budget but large in tokens.
- The date and the model the counts were taken with. Token counts change with the tokenizer, so
  an undated count is not a measurement.
