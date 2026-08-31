---
name: peer-install
description: Install and pair the peer bridge on both sides, including the two steps a person has to perform. Use when the operator asks to connect two agent sessions, or when peer messages are not arriving.
---

# Setting up the bridge

Run this on **both** sessions. Two of the steps cannot be done for the operator,
and pretending otherwise leaves a bridge that looks installed and delivers
nothing.

## 1. Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install llm-peer-bridge@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add llm-peer-bridge@modootoday
```

## 2. Ask the operator to trust the hooks

Codex runs no hook until it is trusted, and in a non-interactive run it says
nothing about that. **Ask the operator to open an interactive session and use
`/hooks`.** Do not reach for the bypass flag: it exists for automation that has
already vetted the source, not for skipping a step on someone else's machine.

## 3. Check the mailbox is writable

The bridge writes under the XDG state directory. If the runtime is sandboxed to
the workspace, that path must be added to its writable roots, or set
`LLM_PEER_BRIDGE_HOME` to somewhere it can write. Tell the operator which of the
two you need; do not edit their sandbox configuration yourself.

## 4. Ask the operator to restart both sessions

Hooks and skills are read at session start. Until both sides restart, neither is
registered.

## 5. Pair, from both sides

After the restart each session has registered itself. List them:

```
node <plugin>/scripts/peer.mjs list
```

Then, once on each side:

```
node <plugin>/scripts/peer.mjs pair --me <this-session> --with <other-session>
```

The channel opens only when both records exist. One side alone delivers
nothing, and that is the point: a session cannot open a way into another's
context by itself.

## 6. Prove it

Have one side finish a turn and check the other's `waiting` count in `list`. If
it stays at zero, work through this in order:

| Symptom                        | Cause                                     |
| ------------------------------ | ----------------------------------------- |
| session missing from `list`    | not restarted, or hooks not trusted       |
| `paired with nobody`           | only one side ran `pair`                  |
| waiting count rises, nothing arrives | receiving side has not taken a turn since |
| nothing anywhere               | mailbox path not writable                 |

Do not report the bridge as working until a message has actually crossed. An
install that reported success is not evidence.
