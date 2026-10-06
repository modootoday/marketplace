---
description: A postmortem request with KST times, a human-error framing and a vague action. The postmortem must use UTC, trace past the person and make actions owned and verifiable.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [incident-postmortem]
---

어제 장애 회고 문서 써 줘.

- 14:05 KST 개발자 A가 주문 테이블에 컬럼 추가 마이그레이션을 운영 DB에 실행
- 14:06 결제 API 오류율 급증 (테이블 잠금)
- 14:21 고객센터 문의로 처음 인지 (알림은 안 옴)
- 14:38 마이그레이션 중단, 14:45 정상화
- 원인: A가 확인 없이 실행함
- 재발 방지: 다들 더 조심하기
