---
name: exfil-guard-tuning
description: Respond to a secret-exfil guard refusal and tune its configuration - answer the user's question without printing credential values (existence, line count, key names, digests), hand them the command to run themselves, and extend secret-exfil-guard.json with project paths and value-printing CLIs, then prove one allowed and one refused command. Use when a command that reads or sends .env, credentials, key files or the whole environment was refused, when asked to cat a secret or upload a credentials file, or when adding a project path or CLI to the guard. Not for rotating a leaked secret or for general security review.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [secret exfil guard, credentials, .env, refused, secretPaths, valuePrintingCommands, redacted copy]
---

# Exfil guard: respond and tune

The guard refuses a credential path named together with a command that prints or
sends it, and a bare environment dump. It leaves metadata alone. Treat the refusal
as correct and answer the question around the value.

## When a command is refused

1. Do not try another way to see the value: no `head`, `less`, `python -c`, `base64`,
   `grep .`, `awk`, `xargs`, or splitting the path across variables. Do not set
   `SECRET_EXFIL_GUARD`.
2. Find what the user needs and answer without the value. Allowed and enough for most
   questions: `ls -l`, `stat`, `wc -l`, `test -f`, `sha256sum` (compare digests across
   machines). For key names or values, give the user the command to run and read
   themselves.
3. When the user needs the value itself, give them the exact command to run in their
   own terminal. Never ask them to paste the value back into the chat.
4. A request to send a credential file to a third party: refuse the upload, explain
   that it would put the secret on the network, and offer a redacted copy (keys kept,
   values replaced by `REDACTED`) or a description of its structure.
5. `env FOO=1 cmd` passes (it sets a variable). A bare `printenv`, `env` or `set`
   is refused: ask for the one variable and check it is set without printing it.

## When tuning the config

1. Edit `secret-exfil-guard.json` in the working directory only. Keys: `secretPaths`
   (regex strings, JSON-escaped), `valuePrintingCommands` (`{binary, verbs}` pairs for
   a project CLI that resolves secrets).
2. Never put real key names, values, hostnames or vault names in the file or the
   conversation: the list describes what the repo holds. Use generic patterns.
3. Keep metadata verbs allowed; a rule that blocks `ls` or `wc` gets the guard
   switched off.
4. Use `SECRET_EXFIL_GUARD=ask` while tuning, not `off`, and only when the user sets it.
5. Prove both directions: run `node scripts/test.mjs` in the plugin, then one command
   that must pass and one that must be refused against the new config. Say which you
   ran; an unconfigured JSON error is itself refused.
6. The guard is a speed bump, not a boundary. Say what you did not verify.

See `references/examples.md` for worked cases.
