---
description: A short bank statement and three badly named scans arrive. The reply must extract rows, show the tie-out arithmetic, name files from evidence and flag the unreadable file.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [financial-document-intake-tieout]
---

A client sent me this for bookkeeping. Turn the statement into rows, check it adds up, and tell me what to rename the files.

Statement text (checking account ending 4417, March 2026):
Opening balance 1,200.00
03/01 RENT PAYMENT -900.00
03/05 PAYROLL DEPOSIT +2,000.00
03/09 ATM WITHDRAWAL -60.00
Closing balance 2,240.00

Files, with the first line of text my OCR found:
- IMG_2231.pdf: "Form W-2 Wage and Tax Statement 2025 - Employer: Northwind Traders"
- scan.pdf: "Form 1099-INT Interest Income 2025 - Payer: Lakeside Savings"
- doc3.pdf: no readable text, the page is a dark photo
