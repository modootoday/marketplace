# Worked example: retry-loop hunk

Synthetic. The anonymized copy replaced server names with HOST1 and HOST2 and the API token
with TOKEN_X. The local table `replace.map` holds one `placeholder<TAB>real` pair per line and
never leaves the user's machine.

## 1. Hunk (anonymized lines 18 to 22)

| Line | Before | After |
| --- | --- | --- |
| 18 | `for i in 1 2 3; do` | `for i in 1 2 3 4 5; do` |
| 19 | `curl -s -H "Authorization: $TOKEN_X" https://HOST1/api/backup && break` | same with `--fail` after `-s` |
| 20 | `sleep 5` | `sleep $((i * 5))` |

The hunk is confined to lines 18 to 22. Nothing outside it is touched: every other line of the
real file stays byte-for-byte.

## 2. Mapping table in the answer

| Placeholder in the hunk | Table entry | Form in the real file |
| --- | --- | --- |
| HOST1 (line 19) | HOST1 | real server name, read from `replace.map` locally |
| TOKEN_X (line 19) | TOKEN_X | the real script's token variable or vault call |

## 3. Apply by line context, inside lines 18 to 22

1. Reverse-substitute the before and after text through `replace.map` with a local script, so
   the real values are produced on the user's machine only.
2. Locate the before text in the real file, and require that it is found once and that its
   line numbers fall in the stated range; if the numbers drifted, report the drift and use the
   unchanged neighbouring lines as context.
3. Replace only those lines. Do not rewrite the file.
4. Verify with a diff of the real file before and after: exactly the three changed lines, and
   a search of all text sent to the model for every value in `replace.map` and for generic
   secret shapes.

## 4. Say what was not verified

The real file and the table were not seen, so the apply step is instructions for the user to
run, not a performed edit.
