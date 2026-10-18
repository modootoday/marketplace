---
name: toolchain-equivalence-pilot
description: Run or review a formatter, bundler or application build-tool replacement pilot against consumer and output contracts before adoption. Use when a faster tool is proposed, normalized ASTs match or runtime tests pass but artifact parity is uncertain. Not for a site hosting migration, source-wide restyling or choosing a tool from popularity.
metadata:
  tier: open
  level: L3
  domain: build-tooling
  install: optional
  version: 0.1.0
  keywords: [toolchain pilot, formatter, bundler, declarations, SSR]
  verified-runtimes: [codex-cli]
---

# Toolchain equivalence pilot

Keep the current tool a valid outcome. Confirm which tool is changing, the
actual consumers, configuration scope and the user's acceptance budgets. A pilot
request permits its scoped checks, not unrelated source restyling or deployment.

1. Freeze equivalent inputs, resolved versions and relevant configuration. Use
   representative owned copies/output directories so leftovers cannot create
   parity. Respect shared cache custody. Record ignored/unsupported inputs rather
   than silently comparing different file sets.
2. Read only the relevant mode:
   - Formatter: [formatting contracts](references/formatting-contracts.md).
   - Library bundler or application build tool:
     [build artifact contracts](references/build-artifact-contracts.md).
     Do not import formatter checks into an application upgrade or require browser
     checks for a library with no browser consumer.
3. Predefine correctness and performance/size acceptance criteria. Compare
   repeated equivalent cold/retained-state/warm conditions separately. A single
   pair remains a single pair, and file-processing speed is not automatically
   staged-hook or end-to-end build latency. Report failures and host conditions.
4. Classify differences: intended changes, harmless representation changes with
   consumer evidence, broken contracts and unverified gaps. Runtime tests or
   normalized AST equality alone cannot settle every output contract. An existing
   warning shared by both arms is not automatically a new regression.
5. Choose adopt, keep or hold against the user's actual budgets. A faster build
   that violates a required compressed-size budget remains a hold even if raw
   size shrinks. If adopted, change the narrow invocation/configuration boundary,
   check its real integration, and retain a clear rollback before expansion.

Return the compared scope, contract/difference matrix, correctness evidence,
state-specific timings, raw/compressed sizes where relevant, decision and the
smallest missing check. Label unexecuted checks and untested consumers explicitly.
