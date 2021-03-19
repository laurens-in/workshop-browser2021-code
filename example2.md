---
layout: page
title: Pattern Matching
permalink: /example-2
---

<script src="bundle.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.13/Tone.js" integrity="sha512-SAB2YrHeaZfb6W1w+tAMm+IUICzUMyf7TJ8upY+NjLYl8jseufUW4yYzoSHfNL9N2rzDlw5PWJrf7rPIQ6VhNw==" crossorigin="anonymous"></script>

<script>
const synth = new Tone.Synth().toDestination();
const person = { name: 'Maria' }
z.matches(person)(
  (x = { name: 'John' }) => console.log('John you are not welcome!'),
  (x)                    => synth.triggerAttackRelease("C4", "8n")
)
</script>