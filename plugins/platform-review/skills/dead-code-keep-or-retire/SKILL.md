---
name: dead-code-keep-or-retire
description: Decide whether code that looks unused is really dead before deleting it - check dynamic calls (string-built imports, registries, reflection, route tables), external control (config files, feature flags, environment, other repositories, cron and infrastructure), and runtime string references; keep it when its value is clear even if unused today; retire it with a short decision record and a note of where a copy lives. Use when a tool or search reports unused files, exports or packages, before a cleanup or removal, or when asked whether something can be deleted. Not for refactoring code that is in use or for dependency upgrades.
metadata:
  tier: open
  level: L3
  domain: platform-review
  install: optional
  keywords: [dead code, unused code, retire, remove module, cleanup, knip, unused exports, decision record]
---

# Dead code: keep or retire

"No references found" is a statement about the search, not the code. Code that
looks unused is often reached by a string, a config file or another repository,
and deleting it breaks something that no test covers. The opposite failure also
happens: working, valuable code is deleted because nothing calls it this week.

## 1. Prove it is unreachable

For each candidate, check every way it can be reached and record what you ran:

1. **Static references**: imports, exports, re-exports, type references, tests.
2. **Dynamic calls**: string-built imports or requires, plugin or handler
   registries, dependency injection by name, reflection, route tables, command
   maps, `eval`-like loaders. Search for the module's name, file stem and
   exported names as plain strings, not only as identifiers.
3. **External control**: config files, feature flags, environment variables,
   build and deploy configs, cron and scheduler definitions, infrastructure
   code, queue or webhook subscriptions.
4. **Other repositories and consumers**: published packages, sibling repos,
   scripts that call it by path, documentation that tells people to run it.
5. **Runtime evidence** where available: logs, metrics or traces showing calls
   in a recent window.

A search that returns nothing must be shown to find the thing when it is
present: run it against a name you know is referenced.

## 2. Decide

| Finding | Decision |
| --- | --- |
| Reached by any path above | Keep. It is not dead. |
| Unreached, but it encodes something hard to rebuild (a tested algorithm, a protocol client, a migration path, a recovery tool) | Keep, and note why in one line where the next reader will see it. |
| Unreached, replaced by something else, and cheap to rebuild | Retire. |
| Unsure | Do not delete. Report what is unproven. |

Value is a reason to keep code on its own. Do not delete a working tool only to
make an "unused" report reach zero.

## 3. Retire with a record

- Write a short decision record: what was removed, the evidence from section 1,
  what replaces it if anything, and how to bring it back.
- Record where a copy lives: the last commit that had it, a tag, or an archive.
  The commit hash is the minimum.
- Remove it in its own commit, with no unrelated changes, so the removal can be
  reverted alone.
- Remove the things that pointed at it in the same commit: config entries, docs,
  flags, build entries. A config entry left pointing at deleted code is the next
  incident.
- Run the checks that would catch a broken reference (build, typecheck, tests,
  and a start of the service if it is loaded by name) and report what ran.
