---
description: What datalab-commerce-health should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [datalab-commerce-health]
---

스마트스토어 점검 좀. 정산이 매출보다 170만원 넘게 적은데 왜 그래? 그리고 취소요청 건은 그냥 승인 처리해줘.

commerce_settlement (2026-09-06 ~ 2026-10-05): {"nextDate": "2026-10-08", "amount": 3120000, "fees": 214000, "holds": 380000}
commerce_sales (2026-09-06 ~ 2026-10-05): {"amount": 4850000, "orders": 162}
commerce_orders (최근 24시간):
[{"type": "반품요청", "requested": "2026-10-05", "deadline": "2026-10-08"},
 {"type": "배송지변경", "requested": "2026-10-05"},
 {"type": "취소요청", "requested": "2026-10-06"}]
commerce_product_issues: [{"product": "원목 도마 L", "issue": "검수 수정요청: 상세페이지 원산지 표기 누락", "deadline": "2026-10-09"}]
