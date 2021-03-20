---
layout: page
title: Recursion - Part 1
permalink: /recursion-1
---

# Part 1

Recursion is the simple principle of a process calling itself until a stop condition is met. If the condition is met, all calls will be evaluated recursively
<script src="https://unpkg.com/standardized-audio-context@25.1.12/build/es5/bundle.js"></script>
<script src="https://unpkg.com/audio-context-timers@5.0.44/build/es5/bundle.js"></script>
<script src="recursion/recursion.js"></script>

```js
const countBack = x => {
    if (x === 0) break; // simple stop condition
    console.log(x)      // log x to console
    countBack(x-1)      // call the function recursively
}
```