---
description: What mv3-extension-review should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [mv3-extension-review]
---

Please review the service worker and content script of our Manifest V3 extension. Users report that "sometimes the price popup never shows after the browser has been idle".

background.js:
```js
chrome.storage.local.get("settings").then((settings) => {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "price") {
      fetch(msg.url)
        .then((r) => r.json())
        .then((data) => sendResponse(data));
    }
  });
});
```

content.js:
```js
const raw = window.__PRODUCT_DATA__;
chrome.runtime.sendMessage({ type: "price", url: raw.apiUrl }, (res) => {
  showPopup(res.price);
});
```
