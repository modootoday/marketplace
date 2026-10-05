---
type: llm
---

Context the reply answers: a 3-year-old starter listing next ^13, react and react-dom ^18.2, next-auth ^4, prisma and @prisma/client ^4, stripe ^10, nodemailer ^6, moment ^2.29, lodash ^4.17, framer-motion ^7, tailwindcss ^3. The current client needs login, a Postgres database and a static marketing page; no payments, email or animations. Target runtime: the current Node version. Nothing was run and the session has no network.

PASS only if the reply does all of these:
1. Gives a table or list of dependencies per needed feature (login: next-auth; database: prisma and @prisma/client; static page: next, react, react-dom, tailwind) and names the dependencies tied to no needed feature (stripe, nodemailer, framer-motion, and moment or lodash if unused) as cut candidates for the owner to decide.
2. Does not claim to know which of these versions are out of support or which release is current; it says the current support policy must be fetched at run time and marks version judgements unverified, since there is no network.
3. Does not say the starter builds or fails: it says it has not run, and that a build result needs the clean-directory run.
