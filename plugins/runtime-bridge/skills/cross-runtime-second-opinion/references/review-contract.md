# Review contract

Write a brief with the original objective and acceptance condition, exact artifact version,
raw source files or excerpts, owned read set, forbidden writes, one launch, stop conditions,
time and enforced spend caps, and report output path. Omit the first agent's conclusion until
the reviewer has produced its own findings.

Ask for an adversarial review: construct a minimal counterexample, probe the boundary cases,
test assumptions against the actual API or schema, and show how to reproduce every finding.

| Finding | Severity | Artifact/location | Reproduction input/command | Expected | Actual | Evidence status |
| --- | --- | --- | --- | --- | --- | --- |
| Concrete falsifiable issue | blocking, major or minor | File/line or source section | Runnable probe | Contract | Observation or pending | peer-reported or UNCONFIRMED |

The report must also state what it could not check and its actual usage. A reviewer unable to
execute must not label a proposed probe's expected output as observed.

The parent builds a separate ledger of the peer's stance, its own reproduced result, and final
disposition. Reproduce findings and original acceptance on the frozen artifact. Two agreeing
reviews remain two opinions until an independent observation supports the claim. If only a
plan is authorized, give the exact runnable check, mark the claim `UNCONFIRMED`, and make the
release decision conditional on the actual check result.
