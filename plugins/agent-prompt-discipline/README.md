# agent-prompt-discipline

## What it does

Says what belongs in the system prompt of an agent that calls tools, and what to
leave out, pairing every rule with the symptom it prevents.

## Runtime support

| Runtime     | Supported | Measured on |
| ----------- | --------- | ----------- |
| Claude Code | yes       | 2.1.251     |
| Codex CLI   | yes       | 0.151.0     |
| Grok CLI    | yes       | 1.0.13      |
| Gemini CLI  | yes       | 0.57.0      |

Skills are the one surface all four runtimes load, and this plugin ships nothing
else, so it works everywhere without a runtime-specific path.

## Install

```
claude plugin marketplace add modootoday/marketplace
claude plugin install agent-prompt-discipline@modootoday
```

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add agent-prompt-discipline@modootoday
```

```
grok plugin marketplace add modootoday/marketplace
grok plugin install agent-prompt-discipline --trust
```

Gemini CLI: clone the repository and
`gemini extensions link <repo>/plugins/agent-prompt-discipline --consent`.

No hooks, so nothing needs trusting and nothing runs on your machine. Restart
the session to pick up the skill.

## What it registers

| Kind  | Name                | Covers                                                     |
| ----- | ------------------- | ---------------------------------------------------------- |
| skill | `prompt-discipline` | eleven rules, each with the failure it prevents             |

## Failure mode

None. No hooks, no commands, nothing to block or slow.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None. No files, no network.

## Verify

Ask your agent which skills it has; `prompt-discipline` should be listed. If it
is not, restart the session.

Then use it on a prompt you already have: for each line, name the symptom that
appears without it. Lines with no symptom are the ones to delete, and that
exercise is the whole point.

## License

MIT
