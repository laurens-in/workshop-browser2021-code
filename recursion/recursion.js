const countBack = x => {
    if (x === 0) return console.log(x); // simple stop condition
    console.log(x)                      // log x to console
    countBack(x - 1)                    // call the function recursively
}

countBack(10)




const makeRhythm = x => {
    console.log("pew", x);
    audioContextTimers.setTimeout(makeRhythm, x, Math.ceil(Math.random() * x + 200))
}

makeRhythm(1000)