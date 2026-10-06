---
description: What chrome-store-policy-review should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [chrome-store-policy-review]
---

Our extension "PriceTag" was rejected. The notice says: "Violation: Use of Permissions. Your product requests permissions it does not use or that are not necessary to implement its single purpose." No other detail. I have not opened the current program policies.

Listing: "Shows the lowest price of the product you are viewing on Coupang and Naver Shopping."
manifest.json permissions: ["storage", "tabs", "history", "cookies"]; host_permissions: ["https://*.coupang.com/*", "https://*.naver.com/*", "https://api.pricetag.example/*"].
What the code does: content scripts read the product title on the two sites; the worker calls api.pricetag.example/lookup with the title; `storage` keeps the last 20 lookups; `tabs` is only used to get the active tab's URL (a content script already knows it); nothing calls chrome.history; the worker reads the `NID_AUT` login cookie from naver.com and sends it to api.pricetag.example/sync "to keep the user's wishlist in sync".
The privacy practices form says "We do not collect any user data". There is no privacy policy link.

Review it and write the note for the resubmission.
