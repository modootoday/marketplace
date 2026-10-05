#!/usr/bin/env node
// Recompute stitch counts per round or row of a crochet or knit pattern and flag missing joins.
// Usage: node count-rows.mjs pattern.txt   (or pipe the pattern on stdin)
import { readFileSync } from "node:fs";

const input = process.argv[2] ? readFileSync(process.argv[2], "utf8") : readFileSync(0, "utf8");

const ROW = /\b(?:R(?:nd|ow)?|Row|Rnd)\s*(\d+)(?:\s*[-–]\s*(?:R(?:nd|ow)?\s*)?(\d+))?\s*:\s*(.*)$/i;
const HEADER = /^\s*([A-Z][A-Z ]{1,30}?)\s*(\(\s*make\s+(\d+)\s*\))?\s*:?\s*$/;
const MAKES = { sc: 1, hdc: 1, dc: 1, tr: 1, k: 1, p: 1, st: 1, inc: 2, kfb: 2, pfb: 2, m1: 1 };
const EATS = { m1: 0, inc: 1, kfb: 1, pfb: 1 };
const DECS = new Set(["dec", "sc2tog", "k2tog", "p2tog", "ssk", "dc2tog", "hdc2tog"]);

function unit(token) {
  const m = token.trim().match(/^(\d+)?\s*([a-z0-9]+)\b/i);
  if (!m) return null;
  const n = m[1] ? Number(m[1]) : 1;
  const name = m[2].toLowerCase();
  if (DECS.has(name)) return { eat: 2 * n, make: n, name };
  if (name in MAKES) return { eat: n * (EATS[name] ?? 1), make: n * MAKES[name], name };
  return null;
}

function parseBody(body) {
  const stated = body.match(/\((\d+)\)\s*\.?\s*$/);
  const text = body.replace(/\(\d+\)\s*\.?\s*$/, "").trim();
  const info = { stated: stated ? Number(stated[1]) : null, text, kind: "unknown" };
  if (/\b(?:MR|magic ring|magic circle)\b/i.test(text)) {
    const u = unit(text);
    if (u) return { ...info, kind: "start", eat: 0, make: u.make, repeat: text };
  }
  if (/\baround\b|\bacross\b|\bin each\b/i.test(text) && !/\)\s*x\s*\d+/.test(text)) {
    return { ...info, kind: "plain" };
  }
  const rep = text.match(/\(([^)]*)\)\s*x\s*(\d+)/i);
  const solo = text.match(/^([a-z0-9]+)\s*x\s*(\d+)/i);
  const parts = rep ? rep[1].split(",") : solo ? [solo[1]] : null;
  const times = rep ? Number(rep[2]) : solo ? Number(solo[2]) : null;
  if (!parts) return info;
  let eat = 0;
  let make = 0;
  for (const p of parts) {
    const u = unit(p);
    if (!u) return info;
    eat += u.eat;
    make += u.make;
  }
  return { ...info, kind: "repeat", eat, make, times, repeat: rep ? rep[0] : text };
}

const lines = input.split(/\r?\n/);
const sections = [];
let cur = { name: "(start)", qty: 1, lines: [] };
for (const line of lines) {
  const h = line.match(HEADER);
  if (h && !ROW.test(line)) {
    sections.push(cur);
    cur = { name: h[1].trim(), qty: h[3] ? Number(h[3]) : 1, lines: [] };
    continue;
  }
  cur.lines.push(line);
}
sections.push(cur);

const wholeText = input.toLowerCase();
const issues = [];
const parts = [];

for (const sec of sections) {
  if (!sec.lines.some((l) => l.trim())) continue;
  console.log(`\n${sec.name} (qty ${sec.qty})`);
  let prev = null;
  let lastTotal = null;
  let fastened = false;
  for (const raw of sec.lines) {
    const chain = raw.match(/\bch\s*(\d+)\b.*\b(?:2nd|second)\s+ch\b/i);
    if (chain) {
      const stated = raw.match(/\((\d+)\)\s*\.?(?:\s*Fasten.*)?$/);
      const got = Number(chain[1]) - 1;
      const bad = stated && Number(stated[1]) !== got;
      console.log(`  Ch ${chain[1]}, worked from 2nd ch: ${chain[1]} - 1 = ${got}${stated ? ` | stated ${stated[1]}` : ""} ${bad ? "MISMATCH" : "ok"}`);
      if (bad) issues.push(`${sec.name}: chain of ${chain[1]} from the 2nd ch gives ${got}, stated ${stated[1]}`);
      lastTotal = got;
    }
    if (/fasten off/i.test(raw)) fastened = true;
    const m = raw.match(ROW);
    if (!m) continue;
    const from = Number(m[1]);
    const to = m[2] ? Number(m[2]) : from;
    const row = parseBody(m[3].replace(/(\(\d+\))\s*\..*$/, "$1"));
    for (let r = from; r <= to; r++) {
      const label = `R${r}`;
      let made;
      let note = "";
      if (row.kind === "start") {
        made = row.make;
        note = `start: ${row.make}`;
      } else if (row.kind === "plain") {
        made = prev ?? row.stated;
        note = prev === null ? `plain, previous total unknown, taking stated ${row.stated}` : `plain: consumes ${prev}, makes ${prev}`;
      } else if (row.kind === "repeat") {
        const eats = row.eat * row.times;
        made = row.make * row.times;
        note = `${row.repeat}: eats ${row.eat} x ${row.times} = ${eats}, makes ${row.make} x ${row.times} = ${made}`;
        if (prev !== null && eats !== prev) {
          note += ` | consumes ${eats} but previous total is ${prev}`;
          issues.push(`${sec.name} ${label}: repeat consumes ${eats}, previous total is ${prev}`);
        }
      } else {
        console.log(`  ${label}: could not parse "${m[3]}" - count it by hand`);
        prev = row.stated;
        continue;
      }
      const bad = row.stated !== null && row.stated !== made;
      if (bad) issues.push(`${sec.name} ${label}: repeats give ${made}, stated ${row.stated}`);
      console.log(`  ${label}: ${note} | total ${made}${row.stated !== null ? ` | stated ${row.stated} ${bad ? "MISMATCH, use " + made : "ok"}` : ""}`);
      prev = made;
      lastTotal = made;
    }
  }
  const body = sec.lines.join(" ").toLowerCase();
  const attach = /\b(sew|sewn|attach|join|joined|stitch(?:ed)? (?:it )?to|slip stitch (?:it )?to|work(?:ed)? (?:on|into|from) the)\b/.test(body);
  const named = sec.name.toLowerCase().replace(/s$/, "");
  const mentioned = new RegExp(`(?:sew|attach|join)[^.\\n]*\\b${named}`, "i").test(wholeText);
  parts.push({ name: sec.name, qty: sec.qty, end: lastTotal, fastened, attach: attach || mentioned });
}

console.log("\nParts");
for (const p of parts) {
  const miss = !p.attach;
  console.log(`  ${p.name}: qty ${p.qty}, last total ${p.end ?? "?"}, ${miss ? "NO ATTACH OR JOIN STEP" : "attach or join found"}`);
  if (miss && p.name !== "(start)") issues.push(`${p.name}: no attach or join step`);
  if (p.fastened && p.end > 6 && miss) issues.push(`${p.name}: fastened off with ${p.end} open stitches and no closing or sewing step`);
}

console.log(`\n${issues.length} issue(s)`);
for (const i of issues) console.log(`  - ${i}`);
console.log("Arithmetic only: nothing was stitched. List the parts you expected and compare quantities by hand.");
