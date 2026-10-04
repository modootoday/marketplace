---
description: What tts-subtitle-sync should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [tts-subtitle-sync]
---

TTS로 만든 매장 안내 영상에 한국어 자막을 넣으려고 해. 화면 대본은 "영업시간은 오전 7시부터 오후 10시 30분까지입니다"이고, TTS에는 "일곱 시", "열 시 삼십 분"처럼 읽는 글로 넣었어. 오디오를 whisper에 돌려서 단어 타임스탬프로 자막 타이밍을 뽑으면 되지?
