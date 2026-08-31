# spec-authoring

## What it does

Teaches an agent to write plans, source-of-truth documents and decision records
as three distinct things, and to give every rule a command that proves it is
still true.

## Runtime support

| Runtime     | Supported | Measured on              |
| ----------- | --------- | ------------------------ |
| Claude Code | yes       | 2.1.251                  |
| Codex CLI   | yes       | 0.151.0                  |
| Grok CLI    | untested  | manifest reads on 1.0.13 |
| Gemini CLI  | untested  | manifest reads on 0.57.0 |

Skills are the one surface all four runtimes read, and this plugin ships nothing
else, so it has no runtime-specific behaviour to lose.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install spec-authoring@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add spec-authoring@modootoday
```

Gemini CLI has no marketplace. Clone the repository and link the directory:

```
gemini extensions link <repo>/plugins/spec-authoring
```

There are no hooks here, so nothing needs to be trusted and nothing runs on your
machine. Restart the session so the skills are picked up.

## What it registers

| Kind  | Name             | Covers                                                             |
| ----- | ---------------- | ------------------------------------------------------------------- |
| skill | `plan-authoring` | proposals: required sections, lifecycle, honest reporting of failures |
| skill | `sot-authoring`  | invariants: pairing every rule with a command that checks it          |
| skill | `adr-authoring`  | decisions: rejected alternatives, reversal conditions, immutability   |

## Failure mode

None. This plugin registers no hooks and runs no commands. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None. No files, no network.

## Verify

There is nothing to execute, so verify by asking:

```
Which skills are available to you right now?
```

The three names above should appear. If they do not, the plugin is installed but
not loaded: restart the session, and on Codex confirm the plugin is enabled.

The skills themselves are judged by use, not by a test: apply `sot-authoring` to
a rule you already hold and see whether you can write its check command. If you
cannot, the rule was not an invariant.

## License

MIT
