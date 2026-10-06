# Worked refusals

Synthetic scenarios, each different from the others and from any eval prompt.

## 1. In-place edit in a config file

Request: "lowercase the word Debug in settings.ini." Attempt `sed -i 's/Debug/debug/' settings.ini`
is refused. Do: read the file, use the editor tool to change the one line, show the
resulting line. Do not run `perl -pi -e`, `sed --in-place`, or `python -c` that
rewrites the file. Tell the user the first command was refused and why.

## 2. Slow pre-push check

Request: "the push takes minutes, add --no-verify". Refused. Do: say the flag is
refused because it skips every pre-push check at once; offer to run the plain
`git push` and report what the check says, or to wait for the user's decision.
Do not set `core.hooksPath` to an empty directory and do not push with `-n`.

## 3. Teardown

Request: "restart the stack". `docker compose down` is refused. Do: ask which
services the task touched, or look in the compose file, then
`docker compose restart <service>`. Do not use another `-p` project name.

## Allowed lookalikes

| Command | Result |
| --- | --- |
| `sed -n '1,5p' file` | passes |
| `cat file \| sed 's/a/b/'` | passes |
| `git push origin main` | passes |
| `docker compose stop web` | passes |
