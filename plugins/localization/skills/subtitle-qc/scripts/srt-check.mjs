#!/usr/bin/env node
// Usage: node scripts/srt-check.mjs <file.srt> [maxChars=42] [maxLines=2] [maxCps=17] [minDur=1]
import { readFileSync } from "node:fs";

const [file, a = "42", b = "2", c = "17", d = "1"] = process.argv.slice(2);
if (!file) {
  console.log("usage: node srt-check.mjs <file.srt> [maxChars] [maxLines] [maxCps] [minDur]");
  process.exit(1);
}
const MAX = Number(a);
const LINES = Number(b);
const CPS = Number(c);
const MIN = Number(d);

const toSec = (t) => {
  const m = /(\d+):(\d+):(\d+)[,.](\d+)/.exec(t);
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) + Number(m[4]) / 1000;
};
const fmt = (s) => {
  const ms = Math.round(s * 1000);
  const p = (n, w) => String(n).padStart(w, "0");
  return `${p(Math.floor(ms / 3600000), 2)}:${p(Math.floor(ms / 60000) % 60, 2)}:${p(Math.floor(ms / 1000) % 60, 2)},${p(ms % 1000, 3)}`;
};

const BREAK_BEFORE = new Set(
  "and but or so because that which who how when where while if with without in on at for from by about under over after before until into through".split(" "),
);
const boundaryKind = (words, i) => {
  if (/[,.;:?!]$/.test(words[i - 1])) return "after punctuation";
  if (BREAK_BEFORE.has(words[i].toLowerCase())) return `before "${words[i]}"`;
  return null;
};

function twoLineSplits(text) {
  const words = text.split(/\s+/);
  const out = [];
  for (let i = 1; i < words.length; i++) {
    const l1 = words.slice(0, i).join(" ");
    const l2 = words.slice(i).join(" ");
    if (l1.length > MAX || l2.length > MAX) continue;
    out.push({ l1, l2, kind: boundaryKind(words, i) });
  }
  return out;
}

function fitInCue(text) {
  if (text.length <= MAX) return [text];
  const s = twoLineSplits(text);
  if (!s.length || LINES < 2) return null;
  const phrase = s.filter((x) => x.kind);
  const pick = (phrase.length ? phrase : s).sort(
    (x, y) => Math.abs(x.l1.length - x.l2.length) - Math.abs(y.l1.length - y.l2.length),
  )[0];
  return [pick.l1, pick.l2];
}

const raw = readFileSync(file, "utf8").replace(/\r/g, "").trim().split(/\n\s*\n/);
const cues = raw.map((blk) => {
  const ls = blk.split("\n");
  const tm = /(\S+)\s*-->\s*(\S+)/.exec(ls[1] || "");
  return { id: ls[0], start: toSec(tm[1]), end: toSec(tm[2]), lines: ls.slice(2), sa: tm[1], ea: tm[2] };
});

console.log(`Limits: ${MAX} chars/line, ${LINES} lines/cue, ${CPS} cps, min ${MIN}s\n`);
console.log("cue | lines | line lengths | chars | dur s | cps | flags");
const flags = [];
cues.forEach((q, i) => {
  const text = q.lines.join(" ");
  const chars = q.lines.join("\n").replace(/\n/g, "").length;
  const dur = q.end - q.start;
  const cps = dur > 0 ? chars / dur : Infinity;
  const f = [];
  if (q.lines.some((l) => l.length > MAX)) f.push("LINE-LENGTH");
  if (q.lines.length > LINES) f.push("LINES");
  if (cps > CPS) f.push("CPS");
  if (dur < MIN) f.push("MIN-DURATION");
  if (dur <= 0) f.push("NON-POSITIVE-DURATION");
  const next = cues[i + 1];
  if (next && next.start < q.end) f.push(`OVERLAP with ${next.id} (${q.ea} > ${next.sa}, ${(q.end - next.start).toFixed(3)}s)`);
  console.log(`${q.id} | ${q.lines.length} | ${q.lines.map((l) => l.length).join("+")} | ${chars} | ${dur.toFixed(2)} | ${cps.toFixed(1)} | ${f.join(", ") || "ok"}`);
  flags.push({ q, text, chars, dur, f });
});

for (const { q, text, chars, dur, f } of flags) {
  if (!f.includes("LINE-LENGTH") && !f.includes("LINES")) continue;
  console.log(`\nCue ${q.id} (${chars} chars): split options`);
  const s = twoLineSplits(text);
  const phrase = s.filter((x) => x.kind);
  if (phrase.length) {
    for (const x of phrase) console.log(`  two lines, ${x.kind}: "${x.l1}" (${x.l1.length}) / "${x.l2}" (${x.l2.length})`);
  } else if (s.length) {
    console.log("  no phrase-boundary two-line split fits. Fitting splits cut mid-phrase:");
    for (const x of s) console.log(`    "${x.l1}" (${x.l1.length}) / "${x.l2}" (${x.l2.length})`);
  } else {
    console.log("  no two-line split fits within the limit");
  }
  if (!phrase.length) {
    const words = text.split(/\s+/);
    const plans = [];
    for (let i = 1; i < words.length; i++) {
      if (!boundaryKind(words, i)) continue;
      const L = fitInCue(words.slice(0, i).join(" "));
      const R = fitInCue(words.slice(i).join(" "));
      if (L && R) plans.push({ i, L, R, k: boundaryKind(words, i), d: Math.abs(L.join("").length - R.join("").length) });
    }
    plans.sort((x, y) => x.d - y.d);
    const p = plans[0];
    if (p) {
      const lc = p.L.join("").length;
      const rc = p.R.join("").length;
      const total = lc + rc;
      const gap = 0.1;
      const span = q.end - q.start - gap;
      const mid = q.start + (span * lc) / total;
      console.log(`  two-cue plan, split ${p.k} (timings are a proposal, proportional to characters):`);
      console.log(`    ${q.id}a ${fmt(q.start)} --> ${fmt(mid)}  ${p.L.map((l) => `"${l}" (${l.length})`).join(" / ")}  ${(lc / (mid - q.start)).toFixed(1)} cps`);
      console.log(`    ${q.id}b ${fmt(mid + gap)} --> ${fmt(q.end)}  ${p.R.map((l) => `"${l}" (${l.length})`).join(" / ")}  ${(rc / (q.end - mid - gap)).toFixed(1)} cps`);
    }
  }
  if (chars / dur > CPS) {
    console.log(`  reading speed still fails: ${chars} chars need ${(chars / CPS).toFixed(2)}s, cue has ${dur.toFixed(2)}s. Trim to <= ${Math.floor(CPS * dur)} chars or extend the end if the next cue allows.`);
  }
}
