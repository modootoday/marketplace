---
name: dead-code-keep-or-retire
description: Decide whether apparently unused code or a legacy service should be kept or retired, checking dynamic callers and external consumers and separating shutdown from permanent data disposal. Use when an unused-code report prompts removal, when stopping a legacy process or schedule, or when deciding what a cleanup may delete. Not for refactoring code that is in use or for dependency upgrades.
metadata:
  tier: open
  level: L3
  domain: platform-review
  install: optional
  keywords: [dead code, unused code, retire, remove module, cleanup, knip, unused exports, decision record, stop service, retain data]
  verified-runtimes: [claude-code]
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

For a running service, distinguish four actions before applying the code-removal
procedure: retiring code, stopping a process, disabling a schedule, and disposing
of queues or stored data. Approval for one does not imply approval for the others.

- Identify the deployed selector and supervisor wiring before stopping or removing
  a dynamically selected handler. An unused-code report does not show which
  handler is running.
- Disabling a local schedule does not stop external publishers, manual triggers,
  or in-flight work. Establish the remaining producers and consumers and choose
  how to drain, pause, or retain pending work within the requested shutdown scope.
- Keep explicitly retained resources and their read paths working. For unknown
  consumers, report the missing evidence before removing their dependency.
- Treat permanent queue, bucket, table, or database disposal as a separate action
  requiring scope and authorization. Source history recovers code, not stored
  contents; do not present a source commit as a data backup.

If the request authorizes only a stop, plan that stop and leave permanent disposal
undecided. Do not enlarge a routine cleanup into an unrelated infrastructure audit.

For code that is established as safe to retire:

- Write a short decision record: what was removed, the evidence from section 1,
  what replaces it if anything, and how to bring it back.
- Record where a copy lives: the last commit that had it, a tag, or an archive.
  The commit hash is the minimum.
- Keep the removal separate from unrelated changes so it can be reverted alone;
  commit or publish only when the current task authorizes that action.
- Remove the things that pointed at it in the same commit: config entries, docs,
  flags, build entries. A config entry left pointing at deleted code is the next
  incident.
- Run the checks that would catch a broken reference (build, typecheck, tests,
  and a start of the service if it is loaded by name) and report what ran.
