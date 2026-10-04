---
expect:
  name: string
---

{
  "name": "{{input.name}}",
  "metadata": { "tier": "open", "level": "L2", "domain": "product-planning", "install": "optional" },
  "requires": {},
  "approval": "none",
  "files": [{ "uri": "skill://{{input.name}}/SKILL.md", "size": 2400 }]
}
