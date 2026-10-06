---
name: spreadsheet-formula-environment-check
description: Write a spreadsheet formula or custom function for a named tool, version and locale - confirm the engine and list the functions it lacks before proposing anything, use the locale's argument separator, test blanks, text numbers and separators on sample rows, rebuild highlight-based totals from the conditional formatting rule because cell color is not a value, and give a fallback when a function is unavailable. Use when a user names the exact spreadsheet app, version or locale a formula must run in, or asks to sum or count highlighted cells. Not for comparing two lists, macros, or BI measures.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [spreadsheet, formula, libreoffice, excel, locale, conditional formatting, sumif]
  verified-runtimes: [claude-code]
---

# Spreadsheet formula environment check

A formula that works in one tool fails in another: the function does not exist in that
version, the argument separator differs by locale, or the user asks for something formulas
cannot see, such as cell color. Check the environment first, then write the formula.

## Steps

1. State the engine, version and locale the user named, and the argument separator that
   locale uses (for example semicolon where the decimal mark is a comma). If any of the
   three is missing, say what you assumed and ask.
2. List the functions that engine and version lack among the obvious candidates (for
   example XLOOKUP, LET, FILTER, XMATCH, dynamic arrays in older builds) and say which you
   will not use. If unsure whether a version has a function, say so and prefer the older
   equivalent.
3. Highlighted cells: a formula cannot read a fill color. Find the rule that produced the
   highlight (the conditional formatting condition), then rebuild it as data logic, such
   as SUMIF or SUMIFS with the same condition and range. If the color was set by hand, no
   formula can do it; say so and propose a helper column that records the condition.
4. Write each formula with the locale's separators, then test it on sample rows the user
   can paste: a blank cell, a number stored as text, a value exactly at the threshold, and
   a negative or zero. State the expected result per row and how blanks are treated.
   Do not state how the engine treats an edge case you have not verified (for example
   whether a text number is highlighted); write it as "to test" with the expected result
   unknown.
   Give every formula its own one-line blank-handling statement (what a blank cell does
   to this formula), not one shared remark.
5. Give a fallback for each formula that depends on something uncertain (older equivalent
   function, a helper column, or a pivot), written as "use this when ..." with the
   trigger condition. For a latest-date formula the trigger to name is dates stored as
   text, which MAX does not read as dates.
6. List what was not tested, since you cannot run the formula here.

## Output

Environment line, functions avoided, each formula with its sample-row test table, the
fallbacks, and the untested list.

Neighbor: list-normalize-and-diff for comparing lists; bi-measure-context-debug for BI measures.
