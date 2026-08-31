// Finds packages by looking for the rule directory. No manifest parsing, so it
// works the same in a monorepo, a single package, or a tree of loose folders.

import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export function discoverPackages(root, config) {
  const found = [];
  const ignore = new Set(config.ignore);

  function walk(dir, depth) {
    if (depth > 8) return;
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    const names = new Set(entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name));
    const [head, ...tail] = config.sourceDir.split("/");
    if (names.has(head)) {
      const candidate = join(dir, head, ...tail);
      try {
        if (statSync(candidate).isDirectory()) {
          found.push({ dir, rel: relative(root, dir) || ".", rulesDir: candidate });
        }
      } catch {
        // not a rule directory; keep walking
      }
    }

    for (const entry of entries) {
      if (!entry.isDirectory() || ignore.has(entry.name) || entry.name.startsWith(".")) continue;
      walk(join(dir, entry.name), depth + 1);
    }
  }

  walk(root, 0);
  return found;
}
