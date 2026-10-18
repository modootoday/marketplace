---
name: build-benchmark-controls
description: Design or review build-runner benchmark controls, including cold cache layers, forced execution with retained outputs, warm reuse and resolved root-dependency changes. Use when comparing build runners, auditing a cold speedup or choosing invalidation controls. Not for general code profiling, model-serving benchmarks or auditing cache implementation.
metadata:
  tier: open
  level: L3
  domain: build-tooling
  install: optional
  version: 0.1.0
  keywords: [build benchmark, cold build, invalidation, runner comparison]
  verified-runtimes: [codex-cli]
---

# Build benchmark controls

Produce a comparison whose cache state and actual work can be reproduced. Use
the supplied commands and evidence; a review does not imply permission to run
builds or delete caches. Missing observations remain unmeasured.

If essential inputs are absent and the user asks only for minimum information,
request the actual runners/commands/graph, cache/output/compiler states,
environment constraints and acceptance criteria. Stop at that request; do not
substitute a full benchmark protocol or prescribed state for missing facts.

1. Fix revision, resolved dependencies, task graph, tool versions, environment,
   resource limits and acceptance criteria before comparing runners. Check that
   both execute real equivalent targets rather than stubs with matching names.
2. Name each state by what remains, not by a runner flag:

   | State                    | Evidence required                                                                                                                |
   | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
   | Warm                     | Same inputs, reusable outputs and named local/remote caches                                                                      |
   | Local runner cache empty | Remote reads and output/compiler state explicitly recorded                                                                       |
   | Forced execution         | Cache read bypass verified; outputs and compiler incremental state recorded separately                                           |
   | Rebuild from source      | Isolated or cleared relevant outputs, runner caches and compiler incremental state; remote reuse disabled or separately measured |
   | Fresh environment        | Dependency download/install and environment preparation identified separately                                                    |

   A forced run retaining dist or compiler state is not evidence of a fresh
   rebuild. An empty local cache with remote hits measures restoration. Do not
   claim an OS-cold filesystem or dependency-download result without measuring it.

3. Include source, upstream and root tooling controls plus an unaffected target.
   For root dependencies, confirm the resolved tool/input actually changes and
   identify its consumers. A manifest edit leaving resolution unchanged, or an
   already identical transitive dependency, is not an invalidation positive
   control. Keep that attempt as invalid control evidence, not a speedup result.
4. Record cache decisions and executed targets as well as durations. Check the
   intended consumers rebuild and unaffected targets retain reuse. Compare
   artifact inventories/content and relevant tests before adopting an apparent
   gain; cache-hit counts alone do not prove comparable work.
5. Repeat comparable conditions with balanced/interleaved order and observed
   host load. Preserve every started attempt, failure, timeout and retry. Report
   per-state runs and spread; never average warm and cold together or silently
   exclude a failed run from the decision.
6. Separate dependency/environment setup, runner preparation/graph work, actual
   task execution and end-to-end elapsed time. Avoid summing overlapping task
   durations as wall time. State whether preparation is inside each reported
   total. Shared caches must be isolated or retained under their owner's rules.

Return a state/control table, measured versus unmeasured evidence, correctness
status, per-condition timing comparison and a keep/adopt/hold decision with the
smallest discriminating next experiment. A warm improvement cannot silently
waive a cold regression; use the user's actual acceptance criteria. For generic
profile/noise analysis, the existing performance experiment workflow remains
appropriate.
