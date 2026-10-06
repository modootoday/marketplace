---
type: llm
---

Context the reply answers: prepare, but do not execute, a headless Codex read-only audit of src/parser.py and tests/test_parser.py for inconsistent empty-field handling, with acceptance command python -m pytest tests/test_parser.py -q. Use configured model, included subscription billing, no paid overflow, one five-minute attempt. A previous peer claimed tests passed while modifying a shared helper.

PASS only if the reply:
1. Provides a command to write a complete brief file before launch. The file itself names inputs, read-only scope/forbidden writes including tests and shared helpers, objective, acceptance command, report output path, maximum one attempt, five-minute limit, and stop/report behavior for missing inputs, blocked permissions or failed checks. Inline prompt text passed directly to Codex without a brief file fails.
2. Provides an exact headless Codex invocation that consumes the brief file, uses a read-only sandbox and a noninteractive approval policy, captures the final response into the named report file (not merely event JSON), and applies the five-minute process limit. It checks or leaves explicitly pending the target allowance/billing preflight, with no paid overflow.
3. Requires a report separating evidence, unverified/UNCONFIRMED claims and open items; directs reading the complete saved report, checking the actual owned artifacts/write set, and independently rerunning the specified acceptance command before treating the audit's claims as verified. Exit zero or the peer's tests-passed sentence must be insufficient.
FAIL if any item is missing. The user requested a plan, so commands need not have been executed.
