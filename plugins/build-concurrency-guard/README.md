# build-concurrency-guard

## What it does

Notices build and test commands that leave their concurrency uncapped and says
what capping them would look like. It rewrites the command only if you ask it to.

## Runtime support

| Runtime     | Supported            | Measured on                                                  |
| ----------- | -------------------- | ------------------------------------------------------------ |
| Claude Code | yes                  | 2.1.251                                                      |
| Codex CLI   | skill cases verified | 0.163.0; three paired policy cases, hook behavior unverified |
| Grok CLI    | skills only          | 1.0.13 — registers plugin hooks but never runs them          |
| Gemini CLI  | skills only          | 0.57.0 — different hook event names, units and variables     |

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

| Kind  | Name                 | Detail                                                         |
| ----- | -------------------- | -------------------------------------------------------------- |
| hook  | PreToolUse (Bash)    | advises, or with opt-in prefixes capping environment variables |
| skill | `concurrency-policy` | which axis is which, and how to tell a cap helped              |

Known tools: turbo, vitest, jest, cargo. Commands that already set the relevant
variables are left alone, as are cheap commands.

## Failure mode

**fail-open.** A payload it cannot read, or a command it cannot classify, passes
untouched. This is a convenience, not a guard: blocking a legitimate build costs
more than the time it saves.

## Configuration and how to disable

| `BUILD_CONCURRENCY_GUARD` | Behaviour                                           |
| ------------------------- | --------------------------------------------------- |
| `advise`                  | explain the capped form, change nothing (default)   |
| `apply`                   | prefix the variables and say so in the same message |
| `off`                     | do nothing                                          |

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

The plugin ships an eval suite (`claude plugin eval plugins/build-concurrency-guard --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case                          | Skill                             | Without | With | Runs per arm |
| ----------------------------- | --------------------------------- | ------- | ---- | ------------ |
| `slow-with-concurrency-one`   | concurrency-policy                | 0.0     | 1.0  | 2            |
| `copy-laptop-setting`         | concurrency-policy                | 0.0     | 1.0  | 2            |
| `single-test-not-concurrency` | negative: the skill must not fire | 1.0     | 1.0  | 2            |

A case that already passes without the plugin stays in the suite to catch a regression, not as evidence that the skill helps.

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

## Policy maintenance on Codex CLI

### Paired policy comparison, 2026-10-19

Codex CLI 0.163.0 with gpt-6.1-sol as subject and judge completed two runs per
arm and three judge votes per case, concurrency one, proxy authentication and
bubblewrap isolation. All twelve positive-case replies and 36 behavioral votes
were reviewed. The unchanged policy body was measured; no fixture or rubric was
edited. Plugin hooks were not enabled.

| Runtime   | Model       | Case                        | Skill              | Without | With | Fired | Date       |
| --------- | ----------- | --------------------------- | ------------------ | ------- | ---- | ----- | ---------- |
| Codex CLI | gpt-6.1-sol | `copy-laptop-setting`       | concurrency-policy | 0.00    | 1.00 | 2/2   | 2026-10-19 |
| Codex CLI | gpt-6.1-sol | `process-budget`            | concurrency-policy | 0.00    | 1.00 | 2/2   | 2026-10-19 |
| Codex CLI | gpt-6.1-sol | `slow-with-concurrency-one` | concurrency-policy | 0.00    | 1.00 | 2/2   | 2026-10-19 |

All answers already reject transplanting laptop settings and recognize shared
resource limits. Guided answers additionally compare CPU seconds and output
equivalence alongside elapsed time; the baselines omit parts of that measurement
contract. Both guided startup diagnoses treat contention as a hypothesis to
profile. A named Rayon setting is conditional on runner support, not a universal
control. These scores demonstrate advice-case effect, not measured build speedups
or hook execution.

The negative `single-test-not-concurrency` case also passes two with-only runs:
both give the requested Vitest file command and do not activate the policy. All
six answer votes pass. This is activation-boundary maintenance, not paired effect.

### Final repaired-body maintenance, 2026-10-19

The paired rows above measured the body before the subsequent bounded repairs.
The final body narrows activation for ordinary test syntax, requires concrete
parent admission and unknown-limit fallbacks, treats startup diagnoses as
hypotheses, and requires per-configuration process-tree peaks and resource
pressure. No fixture or rubric was weakened.

Codex CLI 0.163.0 with gpt-6.1-sol as subject and judge completed two with-only
runs of all four cases on the final body, with three votes, concurrency one and
proxy/bubblewrap isolation. All eight answers and 24 behavioral votes pass.
Each positive case activates the policy twice; the negative case never activates
it. The preceding repair had one mixed process-budget answer and is preserved
as a failed intermediate attempt. These final checks establish maintenance of
the repaired body; the earlier paired rows supply the measured advice-case effect.
Neither run measures hook execution or an actual build speedup.

Grok CLI 1.0.50 with grok-4.7-build-fast completed a fresh two-arm comparison of
the final body, with two runs and three votes. Copy-laptop and slow-startup pass
both With runs against failing baselines. The negative passes in both arms with
no policy activation. Process-budget remains mixed at With 0.50 / Without 0.00:
two judges reject one capped-versus-uncapped comparison, while one accepts its
later budget-fit condition. Manual review also retains overconfident startup
diagnosis as a limitation. The two-repair limit is exhausted. Grok admission is
held, with no Grok badge; these other passing cases do not override that hold.

### Historical maintenance

Measured 2026-10-18 on Codex CLI 0.163.0, gpt-6.1-sol subject and judge, low effort and three judge votes. Two with-only runs per case passed for `process-budget` and `slow-with-concurrency-one`, with policy activation 2/2 each. These checks cover process/container and parent fan-out budgeting plus the existing task/worker-pool distinction. They do not establish paired effect, a new runtime badge or hook behavior.
