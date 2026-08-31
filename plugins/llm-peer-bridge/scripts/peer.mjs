#!/usr/bin/env node
// Operator CLI: see who is around, agree to a pair, send one message, check state.
//
// Pairing is deliberately two-sided. Each side records the other, and a channel
// exists only where both records agree, so no session can open a way into
// another's context on its own.

import { deliver, listSessions, pending, peersOf, readPairs, writePairs } from "./mailbox.mjs";

const [command, ...rest] = process.argv.slice(2);
const flag = (name) => {
  const index = rest.indexOf(`--${name}`);
  return index === -1 ? null : rest[index + 1];
};

function sessions() {
  const now = Date.now();
  return listSessions().sort((a, b) => (b.seen ?? 0) - (a.seen ?? 0)).map((s) => ({
    ...s,
    ageMin: Math.round((now - (s.seen ?? 0)) / 60000),
  }));
}

if (command === "list") {
  const rows = sessions();
  if (rows.length === 0) {
    console.log("No sessions registered yet. Start a session with the plugin installed and trusted.");
    process.exit(0);
  }
  for (const row of rows) {
    const peers = peersOf(row.id);
    console.log(
      `${row.id}\n  runtime ${row.runtime}  seen ${row.ageMin}m ago  waiting ${pending(row.id)}\n  cwd ${row.cwd ?? "-"}\n  paired with ${peers.length ? peers.join(", ") : "nobody"}`,
    );
  }
  process.exit(0);
}

if (command === "pair") {
  const me = flag("me");
  const other = flag("with");
  if (!me || !other) {
    console.error("usage: peer.mjs pair --me <session-id> --with <session-id>");
    process.exit(2);
  }
  const pairs = readPairs();
  pairs[me] = [...new Set([...(pairs[me] ?? []), other])];
  writePairs(pairs);
  const mutual = (pairs[other] ?? []).includes(me);
  console.log(
    mutual
      ? `Channel open: ${me} <-> ${other}. Both sides have agreed.`
      : `Recorded. ${other} must also run:\n  peer.mjs pair --me ${other} --with ${me}`,
  );
  process.exit(0);
}

if (command === "unpair") {
  const me = flag("me");
  const other = flag("with");
  if (!me || !other) {
    console.error("usage: peer.mjs unpair --me <session-id> --with <session-id>");
    process.exit(2);
  }
  const pairs = readPairs();
  pairs[me] = (pairs[me] ?? []).filter((entry) => entry !== other);
  writePairs(pairs);
  console.log(`Closed from this side: ${me} -> ${other}. Either side alone is enough to close it.`);
  process.exit(0);
}

if (command === "send") {
  const from = flag("from") ?? "operator";
  const to = flag("to");
  const text = flag("message");
  if (!to || !text) {
    console.error("usage: peer.mjs send --to <session-id> --message <text> [--from <name>]");
    process.exit(2);
  }
  console.log(
    deliver(to, { from, runtime: "operator", text })
      ? `Queued for ${to}. It arrives at that session's next tool call or turn boundary.`
      : "Nothing queued: the message was empty.",
  );
  process.exit(0);
}

console.log(`llm-peer-bridge

  peer.mjs list
  peer.mjs pair   --me <id> --with <id>
  peer.mjs unpair --me <id> --with <id>
  peer.mjs send   --to <id> --message <text> [--from <name>]

Both sides must pair before anything is delivered.`);
