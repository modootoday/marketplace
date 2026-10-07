import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export const FLAG_ROWS = [
  ['--eval-dir <dir>', 'Eval directory, default manifest experimental.evals or evals'],
  ['--case <glob>', 'Repeat to select case names'],
  ['--tag <tags...>', 'Select cases by skill tags'],
  ['--runs <n>', 'Positive runs per arm; default case frontmatter or 3'],
  ['-j, --concurrency <1-8>', 'Shared subject and judge process limit; default 1'],
  ['--model <id>', 'Subject model; default runtime configuration'],
  ['--judge-model <id>', 'Judge model; default subject model'],
  ['--effort <level>', 'Reasoning effort; default low, subject to runtime support'],
  ['--judge-effort <level>', 'Judge effort; default subject effort'],
  ['--judge-votes <odd n>', 'Positive odd vote count; default 3'],
  ['--ablation none|with-without', 'With arm only or both arms; default with-without'],
  ['--threshold <0..1>', 'Passing score; default 1'],
  ['--json [file.json]', 'Print result JSON or write the specified file'],
  ['--output-dir <dir>', 'Result directory; default evals/results/<timestamp>'],
  ['--report <path>', 'HTML report; default output-dir/report.html'],
  ['--price-in <usd/1M>', 'Override input price for subject and judge'],
  ['--price-out <usd/1M>', 'Override output price for subject and judge'],
  ['--price-cached <usd/1M>', 'Override cached input price'],
  ['--max-cost-usd <usd>', 'Stop new calls at observed estimated cost; requires prices'],
  ['--max-tokens <n>', 'Stop new calls at observed input plus output tokens'],
  ['--timeout <seconds>', 'Positive subject and judge timeout; default 600'],
  ['--work <dir>', 'Temporary run parent; default OS temp directory'],
  ['--cli <bin>', 'Runtime executable; default CLI on PATH'],
  ['--runtime-lock <file>', 'Verify CLI version, launch artifacts and Node before authentication'],
  ['--isolation bwrap|none', 'Default bwrap; none disables filesystem and environment isolation'],
  ['--auth proxy|oauth|api-key', 'Default proxy; unsupported modes are refused'],
  ['--auth-from <dir>', 'Login directory or Gemini ADC directory'],
  ['--api-key-env <NAME>', 'Source variable for api-key authentication only'],
  ['--suite-minutes <n>', 'Required proxy credential validity; default 30'],
  ['--project <id>', 'Vertex project; default environment or gcloud configuration'],
  ['--location <name>', 'Vertex location; default environment or gcloud configuration'],
  ['--mcp <names...>', 'Selected servers from this runtime configuration, subjects only'],
  ['--mocks off', 'Only real selected MCP servers are supported'],
  ['--allow-real-servers', 'Compatibility flag for real selected MCP servers'],
  ['--allow-tools <tools...>', 'Enable mapped Write, Edit, Bash tools'],
  ['--hooks', 'Enable plugin hooks in with arm'],
  ['--scaffold', 'Run case scaffold_script'],
  ['--keep-temp', 'Retain run directories and traces'],
  ['--no-publish, --publish-report, --trust-plugin, --no-scaffold, --verbose', 'Accepted compatibility flags; no effect'],
  ['-h, --help', 'Show this help without loading configuration or credentials'],
];

export function help(runtime) {
  return `usage: ${runtime}-plugin-eval.mjs <plugin-dir> [options]\n\nOptions:\n` +
    FLAG_ROWS.map(([flag, meaning]) => `  ${flag}\n      ${meaning}`).join('\n') +
    '\n\nPlugin layout: <marketplace>/plugins/<plugin>, with evals/<case>/prompt.md and graders/.\nExit codes: 0 pass; 1 threshold failure; 2 budget stop; 3 all runs failed before answer; 64 invalid configuration; 70 harness error; 130 interrupted.\n';
}

export function parseArgs(argv, runtime) {
  const fail = (message) => {
    console.error(`${runtime}-plugin-eval: ${message}`);
    console.error(help(runtime));
    process.exit(64);
  };
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(help(runtime));
    process.exit(0);
  }
  const opts = { cases: [], tags: [], allowTools: [], mcp: [], effort: 'low', concurrency: 1,
    threshold: 1, keep: false, scaffold: false, hooks: false, notes: [], ablation: 'with-without',
    isolation: 'bwrap', auth: 'proxy', suiteMinutes: 30, judgeVotes: 3 };
  const scalars = { '--eval-dir': 'evalDir', '--model': 'model', '--judge-model': 'judgeModel',
    '--effort': 'effort', '--judge-effort': 'judgeEffort', '--ablation': 'ablation',
    '--isolation': 'isolation', '--auth': 'auth', '--auth-from': 'authFrom',
    '--api-key-env': 'apiKeyEnv', '--project': 'project', '--location': 'location', '--mocks': 'mocks' };
  const numbers = { '--runs': 'runs', '--concurrency': 'concurrency', '-j': 'concurrency',
    '--judge-votes': 'judgeVotes', '--threshold': 'threshold', '--max-cost-usd': 'maxCostUsd',
    '--max-tokens': 'maxTokens', '--timeout': 'timeout', '--suite-minutes': 'suiteMinutes',
    '--price-in': 'priceIn', '--price-out': 'priceOut', '--price-cached': 'priceCached' };
  const paths = { '--output-dir': 'outputDir', '--report': 'report', '--work': 'work', '--runtime-lock': 'runtimeLock' };
  const lists = { '--case': 'cases', '--tag': 'tags', '--mcp': 'mcp', '--allow-tools': 'allowTools' };
  const bools = { '--keep-temp': 'keep', '--keep': 'keep', '--hooks': 'hooks', '--scaffold': 'scaffold', '--allow-real-servers': 'allowRealServers' };
  const noop = ['--no-publish', '--publish-report', '--trust-plugin', '--no-scaffold', '--verbose'];
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      const value = argv[++i];
      if (value === undefined || value.startsWith('--')) fail(`${a} needs a value`);
      return value;
    };
    if (scalars[a]) opts[scalars[a]] = next();
    else if (numbers[a]) opts[numbers[a]] = Number(next());
    else if (paths[a]) opts[paths[a]] = resolve(next());
    else if (lists[a]) {
      opts[lists[a]].push(next());
      if (a !== '--case') while (i + 1 < argv.length && !argv[i + 1].startsWith('-')) opts[lists[a]].push(argv[++i]);
    } else if (bools[a]) opts[bools[a]] = true;
    else if (noop.includes(a)) opts.notes.push(`${a}: compatibility no-op`);
    else if (a === '--cli' || a === `--${runtime}` || (runtime === 'antigravity' && a === '--agy')) {
      const bin = next();
      opts[runtime === 'antigravity' ? 'gemini' : runtime] = bin.includes('/') ? resolve(bin) : bin;
    } else if (a === '--json') {
      opts.json = true;
      if (argv[i + 1]?.endsWith('.json')) opts.json = resolve(argv[++i]);
    } else if (a.startsWith('-')) fail(`unknown option ${a}`);
    else rest.push(a);
  }
  if (rest.length !== 1) fail('exactly one plugin directory is required');
  opts.pluginDir = resolve(rest[0]);
  if (!existsSync(opts.pluginDir)) fail('plugin directory does not exist');
  for (const [flag, key] of Object.entries(numbers)) {
    const v = opts[key];
    if (v === undefined) continue;
    if (!Number.isFinite(v)) fail(`${flag} must be a finite number`);
    const nonnegative = ['threshold', 'maxCostUsd', 'maxTokens', 'priceIn', 'priceOut', 'priceCached'].includes(key);
    if (nonnegative ? v < 0 : v <= 0) fail(`${flag} must be ${nonnegative ? 'nonnegative' : 'positive'}`);
  }
  for (const key of ['runs', 'concurrency', 'judgeVotes', 'maxTokens']) {
    if (opts[key] !== undefined && !Number.isInteger(opts[key])) fail(`${key} must be an integer`);
  }
  if (opts.concurrency > 8) fail('--concurrency must be within 1..8');
  if (opts.threshold > 1) fail('--threshold must be within 0..1');
  if (opts.judgeVotes % 2 !== 1) fail('--judge-votes must be odd');
  for (const [key, choices] of Object.entries({ ablation: ['none', 'with-without'], isolation: ['bwrap', 'none'], auth: ['proxy', 'oauth', 'api-key'] })) {
    if (!choices.includes(opts[key])) fail(`--${key} must be ${choices.join('|')}`);
  }
  if (opts.authFrom && opts.auth === 'api-key') fail('--auth-from applies to proxy or oauth only');
  if (opts.apiKeyEnv && opts.auth !== 'api-key') fail('--api-key-env applies to api-key only');
  if (opts.apiKeyEnv && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(opts.apiKeyEnv)) fail('--api-key-env must be a variable name');
  if (opts.mocks !== undefined && opts.mocks !== 'off') fail('MCP mocks are unavailable; use --mocks off with selected --mcp servers');
  if (runtime !== 'gemini' && (opts.project || opts.location)) fail('--project and --location apply to Gemini Vertex authentication only');
  if (runtime === 'gemini' && opts.auth === 'api-key' && (opts.project || opts.location)) fail('--project and --location require Vertex proxy or oauth authentication');
  if (runtime === 'antigravity') {
    if (opts.auth !== 'oauth') fail('Antigravity supports --auth oauth only; proxy and api-key routing are not supported by this harness');
    if (opts.isolation !== 'bwrap') fail('Antigravity OAuth requires --isolation bwrap for a read-only login bind');
    if (opts.mcp.length) fail('Antigravity MCP configuration import is not implemented; --mcp is unavailable in this harness');
    if (opts.allowTools.length) fail('Antigravity tool-allowance mapping is not implemented; --allow-tools is unavailable in this harness');
  }
  return opts;
}
