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
| Grok CLI    | yes       | 1.0.13                   |
| Gemini CLI  | yes       | 0.57.0                   |

Skills are the one surface all four runtimes read. The commands are an extra
entry point, and they are not equally honoured:

| Runtime               | `/spec-authoring:plan`                                     |
| --------------------- | ----------------------------------------------------------- |
| Claude Code 2.1.251   | resolves to `commands/plan.md`                               |
| Codex CLI 0.151.0     | resolves to the `plan-authoring` **skill**, not the command  |

Measured 2026-09-01, one session each. Under Claude the reply followed
instructions that exist only in the command file — check for an existing plan on
the subject, then report which sections were left unfilled. Under Codex the
session twice reported resolving the name to `spec-authoring:plan-authoring`,
and produced a document whose sections the skill alone would also have produced,
so this does not establish that the command file was read.

Nothing is lost either way: the commands restate no rule the skills do not
already carry, so a runtime that reaches only the skill reaches the same
discipline by a longer route.

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
| command | `/spec-authoring:plan` | start a plan: find where plans live, create all six sections |
| command | `/spec-authoring:sot`  | start a source of truth: write the check, then make it fail  |
| command | `/spec-authoring:adr`  | start a decision record: take the next number, name what was rejected |

Each command begins by locating where these documents already live and matching
the existing naming, rather than assuming a directory. None of them writes a
number, a date or a measurement it did not obtain: a section it cannot fill is
left and reported, because a document that reads as confident because its author
invented the contents is worse than an empty one.

## Failure mode

None. This plugin registers no hooks and runs no commands. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

The skills write nothing and open no connection.

The commands create the document you asked for, in the directory they found, and
add it to an index if the project keeps one. That is their whole purpose, and it
is the only thing they write. They run no build, no test and no deployment.

Nothing here reaches the network.

## Verify

Ask which skills are available:

```
Which skills are available to you right now?
```

The three names above should appear. If they do not, the plugin is installed but
not loaded: restart the session, and on Codex confirm the plugin is enabled.

For the commands, run one in a scratch directory rather than in a repository you
care about:

```
/spec-authoring:plan whether this command resolves
```

Two things distinguish a resolved command from a runtime that merely fell back
to the skill. It should ask where plans live rather than assuming, and it should
end by telling you which sections it left unfilled. A reply that produces a
tidy, complete document with every section confidently populated has failed the
part that matters, whatever it says at the top.

The skills themselves are judged by use, not by a test: apply `sot-authoring` to
a rule you already hold and see whether you can write its check command. If you
cannot, the rule was not an invariant.

## Security

The skills are text the model reads: they run nothing and open no connection.
The commands create a document, which means they read the surrounding directory
to work out where documents belong and what they are named. Run one in a
repository you would not otherwise let an agent write to and it will write there.

One thing it teaches is worth reading twice. It asks every rule to carry a command
that proves the rule still holds, and those commands end up committed and run by
whoever opens the repository. Write them read-only. A check that deletes,
deploys or publishes turns a document into a trigger, and the next reader will
run it without thinking because a check is supposed to be safe.

Design documents are also the place internal hostnames, account identifiers and
paths accumulate. They are usually the most quotable files in a repository.

## License

MIT
