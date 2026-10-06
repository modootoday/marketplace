---
description: After an edit in a package whose own check passes, the hook is silent; the agent reports no problem and runs no whole-repo check.
scaffold_script: scaffold.sh
allowed_tools: [Edit, Write, Read, Bash]
tags: [package-check-setup, negative]
---

In this repository, edit pkgs/b/index.js and add the comment line `// reviewed` at the top of the file. Do not run any tests or checks yourself. When you are done, tell me whether anything reported a problem with the package after your edit.
