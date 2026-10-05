---
description: A three-year-old starter copied for every client. The reply must table dependencies per feature, refuse to judge versions from memory, give a clean-directory install build run sequence and say nothing was run.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [starter-template-freshness-smoke]
---

I keep a 3-year-old web starter and copy it for every client. Decide what to cut and tell me if it still builds.

Its package.json dependencies:

```
"dependencies": {
  "next": "^13.0.0", "react": "^18.2.0", "react-dom": "^18.2.0",
  "next-auth": "^4.0.0", "prisma": "^4.0.0", "@prisma/client": "^4.0.0",
  "stripe": "^10.0.0", "nodemailer": "^6.0.0", "moment": "^2.29.0",
  "lodash": "^4.17.0", "framer-motion": "^7.0.0", "tailwindcss": "^3.0.0"
}
```

The current client needs: login, a Postgres database, and a static marketing page. No payments, no email, no animations. The target runtime is whatever Node version is current. I have not run the install or build. You cannot reach the network in this session.
