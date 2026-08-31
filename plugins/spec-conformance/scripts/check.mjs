#!/usr/bin/env node
// Schema, naming, placement and the page-to-code link. Reports; never writes,
// never blocks.

import { existsSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { loadConfig } from "./config.mjs";
import { scan } from "./scan.mjs";

const args = process.argv.slice(2);
const repoRoot = resolve(args.find((a) => !a.startsWith("-")) ?? process.cwd());
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

let config;
try {
  config = loadConfig(repoRoot, flag("config", null));
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

const findings = [];
const add = (code, doc, detail) => findings.push({ code, path: doc?.rel ?? "-", detail });

// A spec root inside a published path turns internal documents into a website.
// The hosting setting itself lives outside the repository, so a docs/ root is
// refused whether or not a generator is detected: an unreadable setting is not
// evidence of safety.
const specRoot = config.root.replace(/^\.\//, "");
if (specRoot === "docs" || specRoot.startsWith("docs/")) {
  findings.push({
    code: "PUBLISHED_ROOT",
    path: config.root,
    detail:
      "the spec root is under docs/, a GitHub Pages publishing source; Pages can serve a private repository's files publicly",
  });
} else {
  for (const signal of config.publishSignals) {
    if (!existsSync(join(repoRoot, signal))) continue;
    const published = signal.includes("/") ? signal.split("/")[0] : ".";
    if (published !== "." && specRoot.startsWith(published)) {
      findings.push({
        code: "PUBLISHED_ROOT",
        path: config.root,
        detail: `${signal} publishes ${published}/, which contains the spec root`,
      });
    }
  }
}

const { roots, documents } = scan(repoRoot, config);

// Ids are unique within a spec root, not across the repository: a package can
// name a document what it likes, and a link resolves to the nearest one first.
const byRoot = new Map();

for (const doc of documents) {
  const spec = config.kinds[doc.declaredKind];

  // Chapters are parts of one document, not documents. They carry no id and are
  // checked only for the things that apply to any file.
  if (doc.isChapter) {
    if (!doc.frontmatter && spec.required.length > 0) {
      // A chapter inherits its parent's header; silence is correct here.
    }
    continue;
  }

  if (!doc.detectedKind) {
    add("FILENAME_SHAPE", doc, `does not match the ${doc.declaredKind} pattern ${spec.file}`);
  } else if (doc.detectedKind !== doc.declaredKind) {
    add("KIND_MISPLACED", doc, `named as ${doc.detectedKind} but placed under ${doc.declaredKind}`);
  }

  if (!byRoot.has(doc.specRoot)) byRoot.set(doc.specRoot, new Map());
  const seen = byRoot.get(doc.specRoot);
  if (seen.has(doc.id)) add("ID_DUPLICATE", doc, `id "${doc.id}" is also ${seen.get(doc.id)} in this spec root`);
  else seen.set(doc.id, doc.rel);

  const fm = doc.frontmatter;
  if (!fm) {
    add("NO_FRONTMATTER", doc, "no parseable frontmatter");
    continue;
  }

  if (fm.kind && fm.kind !== doc.declaredKind) {
    add("KIND_DISAGREES", doc, `frontmatter says ${fm.kind}, filename and placement say ${doc.declaredKind}`);
  }

  const declaredId = fm[spec.idField ?? "id"];
  if (declaredId && declaredId !== doc.id) {
    add("ID_DISAGREES", doc, `declared id "${declaredId}" is not the filename stem "${doc.id}"`);
  }

  for (const field of spec.required) {
    // status has its own code below; reporting it twice makes an undecided
    // document look like two problems.
    if (field === "status") continue;
    if (fm[field] === undefined || fm[field] === "") add("FIELD_MISSING", doc, `required field: ${field}`);
  }

  // Undecided and wrong are different states and get different codes. A
  // migration leaves fields blank on purpose, and a blank one reported as a bad
  // value pushes the reader towards inventing a value to silence it.
  if (fm.status === "" || fm.status === undefined) {
    add("STATUS_UNDECIDED", doc, "nobody has decided this document's status");
  } else if (!spec.status.includes(fm.status)) {
    add("STATUS_UNKNOWN", doc, `"${fm.status}" is not one of: ${spec.status.join(" · ")}`);
  }

  if (spec.domain === false) {
    if (doc.directoryDomain) add("DOMAIN_UNEXPECTED", doc, `${doc.declaredKind} takes no domain level`);
  } else {
    if (!doc.directoryDomain) add("DOMAIN_MISSING", doc, "no domain directory under the kind root");
    else if (fm.domain && fm.domain !== doc.directoryDomain) {
      add("DOMAIN_DISAGREES", doc, `frontmatter domain "${fm.domain}" is not directory "${doc.directoryDomain}"`);
    }
    if (Array.isArray(spec.domain) && spec.domain.length > 0 && fm.domain && !spec.domain.includes(fm.domain)) {
      add("DOMAIN_UNKNOWN", doc, `"${fm.domain}" is not one of: ${spec.domain.join(" · ")}`);
    }
  }

  // The page kind earns its existence here: a screen that was deleted or
  // renamed turns its document red without anyone noticing the drift.
  if (fm.implements) {
    const targets = Array.isArray(fm.implements) ? fm.implements : [fm.implements];
    for (const target of targets) {
      const base = doc.package === "." ? repoRoot : join(repoRoot, doc.package);
      const resolved = isAbsolute(target) ? join(repoRoot, target.slice(1)) : join(base, target);
      if (!existsSync(resolved)) add("IMPLEMENTS_MISSING", doc, `implements "${target}" does not exist`);
    }
  }

  // Confirming a document still holds must not require editing it, which is why
  // these are two fields.
  if (!fm.reviewed) {
    add("NEVER_REVIEWED", doc, "no reviewer has confirmed this document holds");
  } else if (fm.updated && String(fm.updated) > String(fm.reviewed)) {
    add("REVIEW_STALE", doc, `updated ${fm.updated} is newer than reviewed ${fm.reviewed}`);
  }
}

const real = documents.filter((d) => !d.isChapter);
const counts = findings.reduce((acc, f) => ({ ...acc, [f.code]: (acc[f.code] ?? 0) + 1 }), {});

if (args.includes("--json")) {
  console.log(
    JSON.stringify(
      { repoRoot, config: config.source, specRoots: roots.length, documents: real.length, counts, findings },
      null,
      2,
    ),
  );
} else {
  console.log(`spec roots ${roots.length}   (config: ${config.source})`);
  console.log(`documents  ${real.length}   (+ ${documents.length - real.length} chapters)`);
  const byKind = real.reduce((acc, d) => ({ ...acc, [d.declaredKind]: (acc[d.declaredKind] ?? 0) + 1 }), {});
  console.log(`by kind    ${Object.entries(byKind).map(([k, n]) => `${k} ${n}`).join(" · ") || "none"}`);
  console.log(`findings   ${findings.length}`);
  for (const [code, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${code.padEnd(18)} ${n}`);
  }
  const shown = args.includes("--all") ? findings : findings.slice(0, 20);
  if (shown.length > 0) console.log("");
  for (const f of shown) console.log(`  ${f.code.padEnd(18)} ${f.path}\n${" ".repeat(21)}${f.detail}`);
  if (findings.length > shown.length) console.log(`\n  … ${findings.length - shown.length} more (--all)`);
}

// Reporting is the job. A document set with findings is the normal starting
// state, not this tool's failure.
process.exit(0);
