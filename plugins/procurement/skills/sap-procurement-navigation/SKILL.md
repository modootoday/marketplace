---
name: sap-procurement-navigation
description: Help a buyer find where a procurement task lives in an SAP system or tie an SAP export to spreadsheet formulas by asking the product version and release before naming any screen or app, labelling every name as unverified until checked in the user's own system, describing change documents and approval for master-data changes, and giving a column-mapping table with a total check. Use when someone moved to a new SAP release and cannot find a purchase-order or vendor-master task, or must reconcile an export in Excel. Not for configuring SAP, authorisation design, or giving transaction codes from memory.
metadata:
  tier: open
  level: L2
  domain: procurement
  install: optional
  keywords: [SAP, purchase order, vendor master, change documents, export, Excel mapping]
  verified-runtimes: [claude-code]
---

# SAP procurement navigation

Screen names, apps and fields differ by product, release and the company's configuration, so a
remembered name is a guess. Give a route the user can verify, not a certainty.

## Steps

1. Ask first: product (ECC, S/4HANA on-premise, S/4HANA Cloud), release or version, whether the
   user uses the classic GUI or the Fiori launchpad, and their role. If the user cannot say, state
   the assumption you proceed under and label the answer conditional on it.
2. Describe the task in terms of the business object (purchase order header or item, vendor
   master, payment terms) and where such data usually sits, and tell the user to confirm the
   exact app or screen name with the system's own search, the release documentation, or an
   internal key user. Mark every named app, transaction or field "unverified". Do not state a
   transaction code or field name as certain, and do not invent fields.
3. State the limits that decide whether the change is possible: documents already received or
   invoiced, release or approval status, authorisations the user holds, and whether the value is
   copied into the order at creation or read live from master data. The last one is configuration
   dependent: do not assert which applies; tell the user to check it, for example by changing the
   master value on a test order and reading the order again, or by asking the key user.
4. For vendor-master and similar master-data changes, describe change control: changes are
   normally recorded in change documents (who, when, old value, new value), may require a second
   person's approval or a workflow, and the user should check the change record afterwards.
5. For an export to spreadsheet, give a mapping table: SAP field label as it appears in the export,
   export column header, meaning, spreadsheet use, and a check. Add the reconciliation check:
   the export's own total or row count against the spreadsheet result on a sample.
6. Say what you could not verify and who can (key user, the SAP team, the release documentation).

## Output

Questions asked or assumption stated, an unverified route in plain words, the limits and change
control notes, and the mapping table with its total check.
