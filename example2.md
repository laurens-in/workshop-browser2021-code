---
layout: page
title: Pattern Matching
permalink: /example-2
---

<script src="bundle-z.js"></script>

<script>
const person = { name: 'Maria' }
z.matches(person)(
  (x = { name: 'John' }) => console.log('John you are not welcome!'),
  (x)                    => console.log(`Hey ${x.name}, you are welcome!`)
)
</script>