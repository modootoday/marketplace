// The mailbox is files. No daemon, no port, no background process: both sides
// only ever read it at a hook boundary, so there is nothing to keep running.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// XDG state, because a sandboxed runtime may not be allowed to write anywhere
// else, and because this is state rather than cache or config.
export const ROOT =
  process.env.LLM_PEER_BRIDGE_HOME ??
  join(process.env.XDG_STATE_HOME ?? join(homedir(), ".local", "state"), "llm-peer-bridge");

export const SESSIONS = join(ROOT, "sessions");
export const INBOX = join(ROOT, "inbox");
export const PAIRS = join(ROOT, "pairs.json");

export const LIMITS = {
  // A peer message is a remark, not a document. Anything longer is a file path.
  messageBytes: 4096,
  // How many messages one turn may carry, so a backlog cannot flood a session.
  perDrain: 3,
  // How long a message stays worth delivering.
  ageMs: 30 * 60 * 1000,
};

export function ensure() {
  mkdirSync(SESSIONS, { recursive: true });
  mkdirSync(INBOX, { recursive: true });
}

const safe = (value) => String(value ?? "").replace(/[^A-Za-z0-9._-]/g, "_");

export function registerSession(record) {
  ensure();
  const id = safe(record.id);
  if (!id) return null;
  writeFileSync(join(SESSIONS, `${id}.json`), `${JSON.stringify({ ...record, id, seen: Date.now() }, null, 2)}\n`);
  return id;
}

export function listSessions() {
  if (!existsSync(SESSIONS)) return [];
  return readdirSync(SESSIONS)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      try {
        return JSON.parse(readFileSync(join(SESSIONS, name), "utf8"));
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

export function readPairs() {
  if (!existsSync(PAIRS)) return {};
  try {
    return JSON.parse(readFileSync(PAIRS, "utf8"));
  } catch {
    return {};
  }
}

export function writePairs(pairs) {
  ensure();
  writeFileSync(PAIRS, `${JSON.stringify(pairs, null, 2)}\n`);
}

// A channel exists only when both sides named each other. One side cannot open
// a way into the other's context on its own.
export function peersOf(id) {
  const pairs = readPairs();
  const mine = pairs[id] ?? [];
  return mine.filter((other) => (pairs[other] ?? []).includes(id));
}

export function deliver(toId, message) {
  ensure();
  const dir = join(INBOX, safe(toId));
  mkdirSync(dir, { recursive: true });
  const body = String(message.text ?? "").slice(0, LIMITS.messageBytes);
  if (!body.trim()) return false;

  const record = {
    from: message.from,
    runtime: message.runtime ?? "unknown",
    cwd: message.cwd ?? null,
    at: Date.now(),
    text: body,
  };
  // Write then rename, so a reader never sees half a message.
  const name = `${record.at}-${safe(record.from)}-${Math.random().toString(36).slice(2, 8)}.json`;
  const target = join(dir, name);
  writeFileSync(`${target}.part`, `${JSON.stringify(record)}\n`);
  renameSync(`${target}.part`, target);
  return true;
}

// Reading removes: a message delivered twice would be a message the reader
// cannot tell apart from a repeated one.
export function drain(id, limit = LIMITS.perDrain) {
  const dir = join(INBOX, safe(id));
  if (!existsSync(dir)) return [];

  const names = readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .sort();

  const taken = [];
  for (const name of names) {
    const path = join(dir, name);
    let record;
    try {
      record = JSON.parse(readFileSync(path, "utf8"));
    } catch {
      rmSync(path, { force: true });
      continue;
    }
    rmSync(path, { force: true });
    if (Date.now() - record.at > LIMITS.ageMs) continue;
    taken.push(record);
    if (taken.length >= limit) break;
  }
  return taken;
}

export function pending(id) {
  const dir = join(INBOX, safe(id));
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter((name) => name.endsWith(".json")).length;
}

// Every message arrives wearing its origin. The receiving model is told who
// spoke before it is told what was said.
export function render(records) {
  return records
    .map((record) => {
      const when = new Date(record.at).toISOString();
      return `<peer from="${record.from}" runtime="${record.runtime}" at="${when}">\n${record.text}\n</peer>`;
    })
    .join("\n\n");
}
