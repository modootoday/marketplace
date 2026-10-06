---
name: lab-calculation-and-claim-check
description: Check AI-assisted wet-lab work before use - redo every dilution and unit conversion with units carried through, compare generated results tables with the raw numbers at their stated precision, and test whether a cited paper or kit manual actually contains the requested method, sample type and condition. Use when an assistant gave a dilution, a protocol parameter with a citation, a rounded results table, or says a paper contains a specific method. Not for designing experiments, replacing a pilot test, finding substitute citations, safety sign-off, or checking a structure entry for a ligand (use structure-record-ligand-presence-check).
metadata:
  tier: open
  level: L4
  domain: academic-research
  install: optional
  keywords: [dilution check, unit conversion, results table, citation applicability, protocol parameter, lab calculation]
  verified-runtimes: [codex-cli]
---

# Lab calculation and claim check

This supports the researcher who runs the experiment. It checks the arithmetic
and the sources that were supplied; it does not replace a pilot test or the
researcher's judgement. Work only from the numbers and source text in the
request.

## 1. Redo every calculation

For each dilution or conversion write the formula, then every step as its own line with units
carried through: the mass or amount needed (final concentration x final volume), the stock
concentration converted to the same unit, then the stock volume (amount / stock concentration). Convert to one
unit set before comparing. State the result next to the assistant's value and
mark it matches, differs, or cannot be checked (missing input). When a value is
corrected, show the step where the original went wrong.

## 2. Tables against raw numbers

Recompute means and spreads from the raw values given, at the stated precision
and with the stated formula (sample or population, say which when unknown).
Flag rounding that hides variation, a spread reported as exactly zero when the
raw values differ, and transcription changes. Give the recomputed value and the
precision at which it should be reported only as far as the raw values support.

## 3. Cited sources

For each cited paper or manual, state what the supplied abstract or text says
about method, sample type, species or material, and condition, and compare each
with the suggested parameter. Say supported, partly supported or not supported,
and quote the line. If only a title or abstract was supplied, say that the full
text was not checked. Do not supply a replacement citation or recall one from
memory; say a search by the researcher is needed.

## 4. Identifier-based claims

For a claim that a paper contains a named method, check it against the identifier
and text that were supplied. If it is not there, say so. A claim that a structure
entry holds a named ligand is handled by structure-record-ligand-presence-check.

## 5. Output

Calculation checks, table check, citation check, then what must be confirmed by
a pilot test. Close with "To verify by the researcher": calculations on the
actual lot and stock concentration, the cited sources in full text, and anything
not supplied. Do not state that a protocol parameter will work.
