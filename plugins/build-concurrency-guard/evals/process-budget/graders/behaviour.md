---
type: llm
---

Context the reply answers: Three agents each launch one build at task concurrency
1; host free24 GiB but shared process/container available5 GiB; each peaks3 GiB
and has an internal graph pool. A second machine has unknown process capacity.
The user requests parent policy and measurements, prohibiting command rewrites.

PASS only if:

1. Uses the tighter process/container budget and parent total fan-out, recognizing
   that three individually capped builds can exceed it; distinguishes task and
   internal pool limits instead of sizing from host RAM alone.
2. Uses a conservative documented unknown-limit policy with target measurement,
   without transplanting a universal worker count or silently rewriting commands.
3. Compares wall time, CPU/resource peaks and output equivalence under bounded
   alternatives before prescribing final parallelism.
