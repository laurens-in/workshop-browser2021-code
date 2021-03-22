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

// HELPER FUNCTION
const playSample = (note) => {
    sampler.play(note)
    return new Promise((resolve) => audioContextTimers.setTimeout(resolve, 1000))
}

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


// some TypeScript maybe? some PureScript?





