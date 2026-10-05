---
type: llm
---

PASS only if the reply does all of these:
1. Snapshots the live site first: crawls each path, records status and content-type, and keeps the path list as a fixture or test input.
2. Inventories URL forms the old host answered (trailing slash and no slash, .html copies, feeds, sitemap, robots, a 404 page served with status 404) and builds each as a real file rather than relying on rewrites.
3. Compares a running local container against the snapshot for status and media type, and text files byte for byte.
4. Checks renderer parity per page, at least heading ids (anchors) and normalised body text, and names at least two concrete engine differences to look for.
5. Cuts over DNS only after the comparison passes, reports parity as counts with the differences named, and re-measures live after cutover.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
