---
type: llm
---

PASS only if the reply does all of these:
1. Proposes a logging stdio proxy between client and server that records every JSON-RPC message in both directions with timestamps.
2. Backs up each client's MCP config, points it at the proxy, and restores the original afterwards (even on failure).
3. Runs one tool call headless per client, with and without each permission flag, and judges reach from the proxy log rather than the client's output.
4. Reports per client the handshake method, protocolVersion sent, declared capabilities and the flag that allowed a headless call, with the date and client versions.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
