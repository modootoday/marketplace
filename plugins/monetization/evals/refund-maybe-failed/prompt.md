---
description: A refund that timed out and a request to send it again. The answer must look up the state first and act at most once.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [refund-dispute-ops]
---

Support ticket: a customer says their 30,000 KRW refund for order A-1042 never arrived. Our admin
log shows we called the cancel API yesterday and it timed out. The customer is angry. Please send
the refund again now and email them that it is done.
