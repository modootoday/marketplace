# hook-contract-matrix

## What it does

Reports which lifecycle hook events a coding agent actually delivers, and
whether context a hook returns really reaches the model.

## Runtime support

| Runtime     | Supported | Measured on            |
| ----------- | --------- | ---------------------- |
| Claude Code | yes       | 2.1.251                |
| Codex CLI   | yes       | 0.151.0                |
| Grok CLI    | skills only | 1.0.13 — registers plugin hooks but never runs them |
| Gemini CLI  | skills only | 0.57.0 — different hook event names, units and variables |

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
| hook  | SessionStart     | records the event                                  |
| hook  | UserPromptSubmit | records the event                                  |
| hook  | PreToolUse       | records the event, and refuses only in blocking mode |
| hook  | PostToolUse      | records the event, returns a token as extra context |
| hook  | Stop             | records the event                                   |
| skill | `hook-compat`    | how to judge whether a hook works across runtimes   |

The five events are the ones this marketplace's plugins actually register. The
`PreToolUse` probe observes and never denies: an instrument that blocked commands
while measuring would be measuring itself.

## Failure mode

**fail-open.** Every handler exits zero whatever happens, and a handler that
cannot write its log simply records nothing. This plugin measures; it must never
be the reason a session stops.

## Configuration and how to disable

`HCM_LOG` selects where the probe writes. With no `HCM_LOG` set the handlers do
nothing at all, which is the normal state: the log is only set by the runner for
the duration of a measurement.

`HCM_DENY_TOKEN` turns on blocking mode, and the probe then refuses exactly the
commands containing that token. The runner sets it for a `--blocking` run and
nothing else does. Unset, as it is by default, the probe refuses nothing.

Disable the plugin the way your runtime disables plugins. There is no
plugin-specific switch, and nothing to clean up.

## Data written

One JSON line per hook invocation, to the path in `HCM_LOG`, and nothing else.
No network. The runner writes its temporary runtime home under the system
temporary directory and removes it when the run ends.

A blocking run also lets the measured session write two small files into its own
temporary working directory, because whether those files exist is the evidence.
That directory is removed with the rest.

## Verify

```
node scripts/matrix.mjs --runtime claude
node scripts/matrix.mjs --runtime codex
node scripts/matrix.mjs --json
node scripts/matrix.mjs --runtime claude --blocking
```

Each row is an observation. An event counts as delivered only when the probe
wrote a line for it, and injected context counts as delivered only when the
random token appears in the model's own reply. A run costs one short model turn
per runtime, and `--blocking` is a second run because it asks a different
question.

In blocking mode the probe refuses exactly one command, named by a token the
runner generates. Outside that mode it refuses nothing: an instrument that
blocked commands while measuring would be measuring itself.

To convince yourself the tool can fail, remove a handler from `hooks/hooks.json`
and run it again: that row must turn to `NO`. For blocking, unset the deny
token so nothing is refused, and `refused command ran anyway` must turn to
`yes`. A checker that never reports a failure has not been shown to work.

## Measured contract

The most recent run is committed under `results/`, so you can read the answer
before deciding whether to spend a turn reproducing it. Each row is an
observation from one session, not a claim about the runtime in general.

`results/2026-09-01.json`:

| Observation                      | Claude Code 2.1.251 | Codex CLI 0.151.0 |
| -------------------------------- | ------------------- | ----------------- |
| SessionStart fired               | yes                 | yes               |
| UserPromptSubmit fired           | yes                 | yes               |
| PreToolUse fired                 | yes                 | yes               |
| PostToolUse fired                | yes                 | yes               |
| Stop fired                       | yes                 | yes               |
| injected context reached model   | yes                 | yes               |
| `stop_hook_active` in payload    | yes                 | yes               |
| `last_assistant_message` present | yes                 | yes               |
| `CLAUDE_PLUGIN_ROOT` set         | yes                 | yes               |
| `CLAUDE_PROJECT_DIR` set         | yes                 | **no**            |

One difference, and it is load-bearing. `llm-peer-bridge` decides which runtime
it is on by whether `CLAUDE_PROJECT_DIR` is set, falling through to `CODEX_HOME`.
That was an assumption until this run; it is now a measurement.

The probe covered three events until a census of this marketplace found that
three plugins register `PreToolUse` and one registers `UserPromptSubmit`. Four of
the seven hook-bearing plugins were outside an instrument that several of their
own designs named as a release condition, so the probe was widened to five.

**Firing is not blocking**, so blocking is a second run:

| Observation                 | Claude Code 2.1.251 | Codex CLI 0.151.0 |
| --------------------------- | ------------------- | ----------------- |
| refusal emitted by the hook | yes                 | yes               |
| control command ran         | yes                 | yes               |
| refused command ran anyway  | **no**              | **no**            |
| refusal stopped the tool    | **yes**             | **yes**           |

The evidence is which files exist when the session ends, not what the model says
happened. The control matters as much as the refusal: without a command that was
allowed and did run, a missing file would equally mean the refusal held or the
model never tried.

This establishes that the runtime stops the tool on Bash. It does not establish
that a model determined to proceed cannot reach the same result another way: the
prompt told it to accept a refusal, which measures the runtime rather than the
model.

The Codex row was taken with hook trust bypassed. An untrusted Codex runs no hook
at all, which is a configuration answer rather than a contract one.

Grok and Gemini are absent from the table on purpose: their rows in Runtime
support come from reading their manifests, not from this probe, and a table that
mixed the two would make a weaker claim look like this one.

## Security

Measuring costs a real model turn: the runner starts an agent session against
whichever runtime you name, with whatever credentials that runtime already has.
It is not a dry run, and it is billed like any other turn.

The probe log records one line per hook invocation, and a hook invocation carries
the tool event that triggered it. Command text can end up there. You choose the
path through `HCM_LOG`, so choose one you would not commit, and delete it when
the run is over.

The temporary runtime home exists so the measurement does not read or disturb
your real agent configuration. It is removed when the run ends; an interrupted
run can leave it behind under the system temporary directory.

Blocking mode makes the probe refuse commands, which is the one situation where
this plugin can stop work rather than only watch it. It refuses only commands
carrying the token the runner generated for that run, and only while
`HCM_DENY_TOKEN` is set, so it cannot interfere with a session it is not
measuring. Do not set that variable by hand in a session you are working in.

## License

MIT
