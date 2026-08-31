// Which commands are worth capping, and with what.
//
// The axes are not interchangeable. A build tool usually has at least two: how
// many tasks it runs at once, and how many threads it uses inside itself to
// work out what to run. Capping one does nothing to the other, and the second
// is the one that is usually invisible.

export const CAPS = [
  {
    // Task parallelism: how many packages or targets run at once.
    match: /^turbo\b|^(?:npx|pnpm|yarn|bun)\s+turbo\b|\brun\s+turbo\b/,
    env: { TURBO_CONCURRENCY: "1" },
    axis: "task parallelism",
  },
  {
    // Internal worker pool of a Rust-based tool. On a statically linked binary
    // this pool can scale negatively, because the allocator serialises on a
    // global lock and the workers spend their time contending for it.
    match: /^turbo\b|^(?:npx|pnpm|yarn|bun)\s+turbo\b|\brun\s+turbo\b/,
    env: { RAYON_NUM_THREADS: "1" },
    axis: "internal worker pool",
  },
  {
    match: /\bmake\b(?!.*\s-j\s*\d)/,
    env: {},
    note: "make without -j is already serial; adding -j here would make it worse, not better",
    axis: "task parallelism",
  },
  {
    match: /\b(vitest|jest)\b(?!.*--(?:no-threads|runInBand|maxWorkers))/,
    env: { VITEST_MAX_THREADS: "1", JEST_WORKERS: "1" },
    axis: "test worker pool",
  },
  {
    match: /\bcargo\s+(build|test|check)\b/,
    env: { CARGO_BUILD_JOBS: "1" },
    axis: "task parallelism",
  },
];

// Commands cheap enough that capping them only costs wall-clock.
const IGNORE = /^(ls|cat|echo|grep|rg|git|node\s+-e|printf|head|tail|wc)\b/;

export function capsFor(command) {
  const trimmed = command.trim();
  if (IGNORE.test(trimmed)) return [];
  return CAPS.filter((cap) => cap.match.test(trimmed) && Object.keys(cap.env).length > 0);
}

export function alreadyCapped(command, cap) {
  return Object.keys(cap.env).some((name) => new RegExp(`\\b${name}=`).test(command));
}

export function prefixFor(caps) {
  const env = Object.assign({}, ...caps.map((cap) => cap.env));
  return Object.entries(env)
    .map(([name, value]) => `${name}=${value}`)
    .join(" ");
}
