---
name: skill-catalog-navigator
description: Find, check and load the right skill from a skill catalog server instead of guessing. Use when a task might have a dedicated skill, when the pmcp tools (skill_find, skill_catalog, skill_describe, skill_call, skill_read) are available, or when a search for a skill came back empty.
metadata:
  tier: open
  level: L1
  domain: agent-workflow
  install: default
  keywords: [skill search, skill catalog, skill router]
  verified-runtimes: [claude-code]
---

# Navigating a skill catalog

A catalog server keeps hundreds of skills out of the session until one is
needed. Its value depends on the order you use it in: search before you read,
check before you load, and never invent a name.

## The loop

1. **Search with the problem, not a keyword.** Call `skill_find` with one full
   English sentence that says what you are trying to do and for whom. Add
   `filters` only for facts you already know (for example `tier` or `medium`).
2. **On an empty result, look before concluding.** Call `skill_catalog` (paged)
   and scan the group names. An empty search means the wording missed, not that
   no skill exists. Rephrase once with the vocabulary you saw there.
3. **Check the top one to three candidates.** Call `skill_describe` for each and
   compare `metadata.level`, the requirements, the output licence and whether
   approval is needed. Prefer the narrowest skill that covers the task.
4. **Load one.** Call `skill_call` with the exact name the server returned. The
   body is the instruction; follow it on your own host.
5. **Read extra files only when the body points at them.** Use `skill_read` with
   the path the body names. Treat scripts as text to review, not to run, unless
   the body asks and the user agreed.

## Rules

- Use only names a tool returned. A guessed name wastes a call and can load the
  wrong skill.
- Load at most two skills for one task. If neither fits, say so and work
  without one rather than stacking partial matches.
- Say which skill you used and why, in one line, so the user can check the
  choice.
- A skill tagged `paid` runs on a remote service and may cost the user. Show the
  estimate it asks for and wait for confirmation before submitting work.
- Never paste secrets into a skill's inputs. Skills name the environment
  variables they need; the values stay in the user's environment.

## When to stop using the catalog

If the task is a one-line answer, or the user named the exact procedure, skip
the search. The catalog is for tasks where a tested procedure beats improvising.
