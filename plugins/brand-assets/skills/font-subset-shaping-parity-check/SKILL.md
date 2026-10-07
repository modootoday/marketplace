---
name: font-subset-shaping-parity-check
description: Compare approved font repertoire and shaping controls before and after subsetting using supplied binary identities and named-shaper observations. Use when character coverage or a small valid font hides lost layout behavior. Not for designing fonts, brand typography selection or a new licensing audit.
metadata:
  tier: open
  level: L3
  domain: brand-assets
  install: optional
  keywords: [font, subset, shaping, cluster, gsub, gpos]
  verified-runtimes: [codex-cli]
---

# Font subset shaping parity check

Treat requested character coverage and required shaping behavior as separate findings. A smaller loadable font with a complete cmap can still lose substitutions or positioning.

Establish permission to use and subset the supplied fonts as a prerequisite. Record original/subset hashes, requested text/codepoints, script/language, enabled features and variation coordinates. Identify subsetting options, layout closure and required GSUB/GPOS feature/script retention. Missing-character policy and a successful exit are not evidence that every requested character survived.

Compare original and subset under the same named shaper/version, input sequence, direction/script/language, features, variation coordinates and normalization policy. Record units-per-em and position coordinate frame; normalize explicitly if different rather than comparing raw advances. Make fallback use visible so another font cannot mask missing coverage or shaping. If the original baseline is absent, the preservation claim is unverified.

Match input/output cluster membership, required substitutions and mark/attachment positioning against approved controls/tolerances. Glyph IDs can renumber during subsetting: compare mapped semantic output and positions, not raw cross-font numeric IDs. An authorized feature-off rendering need not reproduce feature-on ligatures. Keep renderer-specific evidence separate from all-app compatibility.

Return repertoire coverage, required feature/cluster/position parity, exact environment and unresolved branches. ASCII previews, file size or successful subset exit alone establish neither non-BMP coverage nor complex-script parity. Request the missing corpus/features/original control/shaper/frame/fallback observations without running tools or modifying fonts unless authorized. Propose retained closure/features and controlled receiving checks only for an actual finding.

[FontTools subset](https://fonttools.readthedocs.io/en/latest/subset/) separates character and layout retention controls; [HarfBuzz clusters](https://harfbuzz.github.io/clusters.html) explains character-to-output relationships. Historical failures are not current product guarantees or defects.
