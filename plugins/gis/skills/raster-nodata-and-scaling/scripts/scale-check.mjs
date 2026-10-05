#!/usr/bin/env node
// Usage: node scale-check.mjs <min> <max> <tolerance> [bits=16] [signed=1]
// Picks integer scale factors for storing a float raster and checks the round trip.
const [min, max, tol, bitsArg, signedArg] = process.argv.slice(2).map(Number);
if ([min, max, tol].some((v) => !Number.isFinite(v)) || tol <= 0 || max < min) {
  console.log("usage: node scale-check.mjs <min> <max> <tolerance> [bits=16] [signed=1]");
  process.exit(2);
}
const bits = Number.isFinite(bitsArg) ? bitsArg : 16;
const signed = signedArg === 0 ? false : true;
const lo = signed ? -(2 ** (bits - 1)) : 0;
const hi = signed ? 2 ** (bits - 1) - 1 : 2 ** bits - 1;
const nodataCode = lo;
const usableLo = lo + 1;
console.log(`type: ${signed ? "int" : "uint"}${bits}, codes ${lo}..${hi}, code ${nodataCode} reserved for NoData`);
console.log(`value range ${min}..${max}, tolerance +-${tol}`);
console.log("scale | max rounding error | stored range | fits | within tolerance");
const candidates = [1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01, 0.005, 0.002, 0.001, 0.0005, 0.0001];
let best = null;
for (const scale of candidates) {
  const offset = signed ? 0 : min;
  const a = Math.round((min - offset) / scale);
  const b = Math.round((max - offset) / scale);
  const fits = a >= usableLo && b <= hi;
  const err = scale / 2;
  const ok = err <= tol;
  console.log(`${scale} | ${err} | ${a}..${b} | ${fits ? "yes" : "NO"} | ${ok ? "yes" : "NO"}`);
  if (fits && ok && !best) best = scale;
}
if (!best) {
  console.log("no candidate fits: use a wider integer type or a coarser tolerance agreed with the data owner");
  process.exit(1);
}
const margin = candidates.find((s) => {
  const a = Math.round(min / s);
  const b = Math.round(max / s);
  return a >= usableLo && b <= hi && s / 2 <= tol / 10 + 1e-12;
});
console.log(`coarsest scale at the tolerance edge: ${best} (error equals the tolerance, no margin for later processing)`);
console.log(`recommended scale with a 10x margin: ${margin ?? "none fits"}`);
if (margin) best = margin;
let worst = 0;
const n = 2001;
for (let i = 0; i < n; i++) {
  const v = min + ((max - min) * i) / (n - 1);
  const back = Math.round(v / best) * best;
  worst = Math.max(worst, Math.abs(back - v));
}
console.log(`round trip over ${n} evenly spaced values at scale ${best}: worst error ${worst.toPrecision(3)}`);
console.log(`NoData: write code ${nodataCode} and set it as the band NoData value; do not reuse the old float NoData number as a data code`);
