# Worked configs

Synthetic layouts, different from any eval prompt.

## Go services under svc/

Layout: `svc/billing/go.mod`, `svc/search/go.mod`, root `Makefile`.

```json
{ "marker": "go.mod", "command": "go vet ./...", "debounceSeconds": 45 }
```

An edit to `svc/search/main.go` runs `go vet` in `svc/search` only. An edit to
the root `Makefile` resolves to the root and is skipped.

## Python libs with slow tests

Packages have `pyproject.toml` but a full test run takes three minutes. Use a fast
check as `command` (`python -m compileall -q .`), raise `debounceSeconds` to 120,
and leave the full suite to CI.

## Reading a report

Message: "The package at libs/parse fails its own check after this edit" plus a
type error. Fix `libs/parse`, rerun `python -m compileall -q .` there, report the
result and that other libs were not checked.
