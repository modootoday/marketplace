// Keeps credential values off stdout and off the wire.
//
// The shape that matters is a pair: a secret file named together with something
// that reads or sends it. Naming the file alone is fine -- counting keys,
// checking a file exists, listing a directory are all legitimate and constant
// work, and a guard that blocks them gets turned off within the day.

export const DEFAULTS = {
  // Paths whose contents are credentials.
  secretPaths: [
    "\\.env(?:\\.[\\w.-]+)?\\b",
    "\\.env\\.d\\b",
    "\\.dev\\.vars\\b",
    "\\b(?:id_rsa|id_ed25519|id_ecdsa)\\b",
    "\\.pem\\b",
    "\\.p12\\b",
    "\\.pfx\\b",
    "\\b[\\w.-]*(?:secret|credential|keyfile)s?[\\w.-]*\\.(?:json|ya?ml|toml|txt)\\b",
    "\\.npmrc\\b",
    "\\.netrc\\b",
    "\\bauth\\.json\\b",
    "\\bservice[-_]?account[\\w.-]*\\.json\\b",
  ],
  // Commands that dump the whole environment name no file and still leak every
  // secret in it, so they are their own rule.
  environmentDumps: ["printenv", "env", "set", "declare -x", "export -p"],
  // Commands that print or transmit what they are given.
  contentReaders: [
    "cat",
    "bat",
    "head",
    "tail",
    "less",
    "more",
    "strings",
    "xxd",
    "od",
    "base64",
    "grep",
    "rg",
    "awk",
    "sed",
    "jq",
    "yq",
    "printenv",
    "env",
    "export",
    "echo",
  ],
  networkClients: ["curl", "wget", "nc", "ncat", "socat", "http", "httpie", "scp", "rsync", "ssh"],
  // Verbs that answer questions about a file without revealing it.
  metadataVerbs: ["ls", "stat", "wc", "find", "du", "file", "test", "sha256sum", "md5sum"],
  // Project CLIs that print secret values, as "<binary> <verb>" pairs.
  valuePrintingCommands: [],
};

const word = (names) => new RegExp(`(?:^|[;&|(]|\\s)(?:${names.join("|")})(?=\\s|$)`);

export function compile(config = {}) {
  const merged = { ...DEFAULTS, ...config };
  return {
    secret: new RegExp(merged.secretPaths.join("|"), "i"),
    reader: word(merged.contentReaders),
    network: word(merged.networkClients),
    metadata: word(merged.metadataVerbs),
    // Only a bare dump: `env FOO=1 cmd` sets a variable and reveals nothing.
    envDump: new RegExp(`(?:^|[;&|(]|\\s)(?:${merged.environmentDumps.join("|")})\\s*$`),
    valuePrinting: merged.valuePrintingCommands.map(
      (pair) => new RegExp(`(?:^|\\s)${pair.binary}\\b(?:(?![;&|])[^;&|])*?\\s(?:${pair.verbs.join("|")})\\b`),
    ),
  };
}

export function segments(command) {
  return command
    .split(/(?:\n|;|&&|\|\|)/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

// Returns a reason to refuse, or null. Throwing means the caller must fail
// closed: this guard protects nothing if it opens on its own error.
export function evaluate(command, compiled) {
  for (const segment of segments(command)) {
    for (const pattern of compiled.valuePrinting) {
      if (pattern.test(segment)) {
        return "This prints credential values to stdout, where they enter the transcript and every log that carries it. Read the name or the count, not the value.";
      }
    }

    if (compiled.envDump.test(segment)) {
      return "This prints the whole environment, which carries every secret the process was given. Name the variable you need, or check that it is set without printing it.";
    }

    // A pipeline segment can read a secret in one stage and send it in another,
    // so pipes are examined together rather than split apart.
    const namesSecret = compiled.secret.test(segment);
    if (!namesSecret) continue;

    const reads = compiled.reader.test(segment);
    const sends = compiled.network.test(segment);
    if (!reads && !sends) continue;

    // Metadata about a secret file is not the secret.
    if (compiled.metadata.test(segment) && !reads && !sends) continue;

    return sends
      ? "This names a credential file together with a network client, which is how a secret leaves the machine. Send a reference, never the material."
      : "This prints the contents of a credential file, which puts the value in the transcript and in every log that carries it. Metadata commands (ls, stat, wc, find) answer the same questions without revealing it.";
  }
  return null;
}
