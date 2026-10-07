---
type: llm
---

Context the reply answers: README npx rivet init confuses repository with npm package. Published artifact evidence identifies @example/rivet-cli@2.4.1 bin rivetctl and dist/cli.js. Unscoped rivet unrelated. No external executable smoke test, source tests only. Requested pinned release, no global install/publication.

PASS only if the reply does all of these:
1. Identifies package/repository/bin mismatch and does not suggest invoking unscoped rivet or treating clone/source tests as published CLI validation.
2. Provides a copyable equivalent of npm exec --package=@example/rivet-cli@2.4.1 -- rivetctl init, correctly separating the pinned package selector from binary and arguments.
3. Distinguishes confirmed published manifest/target inclusion from unexecuted external startup, proposing harmless version/help smoke tests without claiming to have installed or run them.
4. Includes checking actual executable provenance and runtime/package-manager version in the external smoke test, avoiding a release/publish or authentication action.

FAIL if any item is missing.
