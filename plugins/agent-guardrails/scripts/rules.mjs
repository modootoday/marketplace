// Decision functions. Pure, so the fixtures can exercise them directly.
//
// Scope is deliberately narrow. A guard that fires on legitimate work gets
// routed around, and a guard that is routed around protects nothing.

// A new command can start at the beginning, after a newline or semicolon, or
// after a chaining operator. Splitting on those stops a blocked verb from being
// smuggled in behind an allowed one.
export function segments(command) {
  return command
    .split(/(?:\n|;|&&|\|\||\|)/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

// Leading VAR=value assignments are part of the same command.
const stripEnv = (segment) => segment.replace(/^(?:[A-Za-z_][A-Za-z0-9_]*=\S*\s+)*/, "");

const IN_PLACE = /^(sed|perl|awk|gawk)\b[^\n]*?\s(-i\b|--in-place\b|-i\S+)/;

export function inPlaceStreamEdit(segment) {
  if (!IN_PLACE.test(stripEnv(segment))) return null;
  return "In-place stream edits rewrite files without showing a diff, and they succeed on the first match rather than the intended one. Use the editor tool instead.";
}

const IS_GIT = /^git\b/;

export function pushWithoutVerify(segment) {
  const command = stripEnv(segment);
  if (!IS_GIT.test(command) || !/\bpush\b/.test(command)) return null;
  if (!/\s(?:--no-verify|-n)(?:\s|$)/.test(command)) return null;
  return "Pushing with verification disabled skips every pre-push check at once, including the ones that exist to catch what a person cannot review by eye. Fix the failing check instead of waiving all of them.";
}

// Returns the branch name a forced move targets, or null when the command is
// not a forced branch move. The caller decides whether that branch is checked
// out somewhere else.
export function forcedBranchMoveTarget(segment) {
  const command = stripEnv(segment);
  if (!IS_GIT.test(command) || !/\bbranch\b/.test(command)) return null;
  if (!/\s(?:-f|-M|--force)(?:\s|$)/.test(command)) return null;
  const args = command
    .split(/\s+/)
    .slice(2)
    .filter((token) => !token.startsWith("-"));
  return args[0] ?? null;
}

const COMPOSE = /^docker\s+compose\b/;
const PROJECT_WIDE_VERBS = new Set(["stop", "rm", "kill"]);

// Flags before the verb belong to compose itself; flags after it belong to the
// verb. The same spelling can mean different things on each side -- `-f` is
// --file before `rm` and --force after it -- so the two sets stay separate.
const GLOBAL_VALUE_FLAGS = new Set([
  "-f",
  "--file",
  "-p",
  "--project-name",
  "--profile",
  "--env-file",
  "--project-directory",
  "--ansi",
  "--parallel",
  "--progress",
]);

const VERB_VALUE_FLAGS = {
  stop: new Set(["-t", "--timeout"]),
  kill: new Set(["-s", "--signal"]),
  rm: new Set(),
};

// Walks a token list, skipping flags and the values they consume, and returns
// the first plain argument with the tokens that follow it.
function firstArgument(tokens, valueFlags) {
  let expectsValue = false;
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (expectsValue) {
      expectsValue = false;
      continue;
    }
    if (token.startsWith("-")) {
      expectsValue = valueFlags.has(token);
      continue;
    }
    return { value: token, rest: tokens.slice(index + 1) };
  }
  return { value: null, rest: [] };
}

export function projectWideCompose(segment) {
  const command = stripEnv(segment);
  if (!COMPOSE.test(command)) return null;

  const { value: verb, rest } = firstArgument(command.split(/\s+/).slice(2), GLOBAL_VALUE_FLAGS);
  if (!verb) return null;

  if (verb === "down") {
    return "`docker compose down` takes no service argument: it tears down every container and network in the project, including ones this task never touched.";
  }

  if (!PROJECT_WIDE_VERBS.has(verb)) return null;

  // A positional argument after the verb names a service and narrows the blast
  // radius.
  const { value: service } = firstArgument(rest, VERB_VALUE_FLAGS[verb]);
  if (service) return null;

  return `\`docker compose ${verb}\` with no service named applies to every service in the project. Name the service you mean.`;
}

// Ordered so the first match wins. Each entry returns a reason or null.
export function evaluate(command, { isCheckedOutElsewhere } = {}) {
  for (const segment of segments(command)) {
    const reason =
      inPlaceStreamEdit(segment) ?? pushWithoutVerify(segment) ?? projectWideCompose(segment);
    if (reason) return reason;

    const branch = forcedBranchMoveTarget(segment);
    if (branch && isCheckedOutElsewhere?.(branch)) {
      return `Branch \`${branch}\` is checked out in another working tree. Moving it there leaves that checkout's ref ahead of its files, so its status reports another session's work as deleted and committing removes it.`;
    }
  }
  return null;
}
