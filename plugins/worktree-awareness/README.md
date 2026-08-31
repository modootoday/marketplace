# worktree-awareness

## What it does

Tells a session which checkout it is standing in, and whether other working
trees or another session's uncommitted files are present, before it acts.

## Runtime support

| Runtime     | Supported   | Measured on                                              |
| ----------- | ----------- | -------------------------------------------------------- |
| Claude Code | yes         | 2.1.251                                                  |
| Codex CLI   | yes         | 0.151.0                                                  |
| Grok CLI    | skills only | 1.0.13 — registers plugin hooks but never runs them      |
| Gemini CLI  | skills only | 0.57.0 — different hook event names, units and variables |

## Install

```
claude plugin marketplace add modootoday/marketplace
claude plugin install worktree-awareness@modootoday
```

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add worktree-awareness@modootoday
```

Codex runs no hook until trusted; use `/hooks` in an interactive session, then
restart the session.

## What it registers

| Kind  | Name               | Detail                                                        |
| ----- | ------------------ | ------------------------------------------------------------- |
| hook  | UserPromptSubmit   | names the checkout, other working trees, and pre-existing edits |
| skill | `shared-checkout`  | how to commit and what never to touch when sessions share a tree |

**It runs on `UserPromptSubmit`, not `SessionStart`, and that is the point.**
`SessionStart` cannot block and its message is discarded, so the model never
sees it. `UserPromptSubmit` is the earliest event whose output reaches the
model, which is the only place a warning about the checkout can still change
what happens next.

## Failure mode

**fail-open, and it never blocks at all.** Working in a shared checkout is a
legitimate choice; this only refuses to let it be an unnoticed one. Outside a
git repository, or when nothing is worth saying, it emits nothing.

## Configuration and how to disable

`WORKTREE_AWARENESS=off` silences it. There is nothing else to configure: what
it reports is derived from git, not from a policy you have to keep current.

## Data written

None. No files, no network. It runs `git rev-parse`, `git worktree list` and
`git status --porcelain` and reads their output.

## Verify

```
echo '{"cwd":"'"$PWD"'"}' | node scripts/state.mjs
```

In a clean single-worktree repository it prints nothing, which is correct: a
notice that appears every prompt regardless of state is noise, and noise gets
turned off. Create a second worktree, or leave a file modified, and it speaks.

## License

MIT
