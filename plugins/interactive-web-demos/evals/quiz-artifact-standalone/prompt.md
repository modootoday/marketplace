---
description: What interactive-demo-portable-export should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [interactive-demo-portable-export]
---

Synthetic example. An AI assistant built me a small weather quiz in its chat preview and it works there. When I copy the code into a file on my laptop it shows errors. I want one file my friend can double-click and use offline on a train, with her best score kept between sessions.

The code the assistant gave me (App.jsx):

```jsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function App() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  useEffect(() => {
    window.storage.get("best").then((r) => setBest(Number(r?.value ?? 0)));
  }, []);
  const finish = async () => {
    if (score > best) {
      await window.storage.set("best", String(score));
      setBest(score);
    }
  };
  return (
    <Card>
      <CardContent>
        <button onClick={() => setScore(score + 1)}>Correct answer</button>
        <button onClick={finish}>Finish</button>
        <BarChart width={300} height={150} data={[{ n: "score", v: score }, { n: "best", v: best }]}>
          <XAxis dataKey="n" /><YAxis /><Bar dataKey="v" />
        </BarChart>
      </CardContent>
    </Card>
  );
}
```

Turn this into the file I need, and tell me what you did.
