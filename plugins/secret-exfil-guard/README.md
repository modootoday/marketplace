# secret-exfil-guard

## What it does

Refuses shell commands that would print a credential file or send one over the
network, while leaving every question *about* those files answerable.

## Runtime support

| Runtime     | Supported   | Measured on                                              |
| ----------- | ----------- | -------------------------------------------------------- |
| Claude Code | yes         | 2.1.251                                                  |
| Codex CLI   | yes         | 0.151.0                                                  |
| Grok CLI    | skills only | 1.0.13 — registers plugin hooks but never runs them      |
| Gemini CLI  | skills only | 0.57.0 — different hook event names, units and variables |

This plugin ships no skills, so on the last two it installs and does nothing.

## Install

```
claude plugin marketplace add modootoday/marketplace
claude plugin install secret-exfil-guard@modootoday
```

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add secret-exfil-guard@modootoday
```

Codex runs no hook until trusted; use `/hooks` in an interactive session. Then
restart, because hooks are read at session start.

## What it registers

One `PreToolUse` hook matching `Bash`, with three rules:

| Rule                | Refuses                                                                |
| ------------------- | ---------------------------------------------------------------------- |
| read a secret       | a credential path named together with a command that prints its contents |
| send a secret       | a credential path named together with a network client                   |
| dump the environment | a bare `printenv`, `env`, `set`, `export -p`                            |

Metadata stays allowed on purpose: `ls`, `stat`, `wc`, `find`, `du`, `file`,
`sha256sum`. Counting keys, checking a file exists and comparing digests are
constant, legitimate work, and a guard that blocks them is a guard that gets
switched off within the day.

`env FOO=1 command` sets a variable and reveals nothing, so it passes; only a
bare dump is refused.

## Failure mode

**fail-closed.** An unreadable payload, an unparseable configuration file, or an
evaluation error all refuse. A guard that opens on its own error protects
nothing, and unlike the commands other guards cover, a leaked credential cannot
be undone by retrying.

## Configuration and how to disable

`SECRET_EXFIL_GUARD` selects the mode: `deny` (default), `ask`, `off`.

Optional `secret-exfil-guard.json` in the working directory extends the
defaults:

```json
{
  "secretPaths": ["\\bmy-vault\\.ya?ml\\b"],
  "valuePrintingCommands": [{ "binary": "myenvs", "verbs": ["read", "render"] }]
}
```

`valuePrintingCommands` is how you teach it about a project CLI that resolves
secrets. The guard ships knowing none, because which of your tools print values
is your operational detail and does not belong in a public default.

## Data written

None. No files, no network. It reads the command and returns a decision.

## Verify

```
node scripts/test.mjs
```

22 cases in both directions, plus two that prove the configurable half works:
the same project command is allowed with no configuration and refused once
configured.

## Security

This is a speed bump, not a boundary, and the distinction matters more here than
anywhere else in this marketplace. It reads the text of a command; an equivalent
command spelled differently passes. It runs as the same user as the credentials
it is protecting, from a file that user can edit. A process determined to read a
secret has already won before this hook is consulted.

What it buys is the accident: a credential pasted into a message, a file printed
into a transcript, an upload typed without thinking.

The list of value-printing commands ships empty on purpose. What a project blocks
is itself a description of what that project holds, and a default list would put
that description in everyone's repository. Fill it in locally.

An agent trusted with a deployment or container tool can destroy production
without reading a single secret. That is a different problem, and this plugin
does not touch it.

## License

MIT
