const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
const play = () => synth.triggerAttackRelease("C4", "8n");