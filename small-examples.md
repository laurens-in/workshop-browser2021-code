---
layout: page
title: Composition As Code
permalink: /composition-as-code
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.13/Tone.js" integrity="sha512-SAB2YrHeaZfb6W1w+tAMm+IUICzUMyf7TJ8upY+NjLYl8jseufUW4yYzoSHfNL9N2rzDlw5PWJrf7rPIQ6VhNw==" crossorigin="anonymous"></script>
<script src="./bundled-libraries/z-pattern-matching-bundle.js"></script>
<script src="./bundled-libraries/audio-context-timers-bundle.js"></script>
<script src="small-examples.js"></script>

I will now try to show a how we can use concepts from programming in a way that allows us to think differently about music composition.

# Recursion

Recursion is a powerful concept in programming. Its essentially a process which calls itself in its own definition.

```js
const countBack = (x) => {
    if (x >= 0) return console.log(0); // stopping condition
    console.log(x);                    // instructions
    countBack(x-1);                    // recursive call
}

countBack(10)
```
<button id="play">Run</button>
<script>
document.getElementById("play").addEventListener("click", () => countBack(10));
</script>

We can use recursion is essentially a means to structure our code and hence our composition. We can think about structuring time recursively:

```js
const playRecursive = (note, length) => {
    if (length > 5000) return sampler.play(note);
    sampler.play(note);
    audioContextTimers.setTimeout(() => playRecursive(note, length * 2), length)
}

playRecursive('C4', 20)
```
<button id="play">Run</button>
<script>
document.getElementById("play").addEventListener("click", () => playRecursive('C4', 20));
</script>
