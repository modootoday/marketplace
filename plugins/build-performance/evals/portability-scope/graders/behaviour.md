---
type: llm
---

Context the reply answers: A patch intentionally sets project IDs from this repository and excludes its vendor subtree as local configuration. A separately published helper accepts only string-array workspaces, and silently returns [] for {packages:["modules/**"]}. Unknown process memory defaults to 12 workers. Linux local tests pass; macOS and Windows are untested. Classify generic defects versus local policy, propose a scoped fix and state supported scope. Do not run commands.

PASS only if the reply does all of these:

1. Keeps intentional repository IDs/vendor policy separate from the generic helper defect instead of removing local policy to claim portability.
2. Supports the declared workspace form or visibly rejects it, rather than silently accepting empty discovery; uses a known-present control.
3. Uses conservative behavior for unknown resource limits and retains untested macOS/Windows as explicit gaps, without claiming universal support.
