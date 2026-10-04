---
type: llm
---

PASS only if the reply covers at least three of these:
1. both sessions must be restarted for hooks to load and the sessions to register;
2. the operator has to trust the Codex hooks interactively (for example through /hooks), and the
   bypass flag is not the fix;
3. pairing has to be run from both sides;
4. the bridge is working only once a message has actually crossed, not because the install
   reported success.

FAIL if fewer than three are covered, or if it tells the agent to bypass the trust step.
