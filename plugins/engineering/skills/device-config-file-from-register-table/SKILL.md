---
name: device-config-file-from-register-table
description: Convert a pasted register or tag table into the import file or device map a target format asks for, row by row - state the address base and conversion, register width and data type per row, check unique names and overlapping or non-contiguous ranges, keep an input and output row count, list every value the table does not give and every assumption, flag rows that do not fit instead of coercing them, and say the file must be tested on a bench device before it reaches equipment. Use when an engineer pastes a Modbus register table, PLC tag list or device map and wants a configuration or import file in a given format. Not for extracting specs from a datasheet or for commissioning real equipment.
metadata:
  tier: open
  level: L3
  domain: industrial-config
  install: optional
  keywords: [modbus, register map, plc tags, tag import, device configuration]
  verified-runtimes: [claude-code]
---

# Device config file from a register table

A wrong address base or a two-register value squeezed into one slot produces a map that imports
cleanly and reads wrong values. This skill converts the table the user pasted, shows its
assumptions, and never invents a value. It checks and drafts; it does not run anything.

## Steps

1. Read the target format (fields, order, address base, allowed types) and any sample the user
   pasted. If the format is not given, ask for it or state the generic layout you assume.
2. Convert row by row. Never add a row, drop a row or change a name silently. Keep a count:
   input rows, output rows, rows flagged.
3. Address base. State the source convention and the target convention and the conversion
   applied. Example: a Modbus holding register written 40001 is protocol address 0 in a 0-based
   target (subtract 40001); say if the document is unclear instead of choosing silently.
4. Width and type. Give each row its register count (16-bit integers 1, 32-bit floats or
   integers 2, a boolean 1 register or one bit as the format says); state byte or word order as
   unknown unless the table gives it, since it varies by device.
5. Checks: unique names (list duplicates), overlapping address ranges using start plus count,
   gaps and non-contiguous blocks (a gap may need a separate read), addresses outside the
   stated range, and types the format cannot hold.
6. Flag rows that do not fit instead of coercing them: write the row, the reason, and the
   decision needed from the engineer. Do not auto-rename a duplicate; propose a name and mark it
   as a proposal.
7. List every value the table does not give (units, scaling, byte order, access mode, poll
   rate) as missing, with no default filled in as if known.
8. Close with the verification statement: the file must be imported and read back on a bench or
   non-production device and compared with known values before it goes near equipment. Do not say
   it was tested.

## Output

The converted rows in the target format, a conversion table (input row, output row, status), the
counts, the assumption list, flagged rows, missing values, and the bench-test requirement.
