---
name: fabrication-vector-import-intent-check
description: Compare SVG or DXF physical geometry and approved cut, engrave and non-output roles with recipient import observations. Use when CAD layers collapse, vector sizes change or a browser preview is offered as fabrication proof. Not for machine commands, power settings or safety certification.
metadata:
  tier: open
  level: L3
  domain: engineering
  install: optional
  keywords: [svg, dxf, fabrication, process layers, physical bounds, import]
  verified-runtimes: [codex-cli]
---

# Fabrication vector import intent check

A correct browser render or an editable source layer is not a verified manufacturing operation. Compare physical geometry and source entity intent with the recipient's actual imported geometry and process assignments.

## Establish approved geometry and roles

Record exact source artifact, entity IDs, approved physical bounds, independent datums, tolerance and roles: cut, engrave or non-output. Colors and source layer names are evidence, not automatic authorization for a process. Do not invent cutting intent for unspecified entities.

For SVG, retain viewport dimensions/units, viewBox and nested transforms. For DXF, retain declared units, entity coordinates and relevant layer/color attributes. Identify the recipient/version/import route and unit detection/fallback, DPI, centering/original-position and path-closing settings where applicable.

## Compare independent contracts

Connect source coordinates to physical bounds in a stated common frame. Do not infer success from an overall shape or scale label. Check datums/positions as well as extents; imported centering can retain size but alter location.

Build an entity-to-recipient-layer crosswalk with mode and output-enabled state. Source CAD layers may be mapped by color, and stroke/fill rules or palette mappings may merge intended processes. Verify cut, engrave and non-output roles independently of geometric parity.

Record altered closure, duplicate paths or unsupported/text entities when evidenced. A settings label is not a successful import result. Do not fix physical scale by eye or assume a single enabled layer is acceptable because the geometry remains visible.

## Output and stopping conditions

Return entity/physical bounds/datums/source role/recipient layer/mode/output-state findings, dimension deltas and inspection gaps. A scale mismatch and unintended process collapse are separate blockers.

If only a browser preview exists, report rendering evidence and leave fabrication fidelity unverified. Request approved physical controls, process-role table and recipient settings/import report. If evidence is supplied, call it supplied rather than claiming that an application or machine ran.

Hold the proposed handoff when a non-output datum becomes enabled or an engrave entity becomes cut. Any correction needs owner-approved intent and subsequent authorized saved-import verification; inspection-only requests do not authorize edits or machine execution.

No power/speed instructions, machine commands or manufacturing safety certification. [SVG coordinate contract](https://www.w3.org/TR/SVG2/coords.html) defines coordinate mapping; [LightBurn settings](https://docs.lightburnsoftware.com/latest/Reference/SettingsPreferences/) describes relevant import settings. Actual recipient behavior and operation roles still require evidence.
