---
type: llm
---

PASS only if the reply does all of these (wording is free):

1. Says a clean secret scan is not enough and audits the packed artifact itself (npm pack, or inspecting the tarball contents) rather than trusting "files": ["dist"].
2. Calls out sourcemaps specifically: sourcesContent embeds the original source (including the Korean comments and internal paths), so maps should be dropped or stripped, or at least inspected.
3. Includes searching for internal hostnames or URLs (the staging API in the README) and internal paths or identifiers across the README, docs and built files.
4. Covers repository-level items: at least two of license, commit author identity or emails in history, and the repository or package name.
5. Says the list of internal terms searched for (deny list) should be kept private and not committed to the public repo, or re-runs the check after fixes with a known positive as a control (either is enough).

FAIL if any item is missing.
