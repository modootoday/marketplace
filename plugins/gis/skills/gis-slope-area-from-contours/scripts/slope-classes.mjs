#!/usr/bin/env node
// Usage: node slope-classes.mjs <interval_m> <break1,break2,...> [study_ha] [class_ha,class_ha,...]
// Percent-slope breaks to degrees and contour spacing, vertical error sensitivity, class-sum check.
const [intervalArg, breaksArg, studyArg, classArg] = process.argv.slice(2);
const interval = Number(intervalArg);
const breaks = (breaksArg || "").split(",").map(Number).filter(Number.isFinite);
if (!(interval > 0) || breaks.length === 0) {
  console.log("usage: node slope-classes.mjs <interval_m> <break1,break2,...> [study_ha] [class_ha,class_ha,...]");
  process.exit(2);
}
console.log("percent slope = rise / run x 100; degrees = atan(rise / run)");
console.log("break % | degrees | contour spacing for that slope (m) | slope change per +-half-interval vertical error at that spacing");
for (const b of breaks) {
  const deg = (Math.atan(b / 100) * 180) / Math.PI;
  const spacing = interval / (b / 100);
  const sens = ((interval / 2) / spacing) * 100;
  console.log(`${b} | ${deg.toFixed(2)} | ${spacing.toFixed(1)} | +-${sens.toFixed(1)} percentage points`);
}
const labels = [];
labels.push(`under ${breaks[0]}%`);
for (let i = 1; i < breaks.length; i++) labels.push(`${breaks[i - 1]}-${breaks[i]}%`);
labels.push(`over ${breaks[breaks.length - 1]}%`);
console.log(`classes: ${labels.join(" | ")}`);
if (studyArg && classArg) {
  const study = Number(studyArg);
  const parts = classArg.split(",").map(Number);
  const sum = parts.reduce((a, b) => a + b, 0);
  const diff = sum - study;
  console.log(`class sum ${sum.toFixed(2)} ha vs study area ${study} ha: difference ${diff.toFixed(2)} ha (${((diff / study) * 100).toFixed(2)} %)`);
  console.log(Math.abs(diff / study) <= 0.005 ? "sum check passed at 0.5 %" : "sum check FAILED at 0.5 %: look for NoData cells, edge cells outside the contours or a CRS area mismatch");
}
