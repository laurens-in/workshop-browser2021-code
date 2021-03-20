const countBack = x => {
    if (x === 0) return console.log(x); // simple stop condition
    console.log(x)                      // log x to console
    countBack(x - 1)                    // call the function recursively
}

const countOtherBack = x => {
    if (x !== 0) {
        console.log(x)
        countBack(x - 1);
    }; // simple stop condition
    console.log(x)                      // log x to console                        // call the function recursively
}

countBack(10)
countBackOther(12)

const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
const play = () => synth.triggerAttackRelease("C4", "8n");


const makeRhythm = x => {
    console.log("pew");
    play();
    setTimeout(makeRhythm, x, Math.ceil(Math.random() * x + 200))
}

makeRhythm(1000)