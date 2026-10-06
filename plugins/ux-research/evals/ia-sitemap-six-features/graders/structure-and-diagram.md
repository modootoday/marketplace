---
type: llm
---

Context the reply answers: the user asked for a sitemap, maximum three levels, as diagram source, for a neighbourhood tool-lending app with these features: (1) search tools and see if free, (2) request a tool for dates, (3) lend own tools by listing with photos, (4) see and manage requests and loans, (5) message the other member about a handover, (6) "community features" (no task described); admins approve new members; members are main users, admins a few volunteers.

PASS only if the reply does all of these:
1. Derives nodes from user tasks (searching, requesting, listing, managing, messaging, approving members) and shows a mapping from each task to its node, rather than listing the features as given.
2. Keeps the diagram to at most three levels and labels the levels (for example sections, pages, detail views), noting anything folded to stay within the limit.
3. Emits text-based diagram source in a code block (Mermaid or similar) with unique ids, every non-root node attached to a parent, and no node deeper than level three.
