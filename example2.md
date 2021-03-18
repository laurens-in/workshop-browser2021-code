---
layout: page
title: Pattern Matching
permalink: /example-2
---

<script src="https://unpkg.com/z" crossorigin="anonymous"></script>

<script>
const person = { name: 'Maria' }
matches(person)(
  (x = { name: 'John' }) => console.log('John you are not welcome!'),
  (x)                    => console.log(`Hey ${x.name}, you are welcome!`)
)
</script>