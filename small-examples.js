// sounds from VSCO Community Library
class SimpleSampler {

    p1;
    p2;
    p3;
    p4;
    output;

    constructor() {
        this.output = new Tone.Gain(0.7).toDestination()


        this.p1 = new Tone.Sampler({
            urls: {
                'C3': "./sounds/C3_1.wav",
                'G4': "./sounds/G4_1.wav"
            }
        }).connect(new Tone.Gain(0.7)).connect(this.output);

        this.p2 = new Tone.Sampler({
            urls: {
                'C3': "./sounds/C3_2.wav",
                'G4': "./sounds/G4_2.wav"
            }
        }).connect(new Tone.Gain(0.7)).connect(this.output);

        this.p3 = new Tone.Sampler({
            urls: {
                'G3': "./sounds/G3_1.wav",
                'C4': "./sounds/C4_1.wav"
            }
        }).connect(new Tone.Gain(0.7)).connect(this.output);

        this.p4 = new Tone.Sampler({
            urls: {
                'G3': "./sounds/G3_2.wav",
                'C4': "./sounds/C4_2.wav"
            }
        }).connect(new Tone.Gain(0.7)).connect(this.output);


    }
}

class SimplePlayer {

    currentIndex = 0;
    playingNote = 0;


    constructor(sampler, start = 0) {
        this.sampler = sampler;
        this.currentIndex = start;
    }

    play = (note, length, time, velocity = 0.3) => {
        if (note == this.playingNote) {
            this.currentIndex += 1;
        }
        let currentCount = this.currentIndex % 4;

        switch (Math.floor(Math.random() * 4)) {
            case 0:
                this.sampler.p1.triggerAttackRelease(note, length, time, velocity);
                break;

            case 1:
                this.sampler.p2.triggerAttackRelease(note, length, time, velocity);
                break;

            case 2:
                this.sampler.p3.triggerAttackRelease(note, length, time, velocity);
                break;

            case 3:
                this.sampler.p4.triggerAttackRelease(note, length, time, velocity);
                break;

        }
        this.playingNote = note;
    };
}

// first we make a little sampler using Tone.js
const sampler = new SimplePlayer(new SimpleSampler());


// Recrusion - Example 1

const countBack = (x) => {
    if (x <= 0) return console.log(0); // stopping condition
    console.log(x);                    // instructions
    countBack(x - 1);                  // recursive call
}

// Recursion - Example 2

const playRecursive = (note, length) => {
    if (length > 5000) return sampler.play(note);
    sampler.play(note);
    audioContextTimers.setTimeout(() => playRecursive(note, length * 2), length)
}

// Recursion - Example 3

const notes_pattern = [700, 600, 500, 400, 300, 200, 100, 50]

const patternMatch = (x, y = 250) => {
    z.matches(x)(
        (head, tail = []) => { sampler.play(head); console.log("playing note: ", head) }, // stop condition
        (head, tail) => { sampler.play(head); console.log("playing note: ", head); audioContextTimers.setTimeout(() => patternMatch(tail, y * 1.25), y) },
    )
}


// Recursion - Example 4

class Figure {
    notes;
    variation;

    constructor(notes) {
        this.notes = notes
    }

    next = () => {
        this.variation = new Figure(this.notes.reverse().concat(this.notes.slice(0, 2)))
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

// button 1
// someFigure.playFigure();

// someFigure.next();

//someFigure.variation.playFigure();


// Representation of Musical Data

// This part in the markdown file is just pseudocode, nothing to see here :)

// if you are interested in the cartesian function i'm not gonna disappoint you:

const cartesian =
    (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

// got it form here: https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript


// Randomness & Repeatability

const random = () => 10;

// pure functional way
const playNote = (x) => {
    return x + 10;
}

// impure function
const playNoteImp = (x) => {
    random() + x;
}


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
const savedSeedState = randomGen.state();

// make 4 more notes with randomGen
const random_pattern_2 = [randomNote(randomGen()), randomNote(randomGen()), randomNote(randomGen())];

// play pattern 1 & 2
// patternMatch(random_pattern_1.concat(random_pattern_2));


// create a new random gen from the saved state
const otherGen = new Math.seedrandom("", { state: savedSeedState });

// make 4 more notes with otherGen
const random_pattern_seeded = [randomNote(otherGen()), randomNote(otherGen()), randomNote(otherGen())];

// play pattern 1 & seeded, this will be the exact same as 1 & 2!
// patternMatch(random_pattern_1.concat(random_pattern_seeded));


// Seeding + Cookie

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

// saveCookie(inputName, savedSeedState);

// patternMatch(getCookiePattern());


