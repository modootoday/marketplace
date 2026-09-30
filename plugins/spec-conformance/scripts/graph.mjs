#!/usr/bin/env node
// Runs the published CLI at an exact version; the implementation, its tests and
// its fixes live in @modootoday/devtools-doc-lifecycle (MIT).
import { spawnSync } from "node:child_process";

const result = spawnSync(
  "npx",
  ["-y", "-p", "@modootoday/devtools-doc-lifecycle@0.5.0", "devtools-doc-graph", ...process.argv.slice(2)],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
