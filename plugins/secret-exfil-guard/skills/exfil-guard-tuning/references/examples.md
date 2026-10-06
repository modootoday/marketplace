# Worked examples

Synthetic; none mirrors an eval prompt.

## Compare a key file between two hosts

Ask: "is the deploy key on the staging box the same as here?" Refused: `cat deploy.pem`.
Do: `sha256sum deploy.pem` on each host and compare the two digests. No value printed.

## Teach the guard a project CLI

A project has a script `vaultctl` with verbs `show` and `dump` that print values.
Config:

```json
{
  "secretPaths": ["\\bvault-export\\.ya?ml\\b"],
  "valuePrintingCommands": [{ "binary": "vaultctl", "verbs": ["show", "dump"] }]
}
```

Prove: `vaultctl show` refused with the config, allowed without it; `ls vault-export.yml`
passes in both.

## Support wants the settings file

Ask: "attach settings.toml and secrets.json to the ticket". Do not upload secrets.json.
Offer a copy with values replaced by REDACTED, created by the user, and describe the keys.
