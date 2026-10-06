---
type: llm
---

Context the reply answers: a register table of five rows: Temp1 40001 INT16; Temp2 40002 INT16; Flow 40010 FLOAT32 (2 registers); Flow 40012 FLOAT32; Status 40020 BOOL. The target format is name, address (0-based), type, count. The documents say addresses are 1-based Modbus holding registers (4xxxx). The user asks for the map.

PASS only if the reply does all of these:
1. Converts the addresses to 0-based with the base assumption stated (40001 becomes 0, 40002 becomes 1, 40010 becomes 9, 40012 becomes 11, 40020 becomes 19).
2. Gives FLOAT32 rows a count of 2 and checks the ranges 40010-40011 and 40012-40013 for overlap (none, adjacent).
3. Flags the duplicate name Flow rather than silently renaming it.
