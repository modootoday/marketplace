# hook-contract-matrix

## What it does

Reports which lifecycle hook events a coding agent actually delivers, and
whether context a hook returns really reaches the model.

## Runtime support

| Runtime     | Supported | Measured on            |
| ----------- | --------- | ---------------------- |
| Claude Code | yes       | 2.1.251                |
| Codex CLI   | yes       | 0.151.0                |
| Grok CLI    | untested  | manifest reads on 1.0.13 |
| Gemini CLI  | skills only | hook contract differs; see the repository README |

"Untested" means the manifest is accepted and nothing more was measured. It does
not mean the plugin works there.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install hook-contract-matrix@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add hook-contract-matrix@modootoday
```

Codex requires you to trust hooks before any of them run. Open the interactive
session and use `/hooks`. Do not reach for the bypass flag to skip this; the
measurement runner uses it deliberately and says so in its output, which is a
different thing from disabling the gate for your normal work.

Both runtimes read hooks at session start, so restart the session after
installing.

Gemini CLI has no marketplace. Clone the repository and link the plugin
directory:

```
gemini extensions link <repo>/plugins/hook-contract-matrix
```

## What it registers

| Kind  | Name           | Detail                                             |
| ----- | -------------- | -------------------------------------------------- |
| hook  | SessionStart   | records the event                                  |
| hook  | PostToolUse    | records the event, returns a token as extra context |
| hook  | Stop           | records the event                                   |
| skill | `hook-compat`  | how to judge whether a hook works across runtimes   |

## Failure mode

**fail-open.** Every handler exits zero whatever happens, and a handler that
cannot write its log simply records nothing. This plugin measures; it must never
be the reason a session stops.

## Configuration and how to disable

`HCM_LOG` selects where the probe writes. With no `HCM_LOG` set the handlers do
nothing at all, which is the normal state: the log is only set by the runner for
the duration of a measurement.

Disable the plugin the way your runtime disables plugins. There is no
plugin-specific switch, and nothing to clean up.

## Data written

One JSON line per hook invocation, to the path in `HCM_LOG`, and nothing else.
No network. The runner writes its temporary runtime home under the system
temporary directory and removes it when the run ends.

## Verify

```
node scripts/matrix.mjs --runtime claude
node scripts/matrix.mjs --runtime codex
node scripts/matrix.mjs --json
```

Each row is an observation. An event counts as delivered only when the probe
wrote a line for it, and injected context counts as delivered only when the
random token appears in the model's own reply. A run costs one short model turn
per runtime.

To convince yourself the tool can fail, remove a handler from `hooks/hooks.json`
and run it again: that row must turn to `NO`. A checker that never reports a
failure has not been shown to work.

## License

MIT
