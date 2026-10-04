---
description: Virtual account orders shipped right after confirmation. The fix must wait for the deposit webhook and verify it.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [toss-payments-integration]
---

토스페이먼츠로 가상계좌 결제를 붙였는데, 결제 승인 API가 200을 돌려주면 바로 주문을 "결제 완료"로 바꾸고
출고 요청을 보내고 있어. 그런데 입금 안 한 주문이 출고되는 일이 생겼어. 어떻게 고쳐야 해?
