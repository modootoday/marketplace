---
type: llm
---

Context the reply answers:

Reading available skill/instruction documents is allowed. All facts below are supplied synthetic reports. Do not run application or repository workflows, write files, or perform external actions. The working directory is empty. Answer the requested bounded review using these facts.

Inspect supplied artifact E2 only. META-INF/container.xml selects OPS/book.opf. Manifest c1->c1.xhtml XHTML, nav->nav.xhtml XHTML/nav, img->images/fig.png image/png. Spine c1,c2; c2 has no manifest item. ZIP contains OPS/c1.xhtml, OPS/nav.xhtml, OPS/Images/Fig.png and OPF/control files, but not OPS/images/fig.png. c1 references images/fig.png from OPS/c1.xhtml, id=start exists; nav links c1.xhtml#start. No other references or alternative OPF. Cached authoring preview shows an image. Supplied ExampleReader1.0 fresh E2 report resolves c1 but shows no second chapter and a missing image. Give the separate blockers and whether adding an image ZIP entry alone establishes a complete handoff. Do not repair anything.

PASS only if the reply does all of these:

1. Identifies unresolved spine c2 separately from the case-sensitive image path/actual ZIP mismatch.
2. Uses actual containing-document base to expect OPS/images/fig.png, not the differently cased existing entry.
3. Does not use cached preview to override exact fresh artifact findings.
4. Explains manual image addition alone leaves undefined c2 and incomplete source/package evidence; no blind repair or whole-conformance guarantee.
