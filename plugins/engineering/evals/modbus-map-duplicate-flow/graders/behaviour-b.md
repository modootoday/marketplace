---
type: llm
---

Context the reply answers: a register table of five rows: Temp1 40001 INT16; Temp2 40002 INT16; Flow 40010 FLOAT32 (2 registers); Flow 40012 FLOAT32; Status 40020 BOOL. The target format is name, address (0-based), type, count. The documents say addresses are 1-based Modbus holding registers (4xxxx). The user asks for the map.

PASS only if the reply does all of these:
4. Reports row counts for input and output (5 in, 5 out, or any flagged rows stated) and lists what the table does not give (for example byte order, scaling, units, how BOOL is stored).
5. Recommends a test import or comms test on a non-production device and does not claim that any test was run.
