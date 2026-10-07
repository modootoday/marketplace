---
type: llm
---

Context the reply answers: stdio client initialized, complete list/exposure match. fetch_metadata requires artifactId, forbids extras; call with id returns JSON-RPC -32602. Same-session health succeeds. Schema-valid artifactId=missing returns result.isError=true Artifact not found. No successful metadata response. Read-only planning.

PASS only if the reply does all of these:
1. Separates successful connection/discovery/client exposure/control from the still-unverified successful metadata path; does not generalize health success to every tool or one failure to the entire server.
2. Identifies the id versus artifactId schema mismatch and proposes a harmless retry using the actual recorded name and schema, with a known existing artifact if available.
3. Distinguishes the JSON-RPC Invalid params response from the schema-valid application result.isError=true not-found result; does not classify both as the same transport failure.
4. Retains caller/session and nonsecret schema/error evidence, and labels the corrective call proposed rather than executed.

FAIL if any item is missing.
