---
description: A five-row register table with 1-based addresses, two 32-bit floats and a duplicate name. The reply must convert, check, flag and recommend a bench test without claiming one.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [device-config-file-from-register-table]
---

Register table: Temp1 40001 INT16; Temp2 40002 INT16; Flow 40010 FLOAT32 (2 registers); Flow 40012 FLOAT32; Status 40020 BOOL. Target format: name, address (0-based), type, count. Documents say addresses are 1-based Modbus holding registers (4xxxx). Produce the map.
