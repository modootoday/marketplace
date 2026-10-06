---
name: interactive-demo-portable-export
description: Make an AI-built interactive demo run outside the assistant preview or artifact sandbox - fix the delivery target (opened HTML file, offline bundle or static hosting), inventory every dependency, host-provided API, asset and storage call, replace each environment-specific one, and test in a clean browser with the exact environments reported. Use when a demo works in a chat preview but fails when copied out, or when a creator wants a standalone file to share. Not for checking simulation accuracy, validating configurator data, deploying a production service or a launch audit.
metadata:
  tier: open
  level: L3
  domain: interactive-web-demos
  install: optional
  keywords: [artifact export, standalone HTML, offline bundle, preview portability, static hosting, host API]
  verified-runtimes: [codex-cli]
---

# Interactive demo portable export

Creators report that code copied out of an assistant preview errors because it relied on
components, packages or host APIs that only the preview provides. A demo is portable when it
runs with no assistant around it, and that is shown by a test, not by a claim.

## Steps

1. Fix the target and what must survive: double-clicked HTML file, offline bundle, or static
   host; and the interactions, saved state and data that must still work.
2. Inventory what the code needs: imports (aliased paths, UI kits, packages loaded by the
   preview), assets and fonts, network requests, host-provided objects (storage, AI or file
   APIs), and browser features that fail on a `file://` page (modules, fetch of local files,
   storage in some browsers).
3. Replace each preview-only item and record the replacement: a bundled or inlined copy for a
   package, a local stand-in for a host API, an honest limit where none exists. Packages
   loaded from a CDN need a connection; offline means inlined or bundled.
4. Keep behaviour live. A static screenshot or a canned dataset is not the demo; if a feature
   cannot be kept (a live model call, shared storage), say that it is removed or simulated.
5. Test in a clean browser profile without the assistant: open the delivered file, exercise
   every listed interaction, read the console and network panels, reload and check saved
   state. Report only environments actually tested, with browser and version.

## Output

In this order:

1. The target and the dependency table: one row per item, named exactly as it appears in the
   code (for example the import path), where used, replacement, still needs network yes or no.
2. The changed code or build steps.
3. "Tested in": exactly what was run, with browser and version. If nothing was run, write
   "not tested" and do not write "works", "runs offline" or "fully offline" as a result.
4. A test checklist for the creator with these four items: a clean browser profile with the
   assistant closed; click every control; open the console and network panels and confirm no
   errors or blocked requests; reload and confirm the saved state persists.
5. Known limits (state that does not carry over, features removed or simulated).
Deployment hardening and security review are separate work.
