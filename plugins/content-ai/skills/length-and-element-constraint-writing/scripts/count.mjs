import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("usage: node count.mjs <file>");
  process.exit(2);
}

const text = readFileSync(file, "utf8");
const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim());
const words = (s) => (s.match(/\S+/g) ?? []).length;
const minutes = (n, wpm) => (n / wpm).toFixed(1);

let total = 0;
paragraphs.forEach((p, i) => {
  const n = words(p);
  total += n;
  console.log(`paragraph ${i + 1}: ${n} words`);
});

const chars = text.replace(/\n/g, " ").trim();
console.log(`total words: ${total}`);
console.log(`characters with spaces: ${chars.length}`);
console.log(`characters without spaces: ${chars.replace(/\s/g, "").length}`);
console.log(`estimated read-aloud minutes at 130 wpm: ${minutes(total, 130)}`);
console.log(`estimated read-aloud minutes at 110 wpm: ${minutes(total, 110)}`);
