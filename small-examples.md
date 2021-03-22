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
<button id="play-example1">Run</button>

<script>
document.getElementById("play-example1").addEventListener("click", () => countBack(10));
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
<button id="play-example2">Run</button>

<script>
document.getElementById("play-example2").addEventListener("click", () => playRecursive('C4', 20));
</script>

One more example:

```js
class Figure {
    notes;
    variation;

    constructor(notes) {
        this.notes = notes
    }

    next = () => {
        this.variation = new Figure(this.notes.reverse().concat(this.notes.slice(2)))
    }

    playFigure = async () => {
        for (const note of this.notes) {
            await playSample(note);
        }
    }

    playSample = (note) => {
        sampler.play(note)
        return new Promise((resolve) => audioContextTimers.setTimeout(resolve, 1000))
    }
}

const notes = ['C4', 'D4', 'D#4']

const someFigure = new Figure(notes);
```

<div class="flex-buttons">
<button id="play-example3">.playFigure()</button>
<button id="play-example4">.next()</button>
<button id="play-example5">variation.playFigure()</button>
</div>

<script>
document.getElementById("play-example3").addEventListener("click", () => someFigure.playFigure());
document.getElementById("play-example4").addEventListener("click", () => someFigure.next());
document.getElementById("play-example5").addEventListener("click", () => someFigure.variation.playFigure());
</script>



## Something Data


```js
const someMusicalData = [66, 23, 76, 89]

const someOtherData = [[120, 500], [330, 800]]


const pitches = [100, 200]
const lengths = [5, 7, 8]

cartesian(notes, pitches)

[
    [100, 5],
    [100, 7],
    [100, 8],
    [200, 5],
    [200, 7],
    [200, 8]
]


class someStructure {
    pitches
    nextSequence;

    constructor(pitches, sequence) {
        this.pitches = pitches
        this.nextSequence = sequence

    }
}
```