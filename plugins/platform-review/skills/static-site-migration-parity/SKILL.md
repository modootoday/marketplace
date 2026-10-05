---
name: static-site-migration-parity
description: Move a public static site to a new host or generator without breaking a URL - snapshot the live site path for path, build every URL form as a real file, compare a local container against the snapshot for status, media type and bytes, check renderer parity when the Markdown engine changes, and cut over DNS only after it passes. Use when migrating a static site, docs or blog to a new host, server or static site generator, or replacing its Markdown renderer. Not for redesigning the site or setting up a new site from scratch.
metadata:
  tier: open
  level: L3
  domain: edge-platform
  install: optional
  keywords: [static site migration, url parity, link rot, static site generator, markdown renderer, cutover, nginx]
---

# Migrating a static site with URL parity

The old host answered more URL forms than anyone wrote down, and the new generator renders
Markdown slightly differently. Both breakages are invisible in a visual check and show up weeks
later as 404s in search consoles and broken inbound links. Measure the live site first, then make
the new build match it.

## 1. Snapshot the live site before touching anything

1. Seed the path list from the old build output's file list, plus pages added since that build,
   plus the sitemap.
2. Fetch every path from the live site. Record status and `content-type` for each; mirror the
   bodies to disk.
3. Commit the path list as a test fixture. It is the contract the new build must meet.

## 2. Record every URL form the old host answered

For a sample page `/p`, try each form and note which ones answer 200:

- `/p/`, `/p`, `/p.html` (legacy copies), and which of them redirect.
- Machine-readable twins: `/p/index.md`, `/p.md`.
- `feed.xml` or `atom.xml`, `sitemap.xml`, `robots.txt`, `llms.txt`, verification files.
- The 404 page: a missing path must answer with status 404, not 200 with a "not found" body.

## 3. Build each form as a real file

Emit every form the old host served as an actual file in the output. Rewrite rules in the new
server are one more thing to drift; files are served the same way by any host.

## 4. Compare a running container against the snapshot

Serve the new build in the container that will run in production, then for every fixture path:

- status matches;
- media type matches (compare the type, not charset spelling);
- for text twins (`.md`, `.txt`, `.xml`), the body matches byte for byte.

## 5. Renderer parity when the Markdown engine changes

Per page, compare against the live HTML:

- the list of heading ids, in order (inbound `#anchor` links depend on them);
- the body text with whitespace normalised.

Known engine differences to check for and fix in the new renderer:

| Difference | What to match |
| --- | --- |
| heading ids | the old slug algorithm, applied to the raw heading text |
| smart quotes | open or close decided by the previous character, across inline tags |
| block attribute lists | `{: .class #id}` after a block applied, not printed |
| Markdown inside HTML elements | rendered or left raw as the old engine did |
| single tilde | `~x~` is not strikethrough unless the old engine made it so |
| tables | lenient column counts, short rows padded |
| unclosed code fence | printed as text, not swallowing the rest of the page |

## 6. Report as counts

State parity as numbers per check, naming every difference: "status 422/422, media type
422/422, heading ids 420/422 (two pages: ... and ...)". A percentage without the named misses is
not a parity report.

## 7. Cut over, then re-measure

Change DNS only after the container passes every check, or after each remaining difference is
accepted by the owner. Right after cutover, run the same comparison against the live site again;
caches and the CDN can still serve the old host for a while, so check the response headers show
the new one.

CDN edges switch to a new origin at different moments: for a minute or two, consecutive requests
alternate between old and new. Sample in a loop until a run of consecutive responses (ten, say)
all come from the new origin, and only then run the full comparison and retire the old host.
Retire it last, after the live comparison passes, so a rollback is still one DNS change away.
