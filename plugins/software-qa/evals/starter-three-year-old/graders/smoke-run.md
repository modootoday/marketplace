---
type: llm
---

Context the reply answers: the user keeps a 3-year-old web starter (next ^13, prisma ^4, next-auth ^4 and others) and asks what to cut and whether it still builds. The user has not run install or build, and the session has no network.

PASS only if the reply does all of these:
1. Gives a command sequence to run in a clean directory (fresh copy or generation, install from the lockfile, build, and a minimal run or request), not in the existing working copy.
2. Says to report the first failure only and not to treat later errors as separate findings.
3. Asks for or proposes recording the result with the date and runtime versions so the next run can compare.
4. Asks for what is missing, such as the lockfile (only package.json was given), before judging installability.
