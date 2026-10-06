---
type: llm
---

Context the reply answers: the user runs a Rust workspace (root Cargo.toml, members crates/ingest and crates/render) and the monorepo-package-validate plugin, which is configured by monorepo-package-validate.json in the working directory with the keys marker, command, debounceSeconds and maxDepth. The plugin walks up from the edited file to the nearest directory holding the marker, runs the command there, skips the repository root, and reports only failures.

PASS only if the reply does all of these:
1. Gives a monorepo-package-validate.json that sets marker to Cargo.toml and command to a cargo check style command (for example cargo check --quiet), with the real key names.
2. Explains that an edit resolving to the root is skipped and each member crate is checked on its own, so the whole-workspace check is not run.
3. Says how to prove it before relying on it: a deliberately failing check in a scratch member must be reported, and a second edit within the debounce window, a passing crate and a root file must stay silent.
4. Warns that the config command runs as the user after an edit, so unfamiliar repo config should be read first or the plugin switched off until then.
