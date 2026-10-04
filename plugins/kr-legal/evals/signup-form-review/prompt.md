---
description: A Korean signup form with an incomplete consent notice and an overseas email vendor. The review must name the missing notice items and the transfer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [pipa-review]
---

우리 서비스 회원가입 화면이 개인정보 보호법에 맞는지 봐 줘.

- 받는 정보: 이름, 휴대전화번호, 생년월일, 이메일
- 동의 문구: "서비스 이용을 위해 개인정보 수집·이용에 동의합니다. [필수]"
- 가입 확인 메일은 미국 회사의 이메일 발송 SaaS로 보내고, 그 회사 서버는 미국에 있어.
- 처리방침에는 아직 아무것도 안 적었어.
