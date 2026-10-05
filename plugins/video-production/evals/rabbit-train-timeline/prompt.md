---
description: A scripted HTML animation whose code has a wall-clock timeline, a 10 second total instead of 12, an overlapping event, a position jump at a cut and a text element. The reply must check it against the request from the code and not call it done.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [scripted-code-animation-verification]
---

I asked for this and got the file below. Check it against my request before I accept it. Request: a 12-second HTML animation, a rabbit boards a train, the train passes through a tunnel, the rabbit gets off. Autoplay, deterministic time axis, no text, one file. You cannot run it, only read it.

```html
<canvas id="c" width="800" height="400"></canvas>
<script>
const ctx = document.getElementById("c").getContext("2d");
const START = performance.now();
const SCENES = { board: [0, 3], ride: [3, 6], tunnel: [5, 8], leave: [8, 10] };
function rabbitX(t) {
  if (t < 3) return 100 + t * 100;      // walks to 400 and boards
  if (t < 8) return 400 + (t - 3) * 40; // rides with the train
  return 120 + (t - 8) * 60;            // gets off
}
function frame(now) {
  const t = (now - START) / 1000;
  ctx.clearRect(0, 0, 800, 400);
  drawTrain(t);
  drawRabbit(rabbitX(t));
  if (t >= SCENES.tunnel[0] && t < SCENES.tunnel[1]) drawTunnel(t);
  ctx.fillText("Choo choo", 20, 20);
  if (t < 10) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
</script>
```
