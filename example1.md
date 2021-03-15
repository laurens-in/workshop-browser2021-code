<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.13/Tone.js" integrity="sha512-SAB2YrHeaZfb6W1w+tAMm+IUICzUMyf7TJ8upY+NjLYl8jseufUW4yYzoSHfNL9N2rzDlw5PWJrf7rPIQ6VhNw==" crossorigin="anonymous"></script>

<script src="index.js"></script>

```js
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
const play = () => synth.triggerAttackRelease("C4", "8n");
```

<button id="play">Play Example</button>

<script>
document.getElementById("play").addEventListener("click", () => play());
</script>