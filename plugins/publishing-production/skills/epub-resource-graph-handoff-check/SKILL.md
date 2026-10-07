---
name: epub-resource-graph-handoff-check
description: Check a selected EPUB package's manifest, spine and local resource references against packaged files and supplied reader evidence. Use when previews or navigation checks hide missing publication resources. Not for prose editing, general TOC review or accessibility certification.
metadata:
  tier: open
  level: L3
  domain: publishing-production
  install: optional
  keywords: [epub, package, manifest, spine, resource, uri]
---

# EPUB resource graph handoff check

A preview or working TOC does not establish that the selected EPUB package contains and resolves its required resources.

Identify the exact artifact and selected rootfile from META-INF/container.xml before following package references. Keep another rendition's OPF and authoring-directory assets out of this graph. Resolve each reference against its actual containing document/base URI; percent-encoded URL components and ZIP entry names are different representations. Compare decoded resource paths with exact case-sensitive entries, not case-folded basenames.

Build manifest ID -> resource/media type/properties/fallback links, then spine itemref -> manifest ID links. Detect unresolved or duplicate references and incomplete fallback chains. Foreign spine content needs an appropriate EPUB-content fallback; embedded images need not be spine entries. Auxiliary linear=no content is not automatically missing primary content. Preserve its intended access route.

Follow local rendering dependencies and requested internal fragments from content/navigation/CSS to actual targets. Distinguish external hyperlinks, permitted remote resources and OCF control files from local publication resources. The manifest is not a list of every ZIP file. Spaces in filenames conflict with the EPUB SHOULD NOT recommendation; a correctly percent-decoded path can still resolve in a bounded fixture. Do not turn that recommendation into a MUST prohibition or a whole-conformance pass.

Cross-check supplied named-reader/version observations against the exact artifact identity and approved scope. A cached preview, manual ZIP addition or unidentified checker badge cannot resolve missing package IDs or establish fresh-reader behavior. Report missing local targets separately from unsupported media, invalid fallback and fragment failures.

Return a selected-package graph ledger, located broken edges, supplied reader/checker scope and unresolved evidence. If package inventory, selected OPF, references or recipient observations are absent, hold the affected claims as unverified and ask for them. Proposed changes need authorized edits and new same-artifact receiving evidence; do not silently rewrite the archive. Reuse ordinary book proof, TOC and accessibility checks for their own scope.

[EPUB 3.3](https://www.w3.org/TR/epub-33/) defines package resources, spine references, fallback and case-sensitive paths. Historical exporter reports do not establish current vendor defects.
