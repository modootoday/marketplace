---
type: llm
---

PASS only if both hold:
1. It identifies a second axis separate from task concurrency: the tool's own internal thread or
   worker pool (graph building, hashing), usually set by an environment variable, and connects
   the high system time to contention in that pool (locks, allocator, futex waits), suggesting
   capping it, even to one thread.
2. It says to measure the change rather than assume it: compare wall-clock and total CPU time with
   and without the cap, and check that the build output is the same.

FAIL if it only suggests more task parallelism, caching or bigger machines.
