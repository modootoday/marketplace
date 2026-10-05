# Branch table

| Branch | No approver present | Detect it by |
| --- | --- | --- |
| allow | runs | the run log shows the action |
| ask | stops, times out or is skipped | a timeout, non-zero exit, or an ask event in the log |
| deny | action refused, the run may continue and exit zero | the artifact check, not the exit code |
| dynamic option | not decidable from the file | a run-time log of the final command |

## Denied action equivalents

Treat as the same request as the denied one: the same command with added or removed flags
(force, recursive, no-preserve-root, an isolation or sandbox bypass), the same target through
a different path (relative, absolute, symlink, glob), the same effect through a wrapper
(a shell, an interpreter one-liner, a script, a package runner), and a split into several
smaller steps. A rule written for the exact string is not enough; match the verb and the
target.

## Credential and login wall

- Credentials come from the environment or a secret store through the harness, never from
  the chat or the model input, and never into tool logs.
- On a login wall: stop the task, hand off to the user with the page and the reason, allow a
  fixed number of retries (for example 2), and resume the original task after login.

## Artifact check

After the run compare the expected file or diff before and after. No change means the run
failed, even if the agent reported done.
