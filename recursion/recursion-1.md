---
layout: page
title: Recursion - Part 1
permalink: /recursion-1
---

# Part 1

Recursion is the simple principle of a process calling itself until a stop condition is met. If the condition is met, all calls will be evaluated recursively

<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.13/Tone.js" integrity="sha512-SAB2YrHeaZfb6W1w+tAMm+IUICzUMyf7TJ8upY+NjLYl8jseufUW4yYzoSHfNL9N2rzDlw5PWJrf7rPIQ6VhNw==" crossorigin="anonymous"></script>
<script src="recursion/recursion.js"></script>

```js
const countBack = x => {
    if (x === 0) break; // simple stop condition
    console.log(x)      // log x to console
    countBack(x-1)      // call the function recursively
}
```