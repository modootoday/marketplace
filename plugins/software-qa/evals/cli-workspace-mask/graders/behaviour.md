---
type: llm
---

Context the reply answers: Local monorepo npx pack-check prints3.0.0 from symlinked workspace @example/package-check@3.0.0/scripts/local-cli.js. README npx pack-check audit. Registry metadata public scoped package2.9.0 bin dist/check.js, tarball/startup unverified. Proposed empty cwd still inherits globaldev PATH and unknown cache. Local npm10.9/Node22 only.

PASS only if the reply does all of these:
1. Rejects the local3.0.0 result as proof of external quickstart success, explicitly grounding it in workspace executable provenance and the public2.9.0 mismatch.
2. Provides an explicit public-package/bin command such as npm exec --package=@example/package-check@2.9.0 -- pack-check audit, without treating pack-check as a verified npm package identity.
3. Explains why empty cwd alone does not eliminate global PATH/cache or linked-development masking and proposes provenance/isolation checks of the actually selected artifact/executable.
4. Separates registry metadata from tarball target/startup and workflow validation; reports those checks as pending, preserving observed npm/Node versions without claiming the proposed external test ran.

FAIL if any item is missing.
