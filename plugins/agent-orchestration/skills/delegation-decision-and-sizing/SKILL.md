---
name: delegation-decision-and-sizing
description: Decide whether a task goes to zero, one or several subagents and how many - classify it as wide read-only, write-coupled or sequential, keep small or sequential work in one agent and say why, size a fan-out by breadth with a stated token multiple, pick the mechanism (turn-by-turn helpers, a script, a peer team) by who holds the plan, and set caps and a pilot slice before launch. Use when a user asks to use agents, spin up a team, parallelize or fan out work, or when you are about to spawn subagents. Not for writing the subagent prompt itself or for scripting a large run.
metadata:
  tier: open
  level: L1
  domain: agent-workflow
  install: optional
  keywords: [subagents, delegation, parallelization, agent count, token cost, fan out, orchestration]
---

# Delegation decision and sizing

More agents are not more progress. Delegation pays on wide, independent, read-heavy work and costs
time and money on small, sequential or tightly coupled work. Decide first, then size, then cap.

## 1. Classify the task

| Shape | Example | Default |
| --- | --- | --- |
| Wide and read-only | audit 40 files, search many sources, review a large diff | fan out |
| Write-coupled | pieces share a design decision or a file | one agent, or split only on a clean write set |
| Sequential | each step needs the previous result | one agent |
| Small | a handful of tool calls | do it yourself |

Read the references file `references/sizing-examples.md` for worked decisions.

## 2. Say the decision and the reason

State "one agent" or "N agents" and the shape that justifies it, in a sentence. If the user asked for
agents and the task is small, sequential or write-coupled, say you will not fan out and why; offer the
one place a helper still earns its cost (see section 3). Declining is a result, not a refusal.

## 3. Reasons that justify even one helper

- A side task would flood the main context with logs, search results or file bodies you will not reuse.
- You need to restrict its tools (read-only) or run it in an isolated copy.
- You want a reviewer with a clean context. Do not spawn a helper to double-check your own work on a
  model that already self-checks.

## 4. Size by breadth

- A fact or a small fix: 1 agent, a few tool calls. A comparison: 2 to 4 helpers. Broad independent
  research or audit: more, in batches, because each helper can only hold so many items well.
- Write the expected cost: multi-agent runs have been measured around 15 times the tokens of a chat
  and agents alone around 4 times, so name the multiple and ask whether the result is worth it.
- For uniform item lists, the number of agents is items divided by a per-agent chunk you chose, not one
  agent per item.

## 5. Choose the mechanism by who holds the plan

- Turn-by-turn helpers: you hold the plan; a few tasks.
- A script: the script holds the plan; dozens or more items, or a run you must repeat or resume.
- A peer team: only when workers must message each other; otherwise it adds coordination cost.

## 6. Caps and pilot before launch

Set limits in the runtime, not only in the prompt, and say where each one is set (a runtime setting,
an environment variable, a configuration field or a spend-limit option): depth, concurrent agents,
per-agent turns, total spend. A cap that exists only as an instruction to the agent is not a cap. Check your runtime's documented caps; as one example, Claude Code documents default limits on
subagent depth, concurrent subagents and workflow agents, and a spend cap option. Then pilot on 2 or 3
items, read the results, fix the brief, and only then run the rest.

Report: decision, shape, agent count or "none", mechanism, expected cost multiple, caps, pilot slice.
Not covered here: what goes into each prompt (`subagent-brief-and-handback`) and scripting a large run
(`fan-out-script-design`).
