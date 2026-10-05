#!/usr/bin/env node
// Usage: node scripts/transcript-scan.mjs <file>
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.log("usage: node transcript-scan.mjs <file>");
  process.exit(1);
}
const lines = readFileSync(file, "utf8").replace(/\r/g, "").split("\n");

const rules = [
  ["look-alike token", /[\w/.-]*(?:\d[\w/.-]*[lIOSB]|[lIOSB][\w/.-]*\d)[\w/.-]*/g],
  ["number with unit", /\b[0-9OolI][0-9OolI.,]*\s?(?:mg|g|kg|mcg|ml|l|iu|units?|%|usd|krw|won|dollars?)\b/gi],
  ["date", /\b[0-9OolI]{1,4}[/.-][0-9OolI]{1,2}[/.-][0-9OolI]{2,4}\b/g],
  ["date without year", /(?<![\w/.-])[0-9OolI]{1,2}\/[0-9OolI]{1,2}(?![\w/-]|\.\d|\s?(?:of|ths?)\b)/g],
  ["time", /\b\d{1,2}:\d{2}(?::\d{2})?\b/g],
  ["spelled number", /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|forty|fifty|hundred|thousand)(?:\s(?:hundred|thousand))?\b/gi],
  ["weekday", /\b(?:mon|tues|wednes|thurs|fri|satur|sun)day\b/gi],
  ["negation", /\b(?:no|not|denies|without|never|none|cannot|can't|didn't|don't)\b/gi],
  ["unintelligible", /\((?:unintelligible|inaudible)\)|\[(?:unintelligible|inaudible)[^\]]*\]|\[\.\.\.\]/gi],
];

console.log(`File: ${file} (${lines.length} lines; locators below are line numbers of this file)\n`);
for (const [i, line] of lines.entries()) {
  if (!line.trim()) continue;
  const hits = [];
  for (const [kind, re] of rules) {
    for (const m of line.matchAll(re)) hits.push(`${kind}: ${m[0]}`);
  }
  const day = /\b(mon|tues|wednes|thurs|fri|satur|sun)day\b/i.exec(line);
  if (day && hits.some((h) => h.startsWith("date"))) {
    hits.push(`weekday ${day[0]} next to a numeric date: check they agree and which of month/day comes first`);
    const full = /\b(\d{4})-(\d{1,2})-(\d{1,2})\b|\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/.exec(line);
    if (full) {
      const [y, m, d] = full[1] ? [full[1], full[2], full[3]] : [full[6], full[4], full[5]];
      const actual = new Date(Date.UTC(+y, +m - 1, +d)).getUTCDay();
      const said = ["sun", "mon", "tues", "wednes", "thurs", "fri", "satur"].indexOf(day[1].toLowerCase());
      if (actual !== said) hits.push(`weekday mismatch: ${full[0]} (read as ${y}-${m}-${d}) falls on a different weekday than ${day[0]}`);
    }
  }
  if (hits.length) console.log(`line ${i + 1}: ${line.trim()}\n    ${hits.join(" | ")}`);
}

console.log("\nSpeaker labels");
let prev = null;
for (const [i, line] of lines.entries()) {
  const m = /^\s*(?:\[([^\]]+)\]\s*)?([A-Za-z][\w ]{0,20}?):\s*(.*)$/.exec(line);
  if (!m || /^(L|l|line|p)\d+$/.test(m[2])) continue;
  const asks = /\?\s*$/.test(m[3]);
  const note = prev && prev.who === m[2] && prev.asks ? "  <- same label answers a question (line " + prev.n + ")" : "";
  console.log(`line ${i + 1}: ${m[1] || "-"} ${m[2]}${asks ? " (question)" : ""}${note}`);
  prev = { who: m[2], asks, n: i + 1 };
}
