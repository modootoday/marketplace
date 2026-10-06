---
name: structure-record-ligand-presence-check
description: Check a recommended structure entry against the record text the researcher pastes - restate the target, ligand name or code and any ID given, search the pasted record for that ligand code, chain and occupancy, report "not found in the pasted text" when absent, never name an entry ID from memory, and list what to confirm in the source database. Use when an assistant or colleague recommends a structure for a named ligand or target and the claim must be checked before use. Not for docking, scoring or judging binding, and not for other citation checks (use lab-calculation-and-claim-check).
metadata:
  tier: open
  level: L3
  domain: academic-research
  install: optional
  keywords: [protein structure, ligand, PDB entry, structure record, verification, hallucinated identifier]
  verified-runtimes: [codex-cli, gemini-cli, grok-cli, antigravity]
---

# Structure record ligand presence check

A researcher reported an AI-recommended structure that did not contain the requested ligand.
This skill compares the claim with the record text supplied and nothing else. It does not
recall entries, so it can only confirm presence or absence in what was pasted.

## Steps

1. Restate the request in a line: target, ligand name, ligand code if known, chain or site
   if given, and the entry ID that was recommended.
2. Ask for the record if none was pasted: title, entity list, ligand or heteroatom table with
   chain and occupancy. Without it, say the check cannot be done.
3. Search the pasted record for the ligand code and the name, case-insensitively, in the
   ligand table, the entity list and the title. Report each hit with chain and occupancy, or
   write "not found in the pasted text". List the ligands that are present, with their codes.
4. Do not treat a similar ligand (an analog, a fragment, a solvent molecule) as the requested
   one; name the difference and let the researcher decide.
5. Never supply another entry ID, ligand code or release detail from memory, even when asked
   for "the right one". Offer search terms and filters for the researcher's own database query.
6. List what the researcher must confirm in the source database: that the pasted text is the
   full record and the current version, the ligand code against the database's chemical
   dictionary, chain, occupancy and any partial or alternate positions, and the target's species
   and construct.

## Output

A short table: requested item, found or not found in the pasted text, location, chain,
occupancy; the ligands actually present; and the confirm list. Then state, in these words or
close to them:

- when another entry was asked for: "I cannot name another entry from memory; paste its record
  and I will check it";
- "Hold any docking or modelling setup until the ligand is confirmed in a record of the entry
  you choose";
- "I did not judge binding, pose or suitability".
