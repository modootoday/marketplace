---
name: concurrency-policy
description: Decide how much parallelism a build or test command should be allowed when an agent starts it, and which knob actually controls what. Use when builds are slow, the machine is loaded, or several agent sessions share one host.
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
This one usually has no flag, only an environment variable, and it is invisible
in every profile that measures the tasks rather than the tool.

Capping the first does nothing to the second. When a build is slow and the task
count is already one, the second axis is where the time went.

## When more threads make it slower

A thread pool helps only while the work is genuinely parallel. It hurts when the
threads contend for something global — an allocator lock is the common case, and
statically linked binaries are especially prone to it, because they cannot pick
up a better allocator from the system.

The signature is easy to recognise once seen: wall-clock barely improves as
threads increase, system time climbs far faster than user time, and the process
spends its time in futex waits on a small number of addresses. When you see it,
capping the pool to one is not a compromise; it is faster.

## What to measure, not assume

Do not carry a number between machines. Measure the same stage twice, once with
the cap and once without, and compare three things:

- wall-clock, which is what people notice
- total CPU seconds, which is what a shared machine actually pays
- the output bytes, which must be identical, or you measured two different things

CPU seconds matter more than wall-clock when anything else shares the host. A
build that finishes a minute sooner while burning several core-minutes has taken
that time from whatever ran beside it.

## Not silently

An agent that finds its command was changed with nothing saying so reports it as
tampering, and is right to. If you rewrite a command, say so in the same breath.
Advice the operator can act on beats a rewrite they did not ask for.
