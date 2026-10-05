---
name: catalog-listing-with-options
description: Prepare a product registration where options, variants and price exceptions drive the output - build the full option matrix from the company's option table, give each combination its price, stock and SKU from the stated rules, flag every combination with no price or stock rule, and never invent a price. Use when the user asks to register or list a product with sizes, colours, bundles or add-ons on a store or marketplace, to build an option or variant sheet, or to check option pricing before upload. Not for writing the product description copy or for store search optimisation.
metadata:
  tier: open
  level: L2
  domain: growth
  install: optional
  keywords: [product options, variants, option matrix, SKU, option price, product registration, marketplace upload, bulk upload sheet]
---

# Catalog listing with options

The product page copy is rarely what goes wrong in a listing. The option
sheet is: a combination that should not exist is on sale, an XL surcharge
is applied to the bundle too, a colour sold out last week still shows stock,
or a price nobody set was filled in to complete the sheet. Each error turns
into an order the company has to cancel or honour.

This skill is a template. The company supplies the option table and its
price and stock rules; the skill expands them and flags what the rules do
not cover.

## Inputs the company supplies

- **Option table**: option axes (size, colour, bundle, add-on) and their
  values (template: `references/option-table-template.md`).
- **Price rules**: base price, surcharge or discount per value, and named
  exceptions (a specific combination with its own price). Rule ids on every row.
- **Exclusions**: combinations that must not be sold.
- **Stock source**: per combination or per value, with the date it was read.
- **Store limits**: max options per product, option name length, price
  difference limits relative to the base price, required fields.

If any of the price rules or the stock source is missing, ask for it before
building the sheet.

## Procedure

1. Expand the full matrix: every combination of option values.
2. Remove combinations on the exclusion list; keep them in a separate list.
3. For each remaining combination compute the price: base, plus each
   applicable surcharge, then named exceptions override. Record the rule ids
   used. If two rules conflict or none applies, leave the price empty and flag it.
4. Attach stock from the stock source; a combination with no stock row is
   flagged, not set to zero or to a guess.
5. Generate SKUs in the company's pattern, if one is given.
6. Check store limits: option count, name length, price difference limits.
   A combination that breaks a limit is flagged with the limit.

## Never

- Invent or round a price, surcharge or discount that no rule states.
- Fill missing stock with a default.
- Merge or drop an option value to fit a store limit without saying so.

## Stop and hand to a person when

- any combination has no price rule or conflicting rules;
- a price exception looks like a typo (far below cost or base) - ask, do not correct;
- the store's limits force a change in how options are offered.

## Output

1. The option sheet: combination, SKU, price, rule ids, stock, stock date.
2. Flagged combinations: missing price, conflicting rules, missing stock, store limit broken.
3. Excluded combinations.
4. Questions for the person who owns pricing, one per flag.
