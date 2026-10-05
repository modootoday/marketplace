Review whether to switch lexical search to the new embedding retriever. All inputs are below; no files or live tools are needed. k=2, one eligible relevant document per query. Both arms use the same corpus and filters.

First relevant ranks (null means absent):
| Query | Language | Lexical | Embedding |
| e1 | en | 2 | 1 |
| e2 | en | 2 | 1 |
| e3 | en | null | 1 |
| k1 | ko | 1 | 3 |

The engineer calls the aggregate MRR improvement a sufficient launch reason. Their "p95=40ms" is a warm retrieval-kernel timing excluding query embedding; the product budget is 100ms cold end-to-end. No language regression tolerance is agreed. Write a decision readout and the next measurements; do not assume production traffic weights.
