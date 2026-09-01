# build-concurrency-guard

## What it does

Notices build and test commands that leave their concurrency uncapped and says
what capping them would look like. It rewrites the command only if you ask it to.

## Runtime support

| Runtime     | Supported | Measured on              |
| ----------- | --------- | ------------------------ |
| Claude Code | yes       | 2.1.251                  |
| Codex CLI   | untested  | manifest reads on 0.151.0 |
| Grok CLI    | skills only | 1.0.13 — registers plugin hooks but never runs them |
| Gemini CLI  | skills only | 0.57.0 — different hook event names, units and variables |

The advise path uses `additionalContext`, and the apply path uses
`updatedInput`, which was measured working in Claude Code only. On a runtime
where `updatedInput` is ignored, `apply` degrades to doing nothing rather than
to doing something unexpected.

## Install

```
claude plugin marketplace add modootoday/marketplace
claude plugin install build-concurrency-guard@modootoday
```

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add build-concurrency-guard@modootoday
```

Codex runs no hook until trusted; use `/hooks` in an interactive session.
Restart the session after installing.

## What it registers

| Kind  | Name                   | Detail                                                        |
| ----- | ---------------------- | ------------------------------------------------------------- |
| hook  | PreToolUse (Bash)      | advises, or with opt-in prefixes capping environment variables |
| skill | `concurrency-policy`   | which axis is which, and how to tell a cap helped              |

Known tools: turbo, vitest, jest, cargo. Commands that already set the relevant
variables are left alone, as are cheap commands.

## Failure mode

**fail-open.** A payload it cannot read, or a command it cannot classify, passes
untouched. This is a convenience, not a guard: blocking a legitimate build costs
more than the time it saves.

## Configuration and how to disable

| `BUILD_CONCURRENCY_GUARD` | Behaviour                                              |
| ------------------------- | ------------------------------------------------------ |
| `advise`                  | explain the capped form, change nothing (default)      |
| `apply`                   | prefix the variables and say so in the same message    |
| `off`                     | do nothing                                             |

`apply` never rewrites silently: the reason field names what it added. An agent
that finds its command changed with nothing saying so reports it as tampering,
which is the correct reaction and the reason `advise` is the default.

## Data written

None. No files, no network. It reads the command and returns a decision.

## Verify

```
echo '{"tool_input":{"command":"turbo run build"}}' | node scripts/guard.mjs
echo '{"tool_input":{"command":"TURBO_CONCURRENCY=1 turbo run build"}}' | node scripts/guard.mjs
echo '{"tool_input":{"command":"ls -la"}}' | node scripts/guard.mjs
```

The first advises, the second and third say nothing, which is the behaviour that
matters: a hook that fires on everything gets turned off.

Whether a cap helps on your machine is a separate question the skill tells you
how to answer. Do not take a number from this README as your own.

## Security

The capability worth thinking about is `apply`, which rewrites a command before
it runs. That is why `advise` is the default and why the rewrite is announced in
the same message: a command that changes with nothing saying so is
indistinguishable from tampering, and an agent is right to report it as such.

What `apply` changes is bounded to concurrency variables prefixed onto the
command you already wrote. It adds no arguments, removes none, and cannot turn
one program into another.

It reads command text and returns a decision. Nothing is written and nothing is
sent.

## License

MIT
