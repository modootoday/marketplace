---
name: admin-script-verification
description: Review an AI-written or existing administration script (PowerShell, bash, Python) before it runs on real accounts or machines - check each cmdlet, command, flag and module against the installed version or its documentation, flag commands that may not exist, flag destructive operations, add input validation and per-item error handling with a defined recovery, and recommend a dry run or small trial first. Use when someone pastes an admin script and asks to review it, harden it or make sure it is safe to run. Not for writing the script from scratch or for running it.
metadata:
  tier: open
  level: L3
  domain: it-ops
  install: optional
  keywords: [powershell, admin script review, cmdlet verification, dry run, error handling, whatif]
---

# Admin script verification

Two administrators report invented commands and properties in AI scripts, and the burden of
adding validation and error handling to existing scripts. This is a read-through and a
hardening plan; two reports are the evidence, so treat findings as checks to confirm.
Never run the script yourself and never ask for credentials or tokens.

## Steps

1. List every command, cmdlet, function, flag and module the script uses, in order of first use.
2. For each, classify: known standard command with the right parameters; custom or
   third-party (needs the module and version named); or UNVERIFIED because it looks invented
   (a name that is a plausible sentence, not a verb-noun from a known module). Do not
   declare a command real or fake from memory alone: give the check
   (`Get-Command <name>`, `Get-Help <name> -Parameter *`, `man`, `--help`, the module's
   docs page for the installed version) and what the user should see.
3. Check parameter names, value types and filter syntax against the module and version that
   provide the command (name the module, for example the ActiveDirectory module, and the
   version to check with `Get-Module -ListAvailable`), including quoting and operators in
   filters.
4. Flag destructive or wide-reach steps (delete, disable, reset, mailbox or quota changes,
   recursive operations, wildcard targets) with what each does on the real data. For each,
   say whether anything guards it (a confirmation, a condition, a prior success check); if
   it runs unconditionally for every item, write that sentence explicitly, and make the fix
   a guard plus the dry run in step 6.
5. Add input validation (input file exists, columns present, identifiers well formed, count
   as expected) and error handling per item: try/catch, a failure log with the item, error
   and time, continue to the next item, and a stated recovery for each failure type (retry,
   skip and report, stop and roll back). Write failed items to a separate file (for example
   `failed.csv`) in the input's format so the run can be repeated on only those items. Add a
   summary of done, failed, skipped.
6. Recommend a dry run (`-WhatIf`, `-Confirm`, `--dry-run`, or a print-only mode) and then a
   trial on a few items, with the batch started only after the log is read. Use placeholder
   names such as `user01`, never real identifiers.
7. List what could not be verified: commands not checked, behaviour that depends on the
   tenant or permissions, and the fact that the script was not run. Never say it works.

## Output

A command table (command, classification, how to verify), the destructive-step list, the
hardened script or the patch, the dry-run and trial plan, and the not-verified list.
