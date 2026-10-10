---
name: product-demo-capability-evidence-map
description: Map product demo claims and UI steps to versioned support documentation, observed operations and explicitly simulated scenes. Use when a script or app recreation may show unsupported features, confuse local and cloud modes or imply a successful operation without a receipt. Not for market research, executing the demo or certifying a product from mock screens.
metadata:
  tier: open
  level: L3
  domain: video-production
  install: optional
  keywords:
    [
      demo evidence,
      supported features,
      product claims,
      UI flow,
      simulated demonstration,
    ]
  verified-runtimes: [codex-cli]
---

# Product demo capability evidence map

Support documentation, a screenshot and a simulated animation establish different things.
Trace scene claims to their own evidence before polishing the demonstration.

## Bound the target

Record the product/version, host or platform, local/cloud mode, account permissions and date
relevant to the demonstrated workflow. When unknown, retain the uncertainty. Do not infer
current support from a past release or carry desktop behavior into a browser surface.

Use supplied evidence first. For an actual investigation, check current official documentation
and the installed UI/version with authorized read-only tools. Record source location and date.
If no MCP is available, use files or pasted output; never guess tool names, arguments or supported operations.

## Classify and map

1. Split each scene into claims: selecting the app, choosing a workspace, reading materials,
   proposing output, saving, scheduling or publishing. A combined 'saved and published' needs
   evidence for both operations, not a single reassuring spinner.
2. Label evidence documented, observed, simulated or unconfirmed. A document supports its stated
   scope; an observation supports the recorded operation; simulated screens establish neither.
   Keep evidence IDs so another reader can inspect the exact claim-source relationship.
3. Track preconditions per claim: mode, selected folder/file, permission, login, user approval,
   or target revision. An app mention or selection alone does not prove filesystem permission.
4. Compare the actual UI steps with the scene, including what the user supplies and confirms.
   A visible result does not establish a successful write, durable save or external publication
   without the relevant receipt or subsequent state observation.
5. Correct unsupported narration, on-screen text and implied actions together. Keep the natural
   supported user benefit, but do not conceal the limitation in an appendix while the screen claims success.
6. For stronger claims, identify the minimum missing evidence and next observation. Do not execute
   external actions or reproduce private materials merely to make the demonstration look complete.

## Output

Return target/version/mode/date, a capability table and a scene map:

| Scene and claim | Preconditions | Evidence ID and location | Evidence kind | Supported scope | Correction or missing check |
| --------------- | ------------- | ------------------------ | ------------- | --------------- | --------------------------- |

Separate a documented capability from a demonstrated operation and both from synthetic staging.
Include the unconfirmed claims and release-blocking corrections. The output is a review contract,
not an execution receipt, adoption measurement or assurance that a mock screen represents the product.
