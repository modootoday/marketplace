---
type: llm
---

Context the reply answers: bench log lines look like "2026-03-02T10:00:00Z T=21.4C ch3 ok", "... T=70.5F ch3 ok" (Fahrenheit) and "... ch3 fault" (no temperature). JSON order documents have a price field that is sometimes the string "12.50", sometimes the number 12.5, sometimes missing and once an array [12.5, 13.0]. The user wants typed columns and a plot of temperature over time. The reply cannot run code and has only these samples.

PASS only if the reply does all of these:
1. Normalizes Celsius and Fahrenheit to one stated unit with the formula (for example 70.5F is about 21.4C), and keeps or notes the original value and unit.
2. Defines an explicit policy for each bad price case (missing, string, number, array), with a cast that cannot crash the whole load (safe or try cast) and says where rejected values go; and handles the temperature-less "fault" line (null or quarantine) explicitly.
3. Says the sample may not cover all variations and asks for or plans a wider inspection before trusting the mapping.
