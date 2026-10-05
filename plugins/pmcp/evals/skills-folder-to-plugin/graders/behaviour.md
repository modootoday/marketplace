---
type: llm
---

PASS only if the reply does all of these:
1. Writes .claude-plugin/marketplace.json with a name, metadata.tier set to the internal tier, and a plugins entry with name and source; and a plugin .claude-plugin/plugin.json with a description.
2. Places the skills under skills/<name>/SKILL.md, reconcile.md under commands/, auditor.md under agents/, and the server config in .mcp.json wrapped in an mcpServers object.
3. Flags that month-end-close's metadata.tier open disagrees with the internal marketplace and will be rejected, so it must be changed or removed.
4. Flags that vat-check needs a description or it will be left out.
5. Confirms with pmcp list and/or pmcp validate pointed at the marketplace.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing or if it puts the tier on the plugin manifest as the deciding field.
