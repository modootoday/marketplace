---
name: prompt-discipline
description: Decide what belongs in the system prompt of an agent that calls tools, and what to leave out, with the symptom each omission produces. Use when writing or reviewing a tool-using agent's instructions, or when an agent misuses its own tools.
---

# Writing the prompt for a tool-using agent

Every line in a system prompt is paid on every call. So the question is never
"is this true" but "does the model get this wrong without it".

Each rule below names the symptom it prevents. A rule you cannot attach a
symptom to is a rule you are guessing at.

## Only write what the model gets wrong

| | |
| --- | --- |
| **Rule** | Include a line only when the model reliably errs without it. |
| **Symptom** | The prompt grows, every call costs more, and nothing changes. |

Test a line by deleting it. If behaviour is unchanged across a handful of real
tasks, it was decoration.

## Reference by stable handle, never by position

| | |
| --- | --- |
| **Rule** | Make tools return identifiers and require the model to use them. Force a lookup first so it cannot invent one. |
| **Symptom** | It edits the wrong item after anything is inserted, moved or deleted, because ordinals shift and the model kept the old one. |

## Say what does not exist

| | |
| --- | --- |
| **Rule** | Name the capabilities you do not have, especially the plausible ones. |
| **Symptom** | The model invents a tool, calls it, and reports success from a hallucinated result. |

## Gate anything that costs money

| | |
| --- | --- |
| **Rule** | Require explicit user intent before a billed tool, and say plainly which free tool it resembles. |
| **Symptom** | The user learns the cost from an invoice for something they never asked for. |

## Detect stale derivatives

| | |
| --- | --- |
| **Rule** | When an input changes, mark what was derived from it as stale and ask, rather than reusing it. |
| **Symptom** | Output built from an earlier version is delivered as current, and nothing in the transcript shows the mismatch. |

## Verify grounding in code, not in the prompt

| | |
| --- | --- |
| **Rule** | "Only cite what you actually retrieved" is a check that runs after generation, not a sentence in the instructions. |
| **Symptom** | Sources look right and are not; nobody can tell whether the constraint held on any given call. |

Anything you merely asked for is unverified by construction.

## Estimate cost where the prompt lives

| | |
| --- | --- |
| **Rule** | Whoever owns the prompt owns the estimate: only they know the call count, the instruction length, and what context gets attached. |
| **Symptom** | A layer above guesses, and reservations diverge from real use by multiples. |

## Reject unbillable models at boot

| | |
| --- | --- |
| **Rule** | Fail at startup on a model with no price, not on first call. |
| **Symptom** | You find out during a real request, by which time the charge is already wrong. |

## Stamp provenance in code

| | |
| --- | --- |
| **Rule** | Attach identity, timestamps and signatures in the code path that publishes. Do not ask the model to sign its own output. |
| **Symptom** | A hand-written marker becomes a hand-written identity, and anything can claim to be anything. |

## Declared reach is not actual reach

| | |
| --- | --- |
| **Rule** | What renders in the text and what actually notifies are separate fields. Check the delivered result, not the composed message. |
| **Symptom** | The message looks like it reached people and reached nobody, and the failure is invisible until someone asks why it was quiet. |

## No emoji in model-facing text

| | |
| --- | --- |
| **Rule** | Keep prompts, tool descriptions and injected context plain. |
| **Symptom** | Tokens spent on emphasis few models read as emphasis. If a line matters, the sentence has to carry it. |

## What this skill does not cover

Model choice, sampling settings and output formatting are preferences. The rules
here are limited to the axes where being wrong costs money, trust, or a silently
incorrect result.
