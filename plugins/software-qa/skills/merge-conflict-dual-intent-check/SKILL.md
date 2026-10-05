---
name: merge-conflict-dual-intent-check
description: Resolve a git merge or rebase conflict so both sides' intent survives - state each side's intent in one sentence from its commit message and diff, write a resolution that keeps both, list the cases where both cannot hold instead of choosing silently, confirm no conflict markers remain and the names used on both sides still exist, and name a test with a numeric example per intent. Use when a developer asks to resolve a conflict, or to check a resolution already made. Not for choosing a branching strategy, rewriting history, or reviewing unrelated code.
metadata:
  tier: open
  level: L3
  domain: software-qa
  install: optional
  keywords: [merge conflict, rebase, git, resolution, intent, conflict markers, semantic conflict]
---

# Merge conflict dual-intent check

Removing the conflict markers is not resolving the conflict: one side's change can vanish without a trace. This skill rests on one public implementation record, so treat it as a checklist, not a proven method.

## Steps

1. Read both sides and their commit messages. Write one sentence per side: what that commit meant to do. No commit message given: say the intent is inferred from the diff and mark it so.
2. Write the merged code so that both intents hold. Show the result without markers (`<<<<<<<`, `=======`, `>>>>>>>`).
3. List every point where both intents cannot hold or the combination is ambiguous (for example whether a new fee applies before or after a new filter) and state the choice you made and the alternative. Do not pick silently; the author decides.
4. Check around the hunk: every name, argument and return shape used on one side still exists on the other side's version. Name what you could not see (code outside the pasted hunk).
5. Verification: name one test per intent with a concrete input and the expected output computed by hand, and one test for the combination. Say which you did not run.

## Output

The two intent sentences, the merged code, the ambiguity list with the chosen reading, the around-the-hunk check, and the test list with numbers.
