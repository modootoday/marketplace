---
type: llm
---

Context the reply answers: prepare a Grok CLI second opinion for adapter.py and vendor-contract.json, read-only, one three-minute included-allowance attempt, no paid overflow, no execution here. Adapter declared_schema returns tool.get("output_schema", {}), while the frozen vendor contract's tool uses outputSchema with a nonempty object schema. Acceptance is preservation of the declared schema exactly. Two models already agreed it looks compatible; user asks if a third agreeing model is enough for release.

PASS only if the reply:
1. Provides a command writing a complete adversarial review brief file plus a headless Grok launch capturing a named result file. The brief includes raw artifact paths, exact schema-preservation acceptance, read-only scope, one-attempt/three-minute stop conditions and request for a counterexample/reproduction with expected versus actual behavior. It must not include the prior approving verdict as a cue to the reviewer.
2. Directs reading the full review file and independently executing a concrete runnable local probe that loads the frozen contract, calls the adapter on its tool, and asserts equality against outputSchema. Code or an exact test command with a supplied test body qualifies. Merely saying run tests does not. It identifies that the underscore/camel-case mismatch would cause an empty schema.
3. Rejects agreement as release evidence and separates peer stance from independently observed verification. Because execution is deferred, explicitly keeps compatibility/release UNCONFIRMED or pending the observed probe, even if Grok agrees; does not label the proposed failure as a result already observed.
FAIL if any item is missing.
