# Merge example

Scenario (synthetic): three agents each add a translation bundle to a documentation site. The site has
one shared file, `site/bundles.json`, listing every bundle with a `version`, and one build cache.

## Inventory

| Resource | Owner |
| --- | --- |
| `content/<lang>/**` | one agent per language, disjoint |
| `site/bundles.json` | coordinator |
| build cache `.cache/` | per-agent copy, or serialized builds |

## Pending file, one per agent: `pending/<lang>.json`

```
{
  "add": [{ "name": "fr", "version": "1.0.0", "path": "content/fr" }],
  "update": [{ "target": "shared-glossary", "field": "version", "from": "2.3.0", "to": "2.4.0" }]
}
```

## Merge outline (coordinator, serial)

```
for each pending file in sorted order:
  for each add: if bundles has name:
                  if same content: skip (already merged)
                  else: record CONFLICT, do not write
                else: append
  for each update: if current[target][field] == from: set to  (record APPLIED)
                   elif current == to: record ALREADY
                   else: record STALE (someone changed it)
write bundles.json once; run the site check once on the result.
```

Two agents both asking to move `shared-glossary` from 2.3.0 to 2.4.0 produce one APPLIED and one
ALREADY, never 2.5.0. Re-running the whole merge reports only SKIP and ALREADY and leaves the file
byte-identical.
