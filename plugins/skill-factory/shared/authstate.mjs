// Records or compares sha256, inode and mtime of the operator auth files; prints only equal/changed.
// Usage: authstate.mjs save <file.json> | authstate.mjs compare <file.json>
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { adcPath } from './cloud-config.mjs';

const FILES = [adcPath(), join(process.env.CODEX_HOME ?? join(homedir(), '.codex'), 'auth.json'), join(process.env.GROK_HOME ?? join(homedir(), '.grok'), 'auth.json'), join(homedir(), '.gemini', 'gemini-credentials.json'), join(homedir(), '.gemini', 'oauth_creds.json'), join(homedir(), '.gemini', 'antigravity-cli', 'antigravity-oauth-token')];

const state = () =>
  Object.fromEntries(
    FILES.map((f) => {
      if (!existsSync(f)) return [f, null];
      const st = statSync(f);
      return [f, { sha: createHash("sha256").update(readFileSync(f)).digest("hex"), ino: st.ino, mtimeMs: st.mtimeMs }];
    }),
  );

const [mode, file] = process.argv.slice(2);
if (!['save', 'compare'].includes(mode) || !file) {
  console.error('usage: authstate.mjs save|compare <snapshot.json>');
  process.exit(64);
}
if (mode === "save") {
  writeFileSync(file, JSON.stringify(state()), { mode: 0o600 });
  console.log(`saved ${FILES.length} entries`);
} else {
  const before = JSON.parse(readFileSync(file, "utf8"));
  const now = state();
  for (const f of FILES) {
    const a = before[f];
    const b = now[f];
    if (!a && !b) {
      console.log(`${f}: absent (both)`);
      continue;
    }
    const parts = ["sha", "ino", "mtimeMs"].map((k) => `${k} ${a && b && a[k] === b[k] ? "equal" : "changed"}`);
    console.log(`${f}: ${parts.join(", ")}`);
  }
}
