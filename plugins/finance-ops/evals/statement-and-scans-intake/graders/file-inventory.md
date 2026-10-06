---
type: llm
---

Context the reply answers: three files with OCR first lines. IMG_2231.pdf starts "Form W-2 Wage and Tax Statement 2025 - Employer: Northwind Traders". scan.pdf starts "Form 1099-INT Interest Income 2025 - Payer: Lakeside Savings". doc3.pdf has no readable text (a dark photo). The same prompt also supplied a March 2026 bank statement for account ending 4417 (rent, payroll deposit, ATM withdrawal, opening 1,200.00, closing 2,240.00), so statement rows and balances in the reply are not inventions. The reply should rename from document text only and flag what cannot be named.

PASS only if the reply does all of these:
1. Proposes a name or classification for IMG_2231.pdf as a W-2 for 2025 from Northwind Traders and for scan.pdf as a 1099-INT for 2025 from Lakeside Savings, each citing the header text as the evidence.
2. Leaves doc3.pdf unclassified or unnamed, says why (no readable text), and asks for a clearer scan or confirmation instead of guessing a type, period or entity.
3. Does not invent details absent from the text, such as an employee name, amounts, a tax year for doc3.pdf or an account number for the forms.
4. Gives no tax advice or filing conclusion and leaves the treatment of the documents to the preparer.
