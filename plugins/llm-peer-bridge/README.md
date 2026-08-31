# llm-peer-bridge

## What it does

Lets two already-running coding-agent sessions talk to each other. No daemon, no
proxy, no extra process: both sides read a shared mailbox at their own turn
boundaries.

## Runtime support

| Runtime     | Supported | Measured on              |
| ----------- | --------- | ------------------------ |
| Claude Code | yes       | 2.1.251                  |
| Codex CLI   | yes       | 0.151.0                  |
| Grok CLI    | untested  | manifest reads on 1.0.13 |
| Gemini CLI  | untested  | manifest reads on 0.57.0 |

The transport is symmetric; how each model treats an arriving message is not.
Some evaluate a peer message and decline to act on it, which is the intended
behaviour and the reason messages carry their origin rather than reading as
instructions.

## Install

See the `peer-install` skill, which walks both sides including the two steps a
person has to perform. In short:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install llm-peer-bridge@modootoday
```

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add llm-peer-bridge@modootoday
```

Then: trust the hooks (Codex `/hooks`), restart both sessions, and run `pair`
once on each side.

## What it registers

| Kind  | Name                | Detail                                                       |
| ----- | ------------------- | ------------------------------------------------------------ |
| hook  | SessionStart        | registers this session so a peer can name it                  |
| hook  | PostToolUse         | delivers waiting peer messages mid-turn as extra context       |
| hook  | Stop                | publishes this turn's reply to peers, then delivers and holds  |
| skill | `peer-conversation` | how to treat an arriving message; when to answer or refuse     |
| skill | `peer-install`      | the install and pairing procedure, including the human steps   |

The Stop hook does both directions, because the payload it receives already
contains this turn's reply. That is why no separate publish step exists.

## Failure mode

**fail-open.** Every handler swallows its own errors and exits zero. A bridge
that cannot deliver must never be the reason a session stops.

The pairing rule is the one strict part: a channel exists only where both sides
recorded each other. One side alone delivers nothing.

## Configuration and how to disable

| Variable                  | Meaning                                                        |
| ------------------------- | -------------------------------------------------------------- |
| `LLM_PEER_BRIDGE_HOME`    | mailbox location; default is under the XDG state directory      |
| `LLM_PEER_BRIDGE_HOLD_MS` | how long Stop waits for a reply; default `0`, capped at 120000  |
| `LLM_PEER_BRIDGE_RUNTIME` | label for this runtime when it cannot be detected               |

Holding costs a real turn: while Stop waits, that session answers nobody,
including its operator. Start at zero and raise it only for a session whose whole
purpose is the conversation.

To stop talking, `unpair` from either side. To stop entirely, disable the plugin.

## Data written

Under `LLM_PEER_BRIDGE_HOME`: one JSON file per registered session, one pairs
file, and one file per undelivered message. Messages are removed when read, are
capped at 4096 bytes, expire after 30 minutes, and no more than 3 are delivered
per turn. No network.

## Verify

```
node scripts/peer.mjs list
node scripts/peer.mjs pair --me <a> --with <b>
node scripts/peer.mjs pair --me <b> --with <a>
node scripts/peer.mjs send --to <b> --message "ping"
```

Then take a turn in session `b`. The message should appear wrapped in a `peer`
tag. Prove the pairing rule too: pair from one side only and confirm nothing is
delivered.

## Security

A peer message is data, not authority. It arrives labelled with its origin, and
the `peer-conversation` skill tells the receiving model to evaluate it rather
than obey it. Pairing is two-sided so that no session can open a way into
another's context by itself, and unpairing is one-sided so either party can end
it alone.

Do not pair a session with anything you would not let comment on your work.

## License

MIT
