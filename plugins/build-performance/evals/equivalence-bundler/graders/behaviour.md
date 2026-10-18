---
type: llm
---

Context the reply answers: Review a TypeScript bundler pilot in three packages. Twelve runtime checks pass and declaration files are byte-identical. Raw JavaScript shrinks 5%, but total gzip grows 19%; the existing delivery budget forbids any gzip growth. Exports require ESM, CJS and types; only ESM import was tested. SSR consumer smoke and published tarball contents are untested. Build medians on this host fall from 1.1s to 0.9s. Decide and name the smallest relevant next checks, without implementing a migration.

PASS only if the reply does all of these:

1. Holds adoption under the explicit gzip budget and separates speed, raw size and compressed size from correctness.
2. Validates ESM/CJS/types export resolution and published artifact inventory/consumers, not just identical declaration bytes.
3. Requires relevant SSR or actual consumer checks, keeps the current toolchain/rollback while gaps remain, and does not generalize host timings.
