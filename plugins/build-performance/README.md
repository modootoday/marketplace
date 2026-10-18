# build-performance

Compare builds and preserve tool contracts using repository-specific commands or supplied evidence. These skills do not install or choose a runner automatically.

## Skills

| Skill                             | Level | Result                                                      |
| --------------------------------- | ----- | ----------------------------------------------------------- |
| `build-benchmark-controls`        | L3    | Comparable cache states and effective invalidation controls |
| `optimization-portability-review` | L3    | CI, resource and workspace compatibility findings           |
| `toolchain-equivalence-pilot`     | L3    | Consumer/output parity and adopt, keep or hold decision     |

## Measurement scope

Measured on Codex CLI 0.163.0 with gpt-6.1-sol as subject and judge, low effort, two subject runs per arm and three judge votes per behavior grader. Paired rows score observable advice on self-contained synthetic JavaScript/TypeScript workspace cases. They do not certify a runner's speed, real repository execution or untested operating systems.

Both arms passing is regression coverage, not demonstrated improvement. Each released skill has at least one paired case with With 1.00, Without below 1.00 and activation 2/2. Earlier invalid or failed attempts are retained in release evidence; they are not overwritten by final results or used to claim an effect.

### Other runtimes

| Runtime   | Model       | Case                         | Skill                           | Without | With | Fired | Date       |
| --------- | ----------- | ---------------------------- | ------------------------------- | ------- | ---- | ----- | ---------- |
| Codex CLI | gpt-6.1-sol | `benchmark-output-preserved` | build-benchmark-controls        | 0.50    | 1.00 | 2/2   | 2026-10-18 |
| Codex CLI | gpt-6.1-sol | `benchmark-root-control`     | build-benchmark-controls        | 1.00    | 1.00 | 2/2   | 2026-10-18 |
| Codex CLI | gpt-6.1-sol | `benchmark-layer-matrix`     | build-benchmark-controls        | 0.00    | 1.00 | 2/2   | 2026-10-18 |
| Codex CLI | gpt-6.1-sol | `portability-ci`             | optimization-portability-review | 1.00    | 1.00 | 2/2   | 2026-10-18 |
| Codex CLI | gpt-6.1-sol | `portability-scope`          | optimization-portability-review | 0.00    | 1.00 | 2/2   | 2026-10-18 |
| Codex CLI | gpt-6.1-sol | `portability-glob-oracle`    | optimization-portability-review | 0.00    | 1.00 | 2/2   | 2026-10-18 |
| Codex CLI | gpt-6.1-sol | `equivalence-formatter`      | toolchain-equivalence-pilot     | 0.00    | 1.00 | 2/2   | 2026-10-18 |
| Codex CLI | gpt-6.1-sol | `equivalence-bundler`        | toolchain-equivalence-pilot     | 1.00    | 1.00 | 2/2   | 2026-10-18 |
| Codex CLI | gpt-6.1-sol | `equivalence-application`    | toolchain-equivalence-pilot     | 1.00    | 1.00 | 2/2   | 2026-10-18 |

### Boundaries

| Case                        | Expected activation | Observed activation | Quality | Runs         |
| --------------------------- | ------------------- | ------------------- | ------- | ------------ |
| `benchmark-missing-input`   | 2/2                 | 2/2                 | 1.00    | 2, with only |
| `benchmark-neighbor`        | 0/2                 | 0/2                 | 1.00    | 2, with only |
| `portability-missing-input` | 2/2                 | 2/2                 | 1.00    | 2, with only |
| `portability-neighbor`      | 0/2                 | 0/2                 | 1.00    | 2, with only |
| `equivalence-missing-input` | 2/2                 | 2/2                 | 1.00    | 2, with only |
| `equivalence-neighbor`      | 0/2                 | 0/2                 | 1.00    | 2, with only |

Boundary checks are with-only maintenance, not paired effect evidence. Runtime verification is derived from the recorded paired cases; no result is transferred to another runtime.
