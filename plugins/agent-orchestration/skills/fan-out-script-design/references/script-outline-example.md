# Script outline example

Scenario (synthetic): add input validation to 120 HTTP handlers, each followed by that handler's unit
tests. The test runner takes about 2 GB of memory per run on a 16 GB host.

```
args: { sliceSize }            // 0 = all; pilot uses 3

phase 1  discover
  list = agent("list handler files", schema {items:[{id,path}]})

phase 2  map (pipeline per handler)
  for each item in list.items.slice(0, sliceSize || all):
    pipeline:
      a = agent("add validation to <path>, template in brief", schema {changed, notes})
      b = withLock("tests", () => agent("run tests for <path> once", schema {pass, output}))
      // withLock admits 3 at a time; agent concurrency stays higher
    return { id, a, b }

phase 3  verify (only items where b.pass)
  refuter agent per item: "try to find an input the new validation lets through"

phase 4  reduce (barrier: needs every result)
  agent("dedupe, rank, list failed items", schema {merged, failed:[id]})
```

Design notes to state with the outline:

- Failed or null agents are filtered and listed in `failed`, not dropped.
- Item prompts depend only on the item and the brief, never on a sibling's output.
- If the verify prompt changes on resume, the verify agents and the reduce agent rerun; mapping does
  not. If a map agent fails, every agent started after it reruns, so the pilot is run first.
- Pilot: `sliceSize = 3`, read the diffs, fix the template, then run everything.
- Caps: agent concurrency under the runtime limit, test lock at 3 (6 GB), a turn cap per agent and a
  run-level agent cap.
