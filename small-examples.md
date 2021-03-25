---
layout: page
title: Practice
permalink: /practice
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js"
        integrity="sha512-+Ru50BzEpZjlFzVnjSmJfYFPFfY2hS0Kjlu/IvqaJoux7maF5lJrRVUJWJ2LevPls7rd242GLbWEt+zAo4OVVQ=="
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.13/Tone.js" integrity="sha512-SAB2YrHeaZfb6W1w+tAMm+IUICzUMyf7TJ8upY+NjLYl8jseufUW4yYzoSHfNL9N2rzDlw5PWJrf7rPIQ6VhNw==" crossorigin="anonymous"></script>
<script src="./bundled-libraries/z-pattern-matching-bundle.js"></script>
<script src="./bundled-libraries/audio-context-timers-bundle.js"></script>
<script src="small-examples.js"></script>

# Composition Through Code

I will try to show with a few examples how we can think about programming concepts and patterns in terms of composition. This is by no means a definitive list, it should serve to give you an idea of the mindset with which we can approach composition from a coding point of view. I encourage you to apply this mindset to the patterns and concepts in your own workflow and whenever you come across a new way of coding ask yourself, how might I use this in composition?


## Recursion

Programming - as music - is essentially about structuring events. Recursion is one of the concepts we can use to generate structure. If you are not familiar with the concept: A recursive function is a function which calls itself in its own definition.

```js
const countBack = (x) => {
    if (x >= 0) return console.log(0); // stopping condition
    console.log(x);                    // instructions
    countBack(x-1);                    // recursive call
}

countBack(10) // check the browser console to see the output
```
<button id="play-example1">Run</button>

<script>
document.getElementById("play-example1").addEventListener("click", () => countBack(10));
</script>

This is essentially the same thing we artists know all to well as **feedback**. Think about Alvin Luciers infamous piece *I'm Sitting In A Room* - which is one of the few pre-generative pieces I know that uses recursion as a compositional process. 

We could think about using recursion to generate a simple temporal structure like this:

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

I'm using a npm library called audio-context-timers here because the standard setTimeout method is not very accurate and can get throttled by the browser. Follow this footnote to find out more.[^context-timers]
{: .caption}

Here we are creating a simple sort of "reverse bouncing" effect where a note is repeated while the time between successive notes is always doubled. To achieve the same effect without recursion would certainly be possible, but the idea kind of begs for a recursive implementation or if we turn it around, some ideas we can only get to by thinking recursively. We need to think about how to get from one step to another by a transformation of a set of inputs to a set of outputs.

We could also integrate pattern matching to have achieve a more complex result, because it allows us to iterate over an array of values recursively:

```js
const notes_pattern = [700, 600, 500, 400, 300, 200, 100, 50]

const patternMatch = (x, y = 250) => {
    z.matches(x)(
        (head, tail = []) => { sampler.play(head); console.log("playing note: ", head) }, // stop condition
        (head, tail) => { sampler.play(head); console.log("playing note: ", head); audioContextTimers.setTimeout(() => patternMatch(tail, y * 1.25), y) },
    )
}

patternMatch(notes_pattern);
```
<button id="play-example3">Run</button>

<script>
document.getElementById("play-example3").addEventListener("click", () => patternMatch(notes_pattern));
</script>

I'm using a npm library called z-pattern-matching here because JavaScript does not support pattern matching out of the box.[^pattern-matching]
{: .caption}

But we can't just use recursion to create temporal structures and rhythms. Lets look at this example where we have a class that describes a musical `Figure`. The class has a property `variation` which - through calling the `Figure.next()` method - is assigned an new instance of the class `Figure`. We can call this process ad infintum to generate new variations of variations.

```js
class Figure {
    notes;
    variation;

    constructor(notes) {
        this.notes = notes
    }

    next = () => {
        this.variation = new Figure(this.notes.reverse().concat(this.notes.slice(0,2)))
    }

    playFigure = async () => {
        for (const note of this.notes) {
            await this.playSample(note);
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
<button id="play-example4">.playFigure()</button>
<button id="play-example5">.next()</button>
<button id="play-example6">variation.playFigure()</button>
</div>

<script>
document.getElementById("play-example4").addEventListener("click", () => someFigure.playFigure());
document.getElementById("play-example5").addEventListener("click", () => someFigure.next());
document.getElementById("play-example6").addEventListener("click", () => someFigure.variation.playFigure());
</script>

I used this process a bit more elaborate in [Live Eternal](https://live-eternal.ch): Every sequence has a base pattern and two variations, which again consist of base patterns and variations which allows me to build a kind of tree of related patterns.

```js
                                                              ---[variation]--->permute()---etc...
                                                             /
                               ---[variation]--->permute()---
                              /                              \
[base-pattern]---> permute()---                               ---[variation]
                              \
                               ---[variation]--->permute()---
```

You can read more about the specific implementation in my master thesis or look at the code on github.
{: .caption}



### Representation of Musical Information

One of the most important things we have to consider when making music with code is how to represent musical information within our program. This is of course important in all forms of composition and there is a certain tradition of composers inventing new ways to write scores in order to create new music. Code offers us the possibility to define data in whatever way we can represent digital data. To give you a few ideas:

We could use a simple list of numbers representing pitches

```js
const someMusicalData = [66, 23, 76, 89]
```

We could use nested lists to represent pairs of pitches and lengths. These values could also describe start and stop times of events, whose contents are described elsewhere in the program. These values are only really meaningful in the way we want them to be.

```js
const someOtherData = [[120, 500], [330, 800]]
```

We could have to completely unrelated lists of pitches and lengths and then calculate the cartesian product to get every possible combination of pitch and length and then go from there:

```js
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
```

We can define a class which, in this example, could hold a sequence of pitches and a reference to the next sequence of pitches. This would allow us to connect sequences in chains, which could create loops within them or and change references etc.

```js
// Mabe a class? 
class someStructure {
    pitches
    nextSequence;

    constructor(pitches, sequence) {
        this.pitches = pitches
        this.nextSequence = sequence

    }
}
```
 
For all the developers who get a headache when they see the dynamically typed classes of JavaScript, we could also use TypeScript to define a custom type for our musical element

```js
type Sound = {sample: String, playback_speed: number}

const x: Sound = {sample: 'sounds/kick.wav', playback_speed: -0.5}
```

Instead of TypeScript we could also use PureScript and describe sound in a behavior pattern:

```js
scene ::  Number -> Behavior (AudioUnit D1)
scene time = let
      rad = pi * time
    in
      pure $ speaker
         ( (gain' 0.1 $ sinOsc (440.0 + (10.0 * sin (2.3 * rad))))
              :| (gain' 0.25 $ sinOsc (235.0 + (10.0 * sin (1.7 * rad))))
              : (gain' 0.2 $ sinOsc (337.0 + (10.0 * sin rad)))
              : (gain' 0.1 $ sinOsc (530.0 + (19.0 * (5.0 * sin rad))))
              : Nil
          )
```

Don't worry I don't get this one too. But just by looking at the code we can see that a piece composed in this manner must be fundamentally different than a piece which thinks of musical elements as objects.

Last but not least we can use the Web Audio API directly to describe sound at the sample level - in this case white noise:

```js
class WhiteNoiseProcessor extends AudioWorkletProcessor {
  process (inputs, outputs, parameters) {
    const output = outputs[0]
    output.forEach(channel => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = Math.random() * 2 - 1
      }
    })
    return true
  }
}
```

This is only a fraction of the possibilities we have and I encourage you to find more ways - new ways - to represent music, as it will inevitably lead to new kinds of music.

## Randomness & Repeatability

```js
const random = () => 10;

// pure functional way
const playNote = (x) => {
    return x + 10;
}

console.log('pure function returns: ' + playNote(random()))

// impure function
const playNoteImp = (x) => {
    random() + x;
}

console.log('impure function returns: ' + playNoteImp(10))

// What's the difference?
```

<button id="play-example7">Run</button>

<script>
document.getElementById("play-example7").addEventListener("click", () => {console.log('pure function returns: ' + playNote(random()));console.log('impure function returns: ' + playNoteImp(10))});
</script>

Both functions return the same result, but they represent two fundamentally different styles of programming. The first function is written as a pure function, which means that it's output is only dependent on its input - nothing else. The second function is impure because its output is not related to its input.

We have here a powerful compositional tool in our hands: A way to go from unpredictable data to predictable data and vice-versa.

Another thing we can do to control randomness is random seeding. Consider this example:

```js
// Random Seeding

// some input for example a name
const inputName = "Jane Doe"

// we use this to seed a random generator
const randomGen = new Math.seedrandom(inputName, { state: true });

// a small helper function that will return a value between 100 and 700 which we will use as a frequency
const randomNote = (x) => Math.ceil((x * 600) + 100);


// generate 3 random notes
const random_pattern_1 = [randomNote(randomGen()), randomNote(randomGen()), randomNote(randomGen())];

// save the state of the random generator
const saved = randomGen.state();

// make 4 more notes with randomGen
const random_pattern_2 = [randomNote(randomGen()), randomNote(randomGen()), randomNote(randomGen())];

// play pattern 1 & 2
patternMatch(random_pattern_1.concat(random_pattern_2))

// create a new random gen from the saved state
const otherGen = new Math.seedrandom("", { state: saved });

// make 4 more notes with otherGen
const random_pattern_seeded = [randomNote(otherGen()), randomNote(otherGen()), randomNote(otherGen())];

// play pattern 1 & seeded, it will be the exact same as pattern 2!
patternMatch(random_pattern_1.concat(random_pattern_seeded))
```

<div class="flex-buttons">
<button id="play-example8">Play patterns 1 & 2</button>
<button id="play-example9">Play patterns 1 & seeded</button>
</div>

<script>
document.getElementById("play-example8").addEventListener("click", () => patternMatch(random_pattern_1.concat(random_pattern_2)));
document.getElementById("play-example9").addEventListener("click", () => patternMatch(random_pattern_1.concat(random_pattern_seeded)));
</script>

I'm using a npm library called seedrandom here because JavaScript does not support random seeding out of the box.[^seedrandom]
{: .caption}

Lets go further and set our saved random seed as a cookie, so the next time we visit the page we can retrieve it and continue where we left of:

```js
const checkCookie = () => {
    const hasCookie = !(document.cookie === '')
    console.log(hasCookie);
    return hasCookie
}

const saveCookie = (inputName, seedState) => {
    document.cookie = ""
    document.cookie = "name=" + inputName;
    document.cookie = "random_seed=" + JSON.stringify(seedState);
    console.log(`See you soon, ${inputName}`)
}

const deleteCookie = () => {
    document.cookie = "name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "random_seed= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}

const getCookiePattern = () => {
    const name = document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1]
    const seed = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('random_seed')).split('=')[1])
    console.log(`Welcome back, ${name} :)`)
    const cookieGen = new Math.seedrandom("", { state: seed })
    const random_pattern_cookie = [randomNote(cookieGen()), randomNote(cookieGen()), randomNote(cookieGen()), randomNote(cookieGen()), randomNote(cookieGen()), randomNote(cookieGen())];
    return random_pattern_cookie;
}

patternMatch(getCookiePattern());
```

<div class="flex-buttons">
<button id="play-example10">checkCookie</button>
<button id="play-example11">saveCookie</button>
<button id="play-example12">Reload page.</button>
<button id="play-example13">deleteCookie</button>
<button id="play-example14">getCookie</button>
<button id="play-example15">Play!</button>

</div>

<script>
document.getElementById("play-example10").addEventListener("click", () => checkCookie());
document.getElementById("play-example11").addEventListener("click", () => saveCookie(inputName,savedSeedState));
document.getElementById("play-example12").addEventListener("click", () => location.reload());
document.getElementById("play-example13").addEventListener("click", () => deleteCookie());
document.getElementById("play-example14").addEventListener("click", () => console.log(getCookiePattern()));
document.getElementById("play-example15").addEventListener("click", () => patternMatch(getCookiePattern()));
</script>

Now let's imagine we had a server, which coincidentally we do! It's right [here](https://glitch.com/edit/#!/unexpected-meowing-swoop?path=server.js%3A22%3A99). What we could now do is send this information over to that server, which responds by setting a third-party cookie in our browser, the stuff companies use to track us. Then imagine we had a second web-page as part of our artwork, which again we do right [here](https://laurens-in.github.io/cookie-test/). What we can now do is ask the server if we have set such a third party cookie, to which the server will respond: "yeah you actually do, here is it!". We could now use this to track the same user over different web-pages if we would like to do that.

```js

const serverData = { name: inputName, random_seed: JSON.stringify(savedSeedState) }

// we will call this function on this page to send our information to the server
async function postData(data) {
    // Default options are marked with *
    const response = await fetch('https://unexpected-meowing-swoop.glitch.me/cookie', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    response.json().then(data => console.log(data));

}

// we will use this function on the other page to retrieve the information
async function getData() {
    // Default options are marked with *
    const response = await fetch('https://unexpected-meowing-swoop.glitch.me/cookies', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    response.json().then(data => {
        console.log(data)
        const answer = document.getElementById("answer");
        const name = document.getElementById("name");
        answer.textContent += `Welcome back,`;
        name.textContent += `${data.name}...`;
    });
}
```

<div class="flex-buttons">

<button id="play-example16">Send cookie.</button>
<button onclick="location.href='https://laurens-in.github.io/cookie-test/';">Open other page.</button>

</div>

<script>

document.getElementById("play-example16").addEventListener("click", () => postData(serverData));
</script>


----

## Libraries

[^context-timers]: Audio-Context-Timers, [https://github.com/chrisguttandin/audio-context-timers](https://github.com/chrisguttandin/audio-context-timers){:target="_blank" rel="noopener"}

[^pattern-matching]: Z-Pattern-Matching, [https://github.com/z-pattern-matching/z](https://github.com/z-pattern-matching/z){:target="_blank" rel="noopener"}

[^seedrandom]: Seedrandom, [https://github.com/davidbau/seedrandom](https://github.com/davidbau/seedrandom){:target="_blank" rel="noopener"}




