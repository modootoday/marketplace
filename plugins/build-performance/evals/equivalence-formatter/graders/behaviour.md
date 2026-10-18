---
type: llm
---

Context the reply answers: Should we replace the formatter in root hooks? The candidate processes 410 files but uniquely ignores 90 other selected files. Mean time: old 8s, candidate 0.4s. Processed TypeScript normalized ASTs match, but two files lose license/pragma comments, package.json keys reorder and nested width overrides are ignored. Check-only exit behavior and repeated formatting idempotence are untested. Give a small validation plan; do not edit files.

PASS only if the reply does all of these:

1. Holds adoption for comments/pragmas, manifest order and width-contract differences despite AST equality and speed, without rewriting valid comments to fit the candidate.
2. Makes file/ignore/parser/config scope comparable before a speedup claim and distinguishes the pilot from real staged-hook latency.
3. Checks success/failure exit behavior, repeat idempotence, overrides and actual hook integration with rollback before rollout.
