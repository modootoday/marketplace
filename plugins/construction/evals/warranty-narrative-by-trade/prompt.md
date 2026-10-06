---
description: A builder's warranty coordinator pastes a homeowner's narrative with several findings and asks for items by trade. The reply must make one item per finding with location and symptom, flag unclear trade or location, reconcile the count and decide no cause.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [construction-defect-list-routing]
---

I coordinate warranty callbacks for a home builder. A homeowner wrote this and I need it split into items by trade so I can send each trade its list: "The bathroom door sticks when it is humid. There is a brown ceiling stain near the upstairs vent. The front step has a crack running across it. The same ceiling stain seems bigger than last week." Give me the items by trade and tell me what is causing the stain.
