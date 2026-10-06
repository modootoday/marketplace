---
description: Skill-only case. Configure the per-package check for a Cargo workspace; the answer must give the config keys, the root-skip behaviour and a way to prove it.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [package-check-setup]
---

We use the monorepo-package-validate plugin. Our repo is a Rust workspace: a root Cargo.toml with `[workspace]`, and members `crates/ingest` and `crates/render`, each with its own Cargo.toml. After an edit I want only the edited crate checked quickly, not the whole workspace, and a failing check should reach you. What config do I write, and how do I make sure it works before I rely on it? I have not read the repo's other config files yet.
