---
type: llm
---

Context the reply answers: an earlier datalab_call returned {"status": "awaiting_confirm", "ticket": "T-5521"} and the user asked whether to send that call again. The extension's MCP tools include datalab_confirm_status, datalab_browsers and datalab_session_state.

PASS only if the reply does all of these:
1. Says not to resend the original call and to check the ticket T-5521 with datalab_confirm_status instead.
2. Says to check the target browser or session (datalab_browsers or datalab_session_state) before making the real booking call.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
