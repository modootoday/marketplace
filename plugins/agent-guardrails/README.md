# agent-guardrails

## What it does

Refuses a small, measured set of shell commands whose damage is hard to undo,
and tells the agent what to do instead.

## Runtime support

| Runtime     | Supported | Measured on              |
| ----------- | --------- | ------------------------ |
| Claude Code | yes       | 2.1.251                  |
| Codex CLI   | yes       | 0.151.0                  |
| Grok CLI    | untested  | manifest reads on 1.0.13 |
| Gemini CLI  | skills only | hook contract differs; see the repository README |

Every rule here targets shell commands, which is also the only tool Codex sends
to this event, so the plugin loses nothing there.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install agent-guardrails@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add agent-guardrails@modootoday
```

Codex runs no hook until you trust it. Open the interactive session and use
`/hooks`. A guard that was never trusted is not a quiet guard, it is no guard,
and in a non-interactive run nothing says so.

Restart the session after installing; hooks are read at session start.

Gemini CLI has no marketplace. Clone the repository and link the directory:

```
gemini extensions link <repo>/plugins/agent-guardrails
```

## What it registers

One `PreToolUse` hook matching `Bash`, carrying three rules:

| Rule                  | Refuses                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| in-place stream edit  | `sed -i`, `perl -i`, `awk -i` and friends, including after `;` `&&` `\|\|` `\|` |
| unverified push       | `git push --no-verify` / `-n`                                                |
| project-wide teardown | `docker compose down`, and `stop` / `rm` / `kill` with no service named       |

A fourth rule refuses `git branch -f` only when the target branch is checked out
in another working tree, which it confirms by asking git.

Read-only use is untouched: `sed -n`, `sed` inside a pipeline, `git push`,
`docker compose stop <service>` all pass.

## Failure mode

**fail-closed.** A payload it cannot parse, or a command it cannot evaluate, is
refused. Everything here is hard to undo, so wrongly refusing costs a retry
while wrongly allowing costs the thing itself.

The one exception is deliberate: the branch rule refuses only what git confirms.
It cannot fail closed on a question it was unable to ask without blocking every
forced branch move, which is ordinary work.

## Configuration and how to disable

`AGENT_GUARDRAILS` selects the mode:

| Value  | Behaviour                                          |
| ------ | -------------------------------------------------- |
| `deny` | refuse outright (default)                          |
| `ask`  | hand the decision to the user                      |
| `off`  | allow everything, for when the guard is in the way |

Set `off` rather than editing rules when a guard blocks something legitimate,
then open an issue with the command. A rule that fires on real work is a bug in
the rule.

## Data written

None. No files, no network. The branch rule runs `git worktree list` and
`git rev-parse` and reads their output.

## Verify

```
node scripts/test.mjs
```

37 cases, both directions: commands that must be refused and commands that must
pass. The allowed half is the half that matters, because a guard nobody can work
around is a guard everybody turns off.

To see it refuse for real, ask your agent to run `sed -i 's/a/b/' somefile` in a
session with the plugin trusted.

## License

MIT
