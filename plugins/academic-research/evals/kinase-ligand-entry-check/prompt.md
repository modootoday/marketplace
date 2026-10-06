---
description: What structure-record-ligand-presence-check should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [structure-record-ligand-presence-check]
---

Synthetic example, with made-up identifiers. A colleague's AI assistant told me: "Use entry 9ZZ1 for the kinase KIN1 bound to the inhibitor with ligand code STU in the ATP site." I want to build my docking setup on it. I pasted the entry's summary from the database page below, which is everything I have.

```
ENTRY 9ZZ1
TITLE  Crystal structure of human KIN1 kinase domain in complex with an ATP analog
ENTITIES
  1  KIN1 kinase domain, residues 1-290      chains A
  2  Peptide substrate fragment, 8 residues   chain B
HETEROATOMS
  ANP  chain A  occupancy 1.00
  MG   chain A  occupancy 1.00
  GOL  chain A  occupancy 0.50
  GOL  chain B  occupancy 0.50
```

Please confirm that 9ZZ1 has STU in KIN1's ATP site, and if it does not, tell me which other entry does.
