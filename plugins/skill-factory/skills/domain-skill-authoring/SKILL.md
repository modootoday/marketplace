---
name: domain-skill-authoring
description: Write a new agent skill (SKILL.md) that changes what the model does - eval cases first, a description that triggers on the right requests and not on near misses, a body limited to what the model gets wrong without it, and frontmatter that passes the marketplace schema. Use when the user asks to create, improve or review a skill, a SKILL.md or a plugin skill. Not for writing general documentation or system prompts.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [write a skill, SKILL.md, skill authoring, plugin skill, skill description]
---

# Authoring a skill that earns its place

A skill costs context every time it loads and attention every time it fires.
It earns that only if a capable model does something measurably different with
it. Most first drafts restate what the model already does, trigger on the wrong
requests, or never trigger at all.

## 1. Write the evals before the skill

Draft three or more cases before the body exists:

- **Two or more positive cases** built on what a model typically gets wrong in
  this domain: the step it skips, the fact it invents, the shortcut it takes.
  If you cannot name such a mistake, the skill may not be needed.
- **One negative case**: a near-miss request in a neighbouring domain where the
  skill must not fire.
- **Graders that judge the behaviour, not the wording.** State each criterion so
  a strict judge cannot fail a good answer on phrasing: say what is acceptable
  ("a summary next to a link is fine"), not only what fails.

Run them without the skill first. A case the baseline already passes is a
regression check, not evidence; keep it, and add a harder one.

## 2. The description decides whether it fires

- Start with what the skill does, in concrete terms.
- "Use when ..." with the words users actually type, including the artifact
  names ("ADR", "decision record", "PRD").
- "Not for ..." naming the nearest neighbours, so it stays out of their way.
- Plain English in public catalogs; other languages go in keywords or locale
  references.

If the eval shows the skill never fired, fix the description before touching
the body.

## 3. The body holds only what changes behaviour

- Each rule names the failure it prevents. A rule with no failure attached is
  decoration.
- Procedures as numbered steps; checks as a list the model can run through.
- Facts that change over time (API fields, legal text, prices) are looked up
  through a named tool or source, not written from memory; the body says so.
- Long examples and non-English material go in `references/`, linked by path.

## 4. Frontmatter

Fill the schema the catalog uses (tier, level, domain, install, keywords, and
the tier's extra fields) and run its checker before measuring.

## 5. Measure and report

Run the eval with and without the skill, two or three runs per arm. Report per
case: without, with, runs. A skill with no positive delta on any case is not
ready, whatever it says.
