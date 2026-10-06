---
name: test-fixture-and-mock-build
description: Build test support that stays honest - an API mock written from the API definition with its error statuses, pagination and latency, a fixture that takes and releases a port and proves recovery, and a test-runtime speedup that keeps every assertion and reports time before and after. Use when a developer asks for a realistic mock, a port-occupying or resource-holding fixture, or faster tests that reload large data. Not for deciding which cases to write, choosing a framework, or load testing a live service.
metadata:
  tier: open
  level: L2
  domain: software-qa
  install: optional
  keywords: [api mock, test fixture, port conflict, test speed, large json, teardown, assertions]
  verified-runtimes: [claude-code]
---

# Test fixture and mock build

Practitioners report three recurring chores: a mock that is too happy-path to catch real client bugs, a fixture that occupies a port to provoke an error, and a suite slowed by recomputing large data. Each can quietly weaken the tests, so build them with the checks below.

## Steps

1. List the inputs given: API definition or schema, the tests, the data, the port or resource, the timings. Anything not given is not assumed; name what you would need.
2. Mock from the definition, not from memory. For every operation, cover each documented status (success and every error status listed), the response shape for each, and pagination edges (empty page, last page) and rate-limit or retry headers when the definition names them. Add a latency knob so timeout and retry paths can run. A status the definition does not list is marked as an assumption.
3. Port or resource fixture: acquire in setup, release in teardown even when the test fails (try/finally or the framework's finalizer), and bind to a port the OS picks or a stated range so parallel runs do not collide. Add a check after release that the port is free again (a second bind succeeds), because recovery is the point of the fixture.
4. Speedup: keep the assertions byte for byte. Remove repeated work (load once per session or module, share read-only; copy or reset anything a test mutates). Say which tests mutate shared data and how isolation is kept. Measure before and after with the same command and report both numbers; an estimate is not a measurement. When nothing has been run, write "not measured", give the command, and do not predict the new runtime in minutes or as a ratio.
5. State what the mock or fixture cannot prove (real service behaviour, real network timing) and name one test against the real service or a contract check that would.

## Output

The mock (or its table of operation, status, body), the fixture with setup and teardown and the recovery check, the speedup diff with the unchanged-assertions statement, the before and after times (measured, or marked not yet run with the command to run), and the list of assumptions.
