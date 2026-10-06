# Headless controls by runtime

Checked against installed help and the primary documentation on 2026-10-06. Check the chosen
binary's `--version` and `--help` again; this is a versioned recipe, not a promise about every release.
Run from the isolated job directory. `MODEL` is the user-selected available model and `CAP_USD`
is the preapproved numerical limit. `timeout` below is the GNU utility; use an equivalent process
supervisor on other systems. Each recipe starts one process and captures a report in the parent.

## Claude Code

```sh
timeout 300s claude -p --model "$MODEL" --permission-mode dontAsk \
  --tools 'Read,Glob,Grep' --allowedTools 'Read,Glob,Grep' \
  --max-budget-usd "$CAP_USD" --output-format text \
  < brief.md > result.md 2> run.log
```

This read-only recipe denies unapproved tools. File/tool permissions are not OS containment:
configure Claude's sandbox or use an external container for shell jobs. For editing, preauthorize
the exact write set and permitted acceptance command in job-local settings. `--max-budget-usd`
applies in print mode to API calls; verify its behavior for the chosen billing route and allow
headroom for a call already in flight. Do not enable permission bypass as a remedy for denial.
See [CLI reference](https://code.claude.com/docs/en/cli-reference) and
[sandboxing](https://code.claude.com/docs/en/sandboxing).

## Codex CLI

```sh
timeout 300s codex exec --model "$MODEL" --sandbox read-only \
  -c 'approval_policy="never"' --skip-git-repo-check \
  --json --output-last-message result.md - < brief.md > events.jsonl 2> run.log
```

For a write job use `--sandbox workspace-write` in the isolated job directory; `never` refuses
operations that require escalation. The parent writes the final-message file even for a read-only
agent. No native dollar or turn cap is established by `codex exec --help`; paid runs need an
external enforced maximum charge. JSON usage is accounting, not a quota reader.
See [non-interactive mode](https://developers.openai.com/codex/noninteractive) and
[CLI reference](https://developers.openai.com/codex/cli/reference).

## Gemini CLI

```sh
timeout 300s gemini --model "$MODEL" --sandbox --approval-mode plan \
  --output-format text -p 'Read the supplied brief and return the required report.' \
  < brief.md > result.md 2> run.log
```

`-p` appends piped input. Plan mode is read-only; `auto_edit` approves edits, not arbitrary shell
commands. For a write job configure narrow policy rules and the sandbox before launch; stop if
headless confirmation is unavailable. No native dollar cap is established by installed help.
Disable automatic credit fallback and use an enforced gateway for paid calls.
See [headless mode](https://geminicli.com/docs/cli/headless/) and
[policy engine](https://geminicli.com/docs/reference/policy-engine/).

## Grok CLI (Grok Build)

```sh
timeout 300s grok --model "$MODEL" --prompt-file brief.md --sandbox read-only \
  --permission-mode dontAsk --max-turns 8 --no-subagents \
  --output-format plain > result.md 2> run.log
```

These flags describe Grok Build, not unrelated community CLIs with the same name. Check installed
help. `workspace` is the sandbox profile for a bounded write job; preallow exact needed tool rules.
Turn limits and timeouts cannot enforce dollars; installed help establishes no dollar cap.
See [vendor CLI reference](https://docs.x.ai/build/cli/reference) and
[vendor sandbox guide](https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/18-sandbox.md).

## Antigravity CLI

```sh
timeout 300s agy --model "$MODEL" --sandbox --mode plan --print-timeout 300s \
  --output-format text -p "$(cat brief.md)" < /dev/null > result.md 2> run.log
```

The quoted expansion passes the file as one argument; shell syntax in the file is not reexecuted.
For larger briefs use the documented stream-json input protocol with one user message and close
stdin after it, rather than exceeding argument limits. Plan mode is read-only. For write jobs use
`--mode accept-edits` only inside a scoped sandbox with narrow permission rules; headless tools
needing an ungranted permission are skipped/blocked. There is no native dollar cap in installed help.
See [headless mode](https://antigravity.google/docs/cli/headless/) and
[CLI reference](https://www.agy.dev/docs/cli/reference/).

## Controls common to all five

- Read-only means the agent cannot write task files; parent redirection supplies the report. If a
  needed tool is denied in a particular plan mode, use a scoped policy that grants that tool or stop.
- For research, preserve live search/fetch access in the selected runtime and its policy. Do not
  infer live search from the model name. Codex search availability also depends on configuration.
- A timeout limits duration; a turn cap limits iterations. Neither guarantees a dollar ceiling.
  An enforced cap needs native support or a metering service that reserves the maximum charge
  before each request and rejects requests exceeding it. A provider budget alert is insufficient.
- Save the process exit code immediately. Inspect result completeness even on exit zero; a timeout,
  permission denial or cap leaves partial work open. Logs can contain sensitive context: redact
  before sharing and never put credentials into briefs, command arguments or published results.
