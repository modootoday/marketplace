---
name: starter-template-freshness-smoke
description: Check whether a reused project starter or boilerplate is still sound - list the dependencies each feature adds so unneeded ones can be cut, compare declared versions and the lockfile with the target runtime and the current support policy fetched at run time, generate in a clean directory then install, build and run a minimal check, report the first failure, and record the result with its date. Use when a template is copied for every project, is years old, or may be bloated or no longer install. Not for writing repository agent rules, picking a framework, or upgrading an application in production.
metadata:
  tier: open
  level: L3
  domain: software-qa
  install: optional
  keywords: [boilerplate, starter template, dependencies, lockfile, support policy, clean install, smoke test]
---

# Starter template freshness smoke

Developers copy an old starter for every project and doubt whether it still installs, or burn effort regenerating scaffolds. Rests on two reports; keep claims inside what is shown.

## Steps

1. List the inputs given: manifest, lockfile, template files, target runtime and deployment. Missing ones are named, not assumed.
2. Feature table: for each feature the project needs, the dependencies it adds. Dependencies tied to no needed feature are cut candidates; the owner decides.
3. Versions: compare declared ranges and the lockfile with the target runtime. Do not use remembered release or end-of-life facts: fetch the current support policy of each runtime and framework at run time and quote its date. No way to fetch: mark every version judgement unverified, and do not call any version old, outdated, current, supported or end-of-life from memory. Say only what the manifest declares (for example the major in a range) and what must be checked. Do not compare a declared version with the newest release, and do not say what a fresh install would resolve to beyond "within the range".
4. Smoke run: in a clean directory generate from the template, install from the lockfile, build, and run one minimal check (start and a single request or one test). Give the exact commands. Report the first failure with its message and stop there; later failures may be consequences.
5. Say what has not been run. A smoke result you did not execute is a plan, not a result.
6. Record the outcome with date, runtime versions and commands, so the next run compares against it.

## Output

The feature to dependency table with cut candidates, the version comparison with sources or marked unverified, the clean-directory command sequence, the first failure (or not yet run), and the dated record.
