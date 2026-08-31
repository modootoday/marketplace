// What is invariant and what is yours.
//
// Invariant: an id equals its filename stem, a kind is readable from the
// filename, a domain is one level and agrees with the frontmatter, and no two
// documents in one spec root share an id. Everything below is a default you can
// change, because a directory name has no bearing on whether a link resolves.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const CONFIG_FILE = "spec-conformance.json";

export const DEFAULTS = {
  // A spec root per package: documents live beside the code they govern. One
  // root for a whole repository becomes the flat pile this tool exists to undo.
  root: ".spec",
  kinds: {
    decision: {
      dir: "decisions",
      // MADR: a consecutive number, never reused, and a dashed lowercase title.
      file: "^(\\d{4})-([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\\.md$",
      required: ["status"],
      idField: "id",
      status: ["proposed", "rejected", "accepted", "deprecated", "superseded"],
      domain: false,
      reviewEveryDays: null,
    },
    plan: {
      dir: "plans",
      file: "^(\\d{14})-([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\\.md$",
      required: ["status"],
      idField: "id",
      status: ["active", "superseded", "archived"],
      domain: false,
      reviewEveryDays: 90,
      // A plan may be a directory of chapters. The directory is the document;
      // the chapters are its parts and are not documents in their own right.
      allowDirectoryForm: true,
    },
    sot: {
      dir: "sots",
      file: "^([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\\.sot\\.md$",
      required: ["status", "domain"],
      // Projects name this field differently; the rule is the value, not the key.
      idField: "id",
      status: ["draft", "canonical", "superseded", "archived"],
      // Exactly one directory level under the kind root, from a closed list.
      domain: [],
      reviewEveryDays: 180,
    },
    page: {
      dir: "pages",
      file: "^([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\\.page\\.md$",
      // `implements` is the point of this kind: the checker confirms the file
      // exists, so a deleted or renamed screen turns its document red by itself.
      required: ["status", "route", "implements"],
      idField: "id",
      status: ["draft", "current", "superseded", "archived"],
      domain: false,
      reviewEveryDays: 180,
    },
  },
  // Leading underscore is excluded everywhere: templates are meant to violate
  // the schema, and Jekyll skips these too, which keeps the two consistent.
  ignore: ["_templates", "_meta", "node_modules", ".git", "dist", "build"],
  reserved: ["INDEX.md", "README.md"],
  // Paths a static site generator would publish. A spec root inside one of
  // these is refused.
  publishSignals: [
    "docs/_config.yml",
    "_config.yml",
    "mkdocs.yml",
    "docusaurus.config.js",
    "docusaurus.config.ts",
    "netlify.toml",
    "vercel.json",
  ],
  cluster: {
    // Tokens too generic to mean a shared subject.
    stopwords: ["plan", "design", "sot", "and", "the", "for", "with", "from", "into", "v2", "v3"],
    minTokenLength: 4,
    minDocuments: 5,
    // Tokens appearing in more than this share of documents name no subject.
    maxDocumentFrequency: 0.15,
  },
};

export function loadConfig(root) {
  const path = join(root, CONFIG_FILE);
  if (!existsSync(path)) return { ...DEFAULTS, source: "defaults" };

  let parsed;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`${CONFIG_FILE} is not valid JSON: ${error.message}`);
  }

  const kinds = {};
  for (const [name, base] of Object.entries(DEFAULTS.kinds)) {
    kinds[name] = { ...base, ...(parsed.kinds?.[name] ?? {}) };
  }
  for (const [name, extra] of Object.entries(parsed.kinds ?? {})) {
    if (!kinds[name]) kinds[name] = extra;
  }

  return {
    ...DEFAULTS,
    ...parsed,
    kinds,
    cluster: { ...DEFAULTS.cluster, ...(parsed.cluster ?? {}) },
    source: CONFIG_FILE,
  };
}
