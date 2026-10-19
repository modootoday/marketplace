---
name: concurrency-policy
description: Diagnose build or test resource contention and choose measured limits for parent fan-out, concurrent tasks and internal worker pools. Use for slow startup, loaded or shared hosts, memory budgets, or questions about how many workers to allow. Not for ordinary command syntax, selecting one test file, filtering test names or running a single test when no resource or concurrency problem is raised.
metadata:
  tier: open
  level: L1
  domain: build-tooling
  install: optional
  version: 0.1.0
  keywords: [build parallelism, test concurrency, shared host, slow builds]
  verified-runtimes: [claude-code, codex-cli]
---

# Concurrency on a machine an agent drives

A build tool's defaults assume one person, running one build, on an idle
machine. None of that holds when an agent starts builds: they arrive in bursts,
they overlap, and nobody watching decides to wait.

## More than one axis

Most build tools have at least two, and they are not the same knob.

**Task parallelism** — how many packages, targets or test files run at once.
This is the axis everyone knows and the one with a documented flag.

**The tool's own worker pool** — threads the tool uses internally to work out
what to run: building the dependency graph, hashing inputs, walking the tree.
Find its supported controls for the actual runner and version: they may be
environment variables, configuration or flags. Task-only profiles may omit it.

Capping tasks does not necessarily cap internal workers. When startup is slow,
profile that phase to distinguish workers, filesystem work and other overhead.

## The resource boundary

Use the tighter applicable host and process/container resource budget when both
are known. Host free RAM can overstate what a constrained process can use. If a
limit cannot be established, choose a conservative documented default and
measure; do not invent capacity. Keep explicit operator overrides visible.

State the actual unknown-limit fallback and how the parent enforces it, rather
than only saying conservative. A provisional single admitted build with minimal
supported workers is a fallback, not proof it fits; defer execution if even that
cannot be supported by observed headroom. Name what measurement permits raising it.

Account for the parent's total fan-out as well as each command's task and worker
pools. Several individually capped builds can still exhaust shared memory.
Observe per-task peaks and concurrent work before assigning the total budget;
do not carry one host's lane count or memory threshold into another project.

Apply a conservative admission limit immediately when known peaks would exceed
the available budget. That safety limit is provisional, not an optimized worker
setting. Compare only alternatives that remain within the known resource budget.

## When more threads make it slower

A thread pool helps only while the work is genuinely parallel. It hurts when the
threads contend for a shared resource, such as an allocator or filesystem lock.
Confirm the actual bottleneck; timing alone does not identify a lock or allocator.

The signature is easy to recognise once seen: wall-clock barely improves as
threads increase, system time climbs far faster than user time, and the process
spends its time in futex waits on a small number of addresses. When you see it,
capping the pool to one is a candidate experiment, not a guaranteed speedup.
Do not report futex waits, idle load, static linking or other observations unless
they were supplied or measured. Distinguish a suspected cause from a diagnosis.

## What to measure, not assume

Do not carry a number between machines. Measure the same stage twice, once with
the cap and once without, and compare four things:

- wall-clock, which is what people notice
- total CPU seconds, which is what a shared machine actually pays
- whole-process-tree peak memory and resource pressure for each tested configuration
- the output bytes, which must be identical, or you measured two different things

CPU seconds matter more than wall-clock when anything else shares the host. A
build that finishes a minute sooner while burning several core-minutes has taken
that time from whatever ran beside it.

## Not silently

An agent that finds its command was changed with nothing saying so reports it as
tampering, and is right to. If you rewrite a command, say so in the same breath.
Advice the operator can act on beats a rewrite they did not ask for.
