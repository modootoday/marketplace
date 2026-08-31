---
name: hook-compat
description: Judge whether a lifecycle hook actually works in a given coding agent, and what to do when two agents disagree. Use when writing hooks meant to run in more than one agent, or when a hook appears to do nothing.
---

# Hook compatibility

A hook that does not fire and a hook that fires and does nothing look identical
from the outside. Neither writes anything. So the question is never "did I
configure it?" but "did the runtime deliver the event, and did the answer reach
the model?"

## What to check, in order

1. **Did the event fire at all?** Have the handler append a line to a file. No
   line means the event never arrived, whatever the config says.
2. **Does the payload carry what you assumed?** Field names and presence differ
   between runtimes. Record the key set, do not trust a schema you read once.
3. **Did returned context reach the model?** A handler writing JSON to stdout is
   not evidence. Put a token in the injected text and look for it in the reply.
4. **Did a blocking decision actually produce another turn?** Same rule: the
   proof is a second assistant message, not the handler's exit code.

## Three ways a hook goes quiet

- **Not trusted.** Some runtimes require an explicit trust step before any hook
  runs, and at least one of them skips untrusted hooks with no output and no log
  entry when it is not attached to a terminal. Automation takes exactly that
  path.
- **Manifest rejected.** Field types are not identical across runtimes. A
  manifest one runtime accepts, another can reject, and the rejection may cost
  you one component while the rest keeps working. Validate with the strictest
  runtime you target.
- **Event not supported.** The event exists in one agent and not another. A
  handler configured for it is simply never called.

## Reading a disagreement

When two runtimes differ, prefer the narrower behaviour. Write the hook so it is
correct under the runtime that delivers less, and treat anything extra as a
bonus you do not depend on. Record the runtime versions next to the result: a
matrix without versions becomes quietly false at the next release.

## What not to conclude

Do not read "installed" as "working". Installation reports the manifest was
accepted, nothing more. Do not read a passing run as coverage either: a rule
that never fires and a rule that fires and finds nothing produce the same clean
output. Prove the negative case at least once by breaking it on purpose.
