import { readFileSync } from "node:fs";

const DIRS = { E: [0, 1], W: [0, -1], S: [1, 0], N: [-1, 0], SE: [1, 1], SW: [1, -1], NE: [-1, 1], NW: [-1, -1] };
const file = process.argv[2];
if (!file) {
  console.error("usage: node check-puzzle.mjs puzzle.json");
  process.exit(2);
}
const data = JSON.parse(readFileSync(file, "utf8"));
let failures = 0;

if (data.grid) {
  const rows = data.grid.length;
  const widths = new Set(data.grid.map((r) => r.length));
  console.log(`grid ${rows} rows, widths ${[...widths].join(",")}`);
  if (widths.size !== 1) {
    failures += 1;
    console.log("FAIL grid rows have different lengths");
  }
  for (const w of data.words ?? []) {
    const [dr, dc] = DIRS[w.dir] ?? [0, 0];
    let found = "";
    for (let i = 0; i < w.word.length; i += 1) {
      const r = w.row + dr * i;
      const c = w.col + dc * i;
      found += data.grid[r]?.[c] ?? "?";
    }
    const ok = found.toUpperCase() === w.word.toUpperCase() && dr + dc !== 0;
    if (!ok) failures += 1;
    const endR = w.row + dr * (w.word.length - 1);
    const endC = w.col + dc * (w.word.length - 1);
    console.log(`${ok ? "OK  " : "FAIL"} ${w.word} start (${w.row},${w.col}) ${w.dir} end (${endR},${endC}) reads "${found}"`);
  }
}

if (data.bars) {
  const target = data.beatsPerBar;
  data.bars.forEach((bar, i) => {
    const sum = bar.reduce((a, b) => a + b, 0);
    const ok = Math.abs(sum - target) < 1e-9;
    if (!ok) failures += 1;
    console.log(`${ok ? "OK  " : "FAIL"} bar ${i + 1} sums to ${sum} beats, needs ${target}`);
  });
}

console.log(failures === 0 ? "ALL CHECKS PASSED" : `${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
