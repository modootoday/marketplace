---
name: anonymized-script-patch-back
description: Apply a change made to an anonymized copy of a script back to the real script - keep a local replacement table of placeholders and real identifiers, take only the changed hunks, map them back through the table, apply them to the real file, and check that no secret or real value is in text sent to a model. Use when a script was scrubbed (HOST1, TOKEN_X) before AI help and the fix must now land in the original. Not for general script review or for deciding what data may be shared.
metadata:
  tier: open
  level: L3
  domain: it-ops
  install: optional
  keywords: [anonymized script, placeholder mapping, patch back, secret handling, diff, redaction]
  verified-runtimes: [claude-code, codex-cli]
---

# Anonymized script patch-back

One administrator reports having to edit the scrubbed and the real script separately.
Evidence is a single report; the method keeps the mapping local so the model never needs it.

## Steps

1. Keep the replacement table on the user's machine only: placeholder, real value kind, and
   where it occurs (never paste real values into the conversation). Ask the user to supply
   it locally or to run the substitution there; if the reply would need a real value, stop
   and say so.
2. Get the model's change as a diff against the anonymized original, not as a whole new
   file. List the hunks (line range, before, after).
3. For each hunk check that it only touches logic. A hunk that adds, removes or renames a
   placeholder, or invents a new literal that looks like an identifier, is flagged for the
   user to decide.
4. Map each hunk back through the table, and say so in the answer: name each placeholder
   the hunk contains and its entry in the local table (HOST1 to the real host, TOKEN_X to
   the real secret reference), even when the changed words are not themselves placeholders.
   Do the reverse substitution locally, with a small command or script that reads the table
   file, never by pasting real values. Then apply only those hunks to the real file by line
   context. Untouched lines of the real file stay byte-for-byte. Prefer the real script's
   own secret reference (variable, vault) over a literal.
5. Verify: diff the real file before and after and confirm it equals the hunks mapped back.
   Give the user a runnable outbound-text check, because the model cannot see the real
   values: save every text sent to the model in a file and run, locally,
   `cut -f2 replace.map | grep -F -f - sent.txt` (any output means a real value left) and
   `grep -nE '[A-Za-z0-9+/=_-]{32,}|-----BEGIN|://[^ ]*:[^ ]*@' sent.txt` for secret shapes.
   Say which checks you ran yourself (only a placeholder scan of your own answer) and which
   the user must run. If a real value appears, treat it as exposed and tell the user to
   rotate it.
6. State what could not be checked: the real file or the table was not seen, so the apply
   step is instructions, not a performed edit, unless the user ran it.
   Explicitly report that script behavior and absence of leakage remain unverified until
   the owner completes the corresponding local checks; an own-answer placeholder scan
   does not establish either.

Read `references/worked-example.md` (relative to this skill) before answering; it shows the
hunk confined to its line range, the mapping table and the apply-by-line-context step.

## Mapping table (required in the answer)

One row per placeholder that appears in any changed line or in its context lines:
placeholder, entry in the local table, form used in the real file (the real name stays
local; write "value from the table" or the variable name), and the command that does the
substitution. Example row: `TOKEN_X` | table entry TOKEN_X | the real script's token variable
| a local script that reads the table and rewrites the hunk before applying. The
answer must say that the apply step uses this table, even when the hunk's own edits leave
the placeholders alone, because the surrounding line is matched and rewritten through it.

## Output

The mapping table, the hunk list, the mapped-back patch using placeholders for any value the model must not
see, the apply and verify commands, the outbound-text check and what was not verified.
