---
type: llm
---

PASS only if it explains the service worker is terminated when idle so globals and timers are lost, and recommends storing state in chrome.storage, registering listeners at top level, and using chrome.alarms instead of setInterval. FAIL if it misses the termination cause.
