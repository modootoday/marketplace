# Option table template

## Product

| Field | Value |
| --- | --- |
| Product name | |
| Base price | |
| SKU pattern | e.g. {product}-{colour}-{size} |
| Store | |
| Rules version and date | |

## Option axes and values

| Axis | Value | Code |
| --- | --- | --- |
| Size | S, M, L, XL | S, M, L, XL |
| Colour | Black, Navy | BK, NV |
| Bundle | Single, Pair | 1, 2 |

## Price rules

| Rule id | Applies to | Effect | Notes |
| --- | --- | --- | --- |
| P1 | Size XL | +2,000 | |
| P2 | Bundle Pair | price x 2 - 3,000 | XL surcharge counts twice |
| X1 | Navy + XL + Pair | fixed 39,000 | named exception, overrides P1 and P2 |

## Exclusions

| Rule id | Combination | Reason |
| --- | --- | --- |
| E1 | Navy + S | not produced |

## Stock

| Combination or value | Quantity | Read on |
| --- | --- | --- |
| | | |

## Store limits

| Limit | Value |
| --- | --- |
| Max option combinations | |
| Option name length | |
| Price difference allowed vs base | |
