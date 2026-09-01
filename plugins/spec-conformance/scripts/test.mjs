#!/usr/bin/env node
// Hand-written inputs and hand-written expectations. Nothing here calls one part
// of the implementation to judge another: a normalizer checked with its own
// helper agrees with itself and proves nothing.

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseFrontmatter, proseOnly, idOf, kindOf } from "./scan.mjs";
import { DEFAULTS, loadConfig } from "./config.mjs";

let failed = 0;
let ran = 0;

function check(name, actual, expected) {
  ran += 1;
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`FAIL ${name}\n  expected ${e}\n  actual   ${a}`);
    failed += 1;
  }
}

// A failure that does not show the output it read cannot be acted on.
function checkOutput(name, text, pattern, expected) {
  ran += 1;
  if (pattern.test(text) !== expected) {
    const verb = expected ? "expected to match" : "expected not to match";
    console.error(`FAIL ${name}\n  ${verb} ${pattern}\n  output:\n${indent(text)}`);
    failed += 1;
  }
}

const indent = (text) =>
  text
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");

// --- parseFrontmatter -------------------------------------------------------

check(
  "scalar values are read and unquoted",
  parseFrontmatter('---\nkind: plan\nid: "20260831000000-a"\nstatus: active\n---\nbody\n'),
  { kind: "plan", id: "20260831000000-a", status: "active" },
);

check(
  "an indented dash list becomes an array",
  parseFrontmatter("---\nreferences:\n  - one\n  - two\n---\n"),
  { references: ["one", "two"] },
);

// An inline empty list read as the string made every document that writes
// supersedes: [] declare a supersede of a document literally named "[]".
check("an inline empty list is an empty array", parseFrontmatter("---\nsupersedes: []\n---\n"), {
  supersedes: [],
});

// A blank value is "not decided yet". Reading it as an empty list sent a truthy
// object downstream, so every deliberately blank field reported as a bad one.
check("a blank value stays an empty string", parseFrontmatter("---\nreviewed:\n---\n"), {
  reviewed: "",
});

check(
  "a blank value followed by items still becomes a list",
  parseFrontmatter("---\nreferences:\n  - only\n---\n"),
  { references: ["only"] },
);

check("comment lines are skipped", parseFrontmatter("---\n# a note\nkind: sot\n---\n"), {
  kind: "sot",
});

check(
  "keys may carry dots, dashes and underscores",
  parseFrontmatter("---\nsot_ref: x\nadr-id: y\na.b: z\n---\n"),
  { sot_ref: "x", "adr-id": "y", "a.b": "z" },
);

check("text that does not open with a fence is not frontmatter", parseFrontmatter("# Title\n"), null);

check(
  "an opening fence with no closing fence is not frontmatter",
  parseFrontmatter("---\nkind: plan\n"),
  null,
);

// The horizontal-rule case: two rules bracket prose that parses to no keys at
// all. Callers must test the key count, not truthiness -- treating this object
// as a header once stripped 146 lines of body off a document.
check(
  "a horizontal rule yields an object with no keys, not null",
  parseFrontmatter("---\n\n# Title\n\nsome prose\n\n---\n\nmore\n"),
  {},
);

// A colon in that prose does parse as a key. The guard is the key count at the
// call site, and this pins why counting keys is not enough on its own.
check(
  "prose between two rules can still look like a key",
  parseFrontmatter("---\n\nNote: this reads as a pair\n\n---\n"),
  { Note: "this reads as a pair" },
);

check(
  "a dash list at column zero is not a list item",
  parseFrontmatter("---\nreferences:\n- one\n---\n"),
  { references: "" },
);

check(
  "an indented key is not a key",
  parseFrontmatter("---\ntop: 1\n  nested: 2\n---\n"),
  { top: "1" },
);

// --- proseOnly --------------------------------------------------------------

check(
  "a fenced block is removed",
  proseOnly("before\n```\n[[not-a-link]]\n```\nafter [[real-link]]"),
  "before\n\nafter [[real-link]]",
);

// A document about configuration quotes configuration, and a TOML array-of-tables
// header is spelled exactly like a wikilink.
check("an inline code span is removed", proseOnly("see `[[services]]` and [[real]]"), "see  and [[real]]");

check("prose without code is untouched", proseOnly("plain [[link]] text"), "plain [[link]] text");

// --- idOf -------------------------------------------------------------------

check("a sot suffix is stripped", idOf("workspace-layout.sot.md"), "workspace-layout");
check("a page suffix is stripped", idOf("login.page.md"), "login");
check("a plain document loses only the extension", idOf("20260831000000-a.md"), "20260831000000-a");
check("a decision keeps its full stem", idOf("0001-use-postgres.md"), "0001-use-postgres");

// --- kindOf -----------------------------------------------------------------

check("a four-digit prefix is a decision", kindOf("0001-use-postgres.md", DEFAULTS), "decision");
check("a fourteen-digit prefix is a plan", kindOf("20260831140708-a-design.md", DEFAULTS), "plan");
check("a sot suffix is a sot", kindOf("workspace-layout.sot.md", DEFAULTS), "sot");
check("a page suffix is a page", kindOf("login.page.md", DEFAULTS), "page");
check("a filename matching nothing has no kind", kindOf("README.md", DEFAULTS), null);
check("an uppercase stem matches no kind", kindOf("Some-File.md", DEFAULTS), null);
check("a timestamp with no slug matches no kind", kindOf("20260831140708.md", DEFAULTS), null);

// --- loadConfig -------------------------------------------------------------

const scratch = mkdtempSync(join(tmpdir(), "spec-conformance-test-"));
try {
  check("a repository with no config file gets the defaults", loadConfig(scratch).source, "defaults");

  writeFileSync(
    join(scratch, "spec-conformance.json"),
    JSON.stringify({ root: ".", kinds: { plan: { dir: "plans", sourceDirs: ["plan"] } } }),
  );
  const merged = loadConfig(scratch);
  check("an explicit config is reported as the source", merged.source, "spec-conformance.json");
  check("a stated field wins", merged.root, ".");
  check("a stated kind field wins", merged.kinds.plan.sourceDirs, ["plan"]);
  // A partial kind must not blank the rest of that kind: overriding only the
  // destination once left the pattern undefined and matched every filename.
  check("an unstated kind field keeps its default", merged.kinds.plan.file, DEFAULTS.kinds.plan.file);
  check("an unmentioned kind survives", merged.kinds.sot.dir, DEFAULTS.kinds.sot.dir);
  check("an unmentioned section survives", merged.cluster.minDocuments, DEFAULTS.cluster.minDocuments);

  writeFileSync(
    join(scratch, "spec-conformance.json"),
    JSON.stringify({ kinds: { runbook: { dir: "runbooks", file: "^(.*)\\.run\\.md$" } } }),
  );
  const extended = loadConfig(scratch);
  check("a kind the defaults do not know is added", extended.kinds.runbook.dir, "runbooks");
  check("adding a kind keeps the known ones", Object.keys(extended.kinds).length, 5);

  writeFileSync(join(scratch, "spec-conformance.json"), "{ not json");
  let threw = "";
  try {
    loadConfig(scratch);
  } catch (error) {
    threw = error.message.slice(0, 34);
  }
  check("invalid JSON is refused by name", threw, "spec-conformance.json is not valid");

  // An override lets a repository check a candidate tree while its own documents
  // still sit under the old settings, which is the whole of a migration's middle.
  mkdirSync(join(scratch, "nested"), { recursive: true });
  writeFileSync(join(scratch, "nested", "other.json"), JSON.stringify({ root: "docs" }));
  check("an override path is read instead", loadConfig(scratch, "nested/other.json").root, "docs");
  check(
    "the source names the file that was read",
    loadConfig(scratch, "nested/other.json").source,
    "nested/other.json",
  );
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

// --- the pipeline, end to end ----------------------------------------------
//
// A synthetic repository with fixed commit dates, so the window logic is decided
// by history rather than by how fast the test ran. Every document here is a
// defect that actually happened once.

const FIXTURE = {
  "spec-conformance.json": JSON.stringify(
    {
      root: ".",
      kinds: {
        plan: { dir: "plans", sourceDirs: ["plan"] },
        sot: { dir: "sots", sourceDirs: ["sot-src"], idField: "sot", domain: ["arch"] },
      },
    },
    null,
    2,
  ),

  // References must survive code: a fenced sample and an inline span both spell
  // a TOML array-of-tables header exactly like a wikilink.
  "plan/20260101000000-alpha.md": `---
status: active
references:
  - 20260102000000-beta
---

# Alpha

Alpha depends on [[20260102000000-beta]] and is implemented in \`src/thing.ts\`.

\`\`\`toml
[[services]]
name = "x"
\`\`\`

An inline one is not a link either: \`[[services]]\`.
`,

  // supersedes: [] once declared a supersede of a document literally named "[]".
  "plan/20260102000000-beta.md": `---
status: active
supersedes: []
references:
  - layout
---

# Beta

Beta points at layout by the stem of the file it sits in, which is renamed below.
`,

  // Opens with a horizontal rule. Reading the pair of rules as a header once
  // deleted everything between them.
  "plan/20260103000000-gamma.md": `---

# Gamma

This document opens with a horizontal rule, not a header.

---

## Second section

A tool that reads the pair as frontmatter deletes this section.
`,

  "plan/20260104000000-delta.md": `---
status: active
---

# Delta

Delta names \`src/later.ts\`, a file nothing touched while this document was
still being edited. It also mentions src/never.ts without backticks.
`,

  // Addressed by an id its filename does not carry: the migration renames it.
  "sot-src/arch/layout.sot.md": `---
sot: workspace-layout
domain: arch
status: canonical
---

# Workspace Layout

Everything addresses this as [[workspace-layout]], the id it declares.
`,
};

const repo = mkdtempSync(join(tmpdir(), "spec-conformance-pipeline-"));
const scripts = dirname(fileURLToPath(import.meta.url));
const run = (script, extra = []) =>
  execFileSync(process.execPath, [join(scripts, script), ".", ...extra], {
    cwd: repo,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
const git = (...argv) =>
  execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", ...argv], {
    cwd: repo,
    encoding: "utf8",
    env: { ...process.env, GIT_AUTHOR_DATE: gitDate, GIT_COMMITTER_DATE: gitDate },
  });
let gitDate = "2026-01-01T00:00:00Z";

try {
  for (const [rel, body] of Object.entries(FIXTURE)) {
    mkdirSync(join(repo, dirname(rel)), { recursive: true });
    writeFileSync(join(repo, rel), body);
  }
  mkdirSync(join(repo, "src"), { recursive: true });
  writeFileSync(join(repo, "src", "thing.ts"), "export const thing = 1;\n");

  git("init", "-q", ".");
  git("add", "-A");
  git("commit", "-qm", "feat: alpha, beta, gamma, layout");

  gitDate = "2026-01-02T00:00:00Z";
  writeFileSync(join(repo, "src", "thing.ts"), "export const thing = 2;\n");
  git("add", "-A");
  git("commit", "-qm", "fix: touch the path alpha names");

  // A week after delta stopped being edited, so its only candidate falls outside
  // the window and the search has to widen to find anything.
  gitDate = "2026-01-10T00:00:00Z";
  writeFileSync(join(repo, "src", "later.ts"), "export const later = 1;\n");
  git("add", "-A");
  git("commit", "-qm", "feat: add the file delta named, a week later");

  run("derive.mjs");
  const dossier = new Map(
    readFileSync(join(repo, ".spec/_work/dossier.jsonl"), "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .map((d) => [d.source, d]),
  );

  check("derive reads every document", dossier.size, 5);

  const alpha = dossier.get("plan/20260101000000-alpha.md");
  // The fenced and inline [[services]] must not become references, and the
  // frontmatter entry and the prose wikilink are the same reference once.
  check("a wikilink inside code is not a reference", alpha.declared.references, [
    "20260102000000-beta",
  ]);
  check("a path in backticks is a candidate", alpha.implementation.pathCandidates.map((c) => c.token), [
    "src/thing.ts",
  ]);
  check("a commit inside the window is in scope", alpha.implementation.commitSearch.scope, "in-window");

  const delta = dossier.get("plan/20260104000000-delta.md");
  check("a bare path-shaped token is prose", delta.implementation.pathCandidates.map((c) => c.token), [
    "src/later.ts",
  ]);
  // Narrow first, widen only when the narrow answer is empty, and say so.
  check("an empty window widens", delta.implementation.commitSearch.scope, "widened-past-window");
  check(
    "widening states why",
    delta.implementation.commitSearch.widenedBecause,
    "no commit touched the paths this document names while it was still being edited",
  );
  check("the widened counts are recorded", delta.implementation.commitSearch.counts, {
    inWindow: 0,
    afterWindow: 1,
  });

  const beta = dossier.get("plan/20260102000000-beta.md");
  check("an inline empty list declares no supersede", beta.declared.supersedes, []);

  const gamma = dossier.get("plan/20260103000000-gamma.md");
  check("a horizontal rule leaves no frontmatter keys", Object.keys(gamma.originalFrontmatter), []);
  check("a document with no header has no status", gamma.declared.status, null);

  const layout = dossier.get("sot-src/arch/layout.sot.md");
  check("a derived id follows the filename, not the declaration", layout.derived.id, "layout");
  check("a domain comes from the directory", layout.derived.domain, "arch");
  check("dates are recovered from history", layout.derived.created, "20260101");

  // Decisions are written by hand, as a reading pass would write them. The
  // layout document is renamed to the id everything already uses.
  const evidence = "Read: this document was opened and judged.";
  const decisions = [
    { source: "plan/20260101000000-alpha.md", status: "archived", evidence },
    { source: "plan/20260102000000-beta.md", status: "archived", evidence },
    { source: "plan/20260103000000-gamma.md", status: "archived", evidence },
    { source: "plan/20260104000000-delta.md", status: "archived", evidence },
    {
      source: "sot-src/arch/layout.sot.md",
      status: "canonical",
      path: ".spec/sots/arch/workspace-layout.sot.md",
      evidence,
    },
  ];
  const writeDecisions = (rows) =>
    writeFileSync(
      join(repo, ".spec/_work/decisions.jsonl"),
      `${rows.map((d) => JSON.stringify(d)).join("\n")}\n`,
    );

  // A decision that reports no evidence is a guess wearing a decision's clothes,
  // and a decision naming a document nobody derived has nothing to apply to.
  writeDecisions([
    { source: "plan/20260101000000-alpha.md", status: "archived", evidence: "short" },
    { source: "plan/20260101000000-absent.md", status: "archived", evidence },
  ]);
  const refused = run("apply.mjs");
  check("thin evidence is refused", /no evidence recorded for the judgement/.test(refused), true);
  check("a decision with no dossier is refused", /this document was not derived/.test(refused), true);
  check("nothing is accepted from that run", /accepted\s+0/.test(refused), true);

  writeDecisions(decisions);

  const applied = run("apply.mjs", ["--write"]);
  check("every decision is accepted", /accepted\s+5/.test(applied), true);
  check("no decision is rejected", /rejected\s+0/.test(applied), true);

  const written = (rel) => readFileSync(join(repo, rel), "utf8");
  const bodyOf = (text) => {
    const end = text.indexOf("\n---\n", 3);
    return text.slice(end + 5);
  };

  // The regression that mattered most: a document whose opening rule is not a
  // header must arrive with every line it had.
  check(
    "a horizontal-rule document keeps its whole body",
    bodyOf(written(".spec/plans/20260103000000-gamma.md")),
    FIXTURE["plan/20260103000000-gamma.md"],
  );
  check(
    "an ordinary document keeps its body below the header",
    bodyOf(written(".spec/plans/20260102000000-beta.md")),
    FIXTURE["plan/20260102000000-beta.md"].slice(
      FIXTURE["plan/20260102000000-beta.md"].indexOf("\n---\n", 3) + 5,
    ),
  );

  // A rename changes an id, and a relation written against the old name points
  // at nothing afterwards unless the apply stage repoints it.
  const betaOut = parseFrontmatter(written(".spec/plans/20260102000000-beta.md"));
  check("a relation follows its target's rename", betaOut.references, ["workspace-layout"]);
  check("an id is written from the destination filename", betaOut.id, "20260102000000-beta");
  const layoutOut = parseFrontmatter(written(".spec/sots/arch/workspace-layout.sot.md"));
  check("a renamed document carries its new id", layoutOut.id, "workspace-layout");
  check("a decided status is written", layoutOut.status, "canonical");
  check("the source it came from travels with it", layoutOut.source, "sot-src/arch/layout.sot.md");

  // The pile still reports the disagreement that motivated the rename: reading
  // the source tree and reading the destination are two different questions.
  const pile = run("check.mjs", ["--all"]);
  checkOutput("the pile reports the id disagreement", pile, /ID_DISAGREES/, true);
  checkOutput(
    "the pile names both the declared id and the stem",
    pile,
    /declared id "workspace-layout" is not the filename stem "layout"/,
    true,
  );
  // Nobody had decided gamma's status before the reading pass, and saying so is
  // the point of the finding.
  checkOutput("the pile reports the undecided status", pile, /STATUS_UNDECIDED/, true);

  // A second config reads the destination while the sources still sit under the
  // old settings, which is the whole of a migration's middle.
  writeFileSync(
    join(repo, ".spec-check.json"),
    JSON.stringify({
      root: ".spec",
      kinds: { plan: { dir: "plans" }, sot: { dir: "sots", domain: ["arch"] } },
    }),
  );
  const graph = run("graph.mjs", ["--config", ".spec-check.json", "--findings"]);
  // Three ways to invent a broken link, all of which happened: a phantom
  // supersede from an empty list, a code path read as a document, and a
  // relation left pointing at a name the rename retired.
  checkOutput("no finding mentions an empty-list supersede", graph, /\[\]/, false);
  checkOutput("a code path is not a dangling document link", graph, /thing\.ts/, false);
  checkOutput("the retired name is not reported dangling", graph, /"layout" resolves/, false);
  checkOutput("the graph reports no findings at all", graph, /findings 0/, true);

  const report = run("check.mjs", ["--config", ".spec-check.json", "--all"]);
  checkOutput(
    "a normalised tree has no shape findings",
    report,
    /FILENAME_SHAPE|ID_DISAGREES|KIND_DISAGREES/,
    false,
  );
  // Every status was decided by the reading pass, so nothing is left undecided.
  checkOutput("the destination has no undecided status", report, /STATUS_UNDECIDED/, false);
  // A report that names the wrong config file sends the reader to the wrong tree.
  checkOutput("the report names the config it read", report, /config: \.spec-check\.json/, true);
} finally {
  rmSync(repo, { recursive: true, force: true });
}

if (failed > 0) {
  console.error(`\n${failed} of ${ran} cases failed`);
  process.exit(1);
}
console.log(`${ran} cases passed`);
