# gis

## What it does

Checks and plans for GIS data work: raster NoData and integer scaling, geometry validity and merges, label expressions and spatial views, slope areas from contours, and open replacements for licensed tools. Each skill states the CRS and units it assumes and what you must confirm in your own GIS tool, and gives no figures beyond the ones you paste.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Node.js only for the two bundled calculators (`scale-check.mjs`, `slope-classes.mjs`); the skills themselves need nothing.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install gis@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add gis@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `raster-nodata-and-scaling` | shrinking or trimming a float raster: NoData kept apart from valid zero, integer scale from the tolerance with a calculator, NoData code, round trip, extent and tiled-run comparison. Rests on three reports |
| skill | `gis-geometry-repair-and-validate` | validity counts by error type, one CRS and one field mapping across layers, named repair method, before and after area, border gaps, repair log. Rests on two reports |
| skill | `gis-expression-and-view-authoring` | QGIS or ArcGIS label expressions and PostGIS views written against a quoted schema, NULL handling, sample-row tests, largest-overlap joins, SRID and cardinality checks. Rests on two reports |
| skill | `gis-slope-area-from-contours` | area per slope class from contours: interpolation and cell size, percent versus degrees, projected-CRS areas, class-sum check, contour-interval limit. Rests on one report |
| skill | `gis-tool-substitution` | replacing a licensed GIS analysis with an open tool: parameter mapping, differing defaults, CRS, test-area comparison, no claim of equivalence. Rests on one report |

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin. The calculators print to the terminal and write nothing.

## Verify

Ask for something the plugin covers:

```
I have a Float64 temperature raster, -30 to 45 C, tolerance 0.05, NoData -9999 and a valid zero border. How do I shrink and trim it safely?
```

The plugin ships an eval suite (`claude plugin eval plugins/gis --no-publish`).
Scores are the share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- |
| `raster-scale-trim` | raster-nodata-and-scaling | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005) |
| `geometry-merge-three-counties` | gis-geometry-repair-and-validate | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005; without arm measured before the final SKILL.md edit) |
| `label-and-parcel-zone-view` | gis-expression-and-view-authoring | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005) |
| `slope-classes-120ha` | gis-slope-area-from-contours | 0.25 | 1.00 | 2 | Sonnet, Sonnet (20261005) |
| `viewshed-open-substitute` | gis-tool-substitution | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005) |

Each skill has one case; two more per skill are needed for the three-case release gate.

## License

MIT
