---
layout: page
title: Why The Browser
permalink: /why-the-browser
---

# Why should we make music in the browser?

I will look at this question from three different angles, through three different quotes of three different theorists.

**Disclaimer**

I will make a distinction here between algorithmic composition and generative music. In the context of this text I will use the term algorithmic composition to describe music that is merely composed by a computer but does not express itself through a generative system (e.g. the Illiac Suite).

I will use the term generative music to describe music that is not only generated and composed by a computer but also only exists within a generative system (e.g. Live Eternal).

## Part 1 - McLuhan

To find a question to this answer we can look one of the most infamous quotes of modern media theory:

> The medium is the message.

\- Marshall McLuhan
{: .caption} 

This quote is the essence of what media theory is about. While McLuhan certainly doesn't think the medium is the **whole** message, he states that the effect of the medium is by far greater than that of its content, which is merely incidental. As he says: The fact that we have the technology of TV has a tremendous effect on the world, how we communicate and how we ultimately develop as a society and individuals. What we print doesn't as matter as much as the printed word. The existence of the telephone affects everyone, what you say on the telephone affects very few people.

While this is certainly true to some extent, I do not think that we can dismiss the content of media as simply incidental. McLuhan says that he doesn't want to make value judgments about media, but if you listen to him talk you will notice that his tone suggests something different. When asked about public television, he replies that it is boring and eventually unsustainable because it doesn't care about the people who watch it. If a private company finances a TV program, they have an interest in the program reaching a lot of people, so they have an interest in making media "for the people", which is absurd and completely dismisses the systemic issues in how media us used by companies/elites to manipulate everything from consumption behavior to political views to serve their interests. He at one point says that media is mass manipulation, but It doesn't seem to me that he acknowledges the severity nor the root of the problem, outside of his own media theoretical world.[^mcluhan] [^mcluhan-podcast]

In general when reading McLuhan I have the feeling we can find a lot of rather conservative ideas which always have the tone of the judging priest, but are then rendered objective by saying McLuhan doesn't make "value judgments".

Still, from this realization that the medium at least shapes the message, we can draw two conclusions for us as artists. 

First: The medium through which we express our art matters. A vinyl record is something different than a digital stream. A book is something different than a movie. Certain things can't be expressed in a book that can in a movie and vice versa.

Second: If certain media allows us to express things that others don't, then we can also create new forms of art through new media/technologies. Again this is very obvious: Electronic music can only exist because we have devices that are capable of producing electronic sounds.

If we strive to push art to its boundaries, the engagement with contemporary technology - or refusal thereof - becomes almost a necessity.

`Based on some other canadian dude that says basically that a society is defined by the way it communicates, this is in the podcast, listen to it again.`

This is where media art comes into play. Media art - at least in my understanding of the term - is art that reflects its media. This reflection offers us insight about the specific medium that is used in some kind of way. If we look at Nam June Paiks **Random Access Music** we can see exactly that. The visitor can move the playback head across the tape in any way, which not only produces new kinds of sounds, but also breaks with the convention of how we use tape.

![Nam June Paik - Tape](images/nam-june-paik-tape.jpeg)

So what is the Browser? The browser is an environment which executes code, namely HTML, CSS and JavaScript. In the end this is what we will use to generate music, so lets look at the medium - message relationships.

![medium-message](images/medium-message.svg)

Media and message aren't exactly opposites or mutually exclusive: A medium can always become a message in another context. Think about this example: A score can be a medium in which music is the message. Music then again can be a medium through which we can express emotions or abstract ideas.
{: .caption}


Important to me is especially the relationship between code and music. Not because the browser isn't an interesting environment, but because code is the foundation through which we compose music within that environment. The browser has a great importance in our life. Its the portal through which we access the internet, so much so that for a lot of people its synonymous with the internet. But many of the layers that the browser adds to our composition process are of political or social nature, not so much compositional. Sure the browser allows us to make systems that are distributed over a network - and this is of course very interesting - but these connected nodes (or whatever you want to call them) are still defined through code. But in addition to that, the browser is also the reason why we have to use JavaScript, which again has huge implications on the way we write code and I will talk about that a bit later.

## Part 2 - Benjamin

In his famous essay "The Work of Art in the Age of Mechanical Reproduction" Walter Benjamin talks about the transition art undergoes by entering media which is mechanically reproducible. What this means for him is that the artwork looses its aura:

>Even the most perfect reproduction of a work of art is lacking in one element: its presence in time and space, its unique existence at the place where it happens to be. This unique existence of the work of art determined the history to which it was subject throughout the time of its existence. [...] One might subsume the eliminated element in the term “aura” and go on to say: that which withers in the age of mechanical reproduction is the aura of the work of art.

\- Walter Benjamin 
{: .caption}

But Benjamin is by no means mourning the loss of the aura. The aura is an expression of distance, authority and authenticity of an artwork. In the age of manual reproduction, the reproduction is essentially a forgery and has no authenticity, because authenticity is outside of the sphere of manual or technical reproduction. Aura seems to be only possible through authenticity.

Distance, no matter how near the work of art is, is also an expression of aura. Since the traditional art work is a unique existence in time and space, this distance also exists in both dimensions. Think about standing in front of the Mona Lisa, no matter how close you can get, you can never touch it and even if you could, would you feel like touching its aura? Also the art is fixed in space, and you have to go there and "meet" it, this establishes also a form of hierarchy. The mechanically reproduced artwork however "meets the beholder half way". The traditional art work is also determined by the history to which it is a subject in the time of its existence. This can too create a distance in time between the art and its beholder.

Its funny that the way Benjamin describes art before its mechanical reproduction is actually quite similar to the way I perceive most generative music: Generative music up until now exists almost exclusively in an exhibition space. This means I have the go to the museum, sit on a shitty chair or bench and listen to the generative piece for about 10 minutes with people walking in and out only conceptually being able to grasp the extent of the composition, then going home, mostly disappointed. 

Its even the same with any concert: I have to travel to the venue. The artist is up on stage, separated from the audience which is behind a fence. The artist has absolute authority. The audience demands absolute authenticity, as shown every time an artist loses their career for using playback. There are of course artists who challenge that, like for example Hatsune Miko, but its still the predominant concert experience.

But through the capability of reproduction art becomes available to the masses, which is important for Benjamin. Think about the invention of printing and what it meant for people being able to read the bible.[^printing-bible] Benjamin gives us a hint at what he's going at:

>When Marx undertook his critique of the capitalistic
mode of production, this mode was in its infancy. Marx
directed his efforts in such a way as to give them
prognostic value. He went back to the basic conditions
underlying capitalistic production and through his
presentation showed what could be expected of
capitalism in the future. The result was that one could
expect it not only to exploit the proletariat with
increasing intensity, but ultimately to create conditions
which would make it possible to abolish capitalism itself.[^benjamin-preface]

From my point of view, Benjamin being - contrary to other thinkers of his time - so positive about mass culture, has to do with him seeing it as part of this bigger structure of capitalism defeating itself.
(To explore this further read the Epilogue of his text)

I would argue that we are now not only in the age of the digital reproduction of art[^digital-art], but go even further: the age of the digital **generation** of art. While of course the digital reproduction is significant, I would argue that the conceptual difference to the mechanical reproduction is far less then the difference between reproduction and generation in general.

The idea of an abstract piece of art which exists only through its specific instantiation, which again is unique in time and space every single time is found much earlier in history. Not in the dodecaphonic music of Schönberg and his followers, not in the serialism of Messiaen or the algorithmic composition of Hiller & Issacson. We find it first in early performance art, for example the sound-walks of Max Neuhaus: The composition exists in the form of a route which the composer knows and walks with his audience. Within that route the sounds are certainly predictable, but ultimately - from a compositional perspective - random. In addition to that the performance could only be "reproduced" (in a way that it loses its uniqueness) by means of preservation - a recording, a film - or by means of reenactment - essentially theater - by both of which it is no longer performance art as a result.

But why are we just now in that age? Why draw the line here?

>For the first time ever, the devices people use to listen to music are also capable of executing Generative Music systems.

\- Alex Bainter
{: .caption}

This quote by artist and developer behind [generative.fm](https://generative.fm) Alex Bainter explains what has changed: for the first time generative art has the possibility move into mass culture.

What does this mean for art? How does it affect the aura, authority and authenticity of the work of art?

I can not answer these questions for you, but I can give some insight on what it means in my own work.

Black Metal is essentially a quest to bring authenticity to the reproducible medium. It does so by means of production: Because of our common understanding of the medium they use (e.g. tape, in the early days) we intuitively know that the recording "has not been tampered with" - meaning what we hear is in fact a physical effort and not some kind of technological trickery. Why is this necessary though? Performance art faces similar issues but often just refrains from reproduction? The answer is twofold. First, from a pragmatic point of view, musicians expressed themselves through the only medium they thought was available to them. Second, black metal is characterized by a misanthropic worldview, an antisocial attitude and individualism above all else (although rather superficial), which does not work well with concerts. Given the fact that many bands refrain from playing live shows, the authenticity which they can achieve within reproducible media seems - at least to their perception - to be a meaningful one.

Black metal is also very anti-technological because from their perspective modern technology is what diminishes authenticity (sounds familiar?). Within the framework of black metal this is certainly true to some extent: By using triggered drum sets and modern production or editing technology the physical effort is no longer present as part of our shared understanding of the medium, but vanishes because of exactly that. This is where generative music comes into play, because our shared understanding of (digital) generative music is not one that is concerned with technological trickery as a substitute for physical effort. There is no physical effort through which could be harmed in its authenticity by technological forces, which is why - at least in my opinion - remains authentic - in a black metal sense. In a sense black metal is often just a reproducible documentation of a performance, but in contrast to performance art, the artwork only exists within this reproduction.

So why did we talk about ? How does the aura change in the age of digital generation - where the original exists as an abstract idea that exists in code - that is not the artwork itself - and every generation or iteration of the artwork is unique in time and space? How does that change affect the way we think about and create art? Is authenticity outside of the sphere of digital generation?

---> individualism through art, not through consumerism


## Part 3 - Adorno

---> Adorno is a strong critic of mass culture, Benjamin thinks it has potential to destroy itself in the same way that within capitalism there is the potential to destroy captialism (Engels).

---> Pierre Schaeffer : Nothing possible outside doremi

---> if nothing is possible outside, and its wrong to be inside ---> generative music
power structures















[^mcluhan]: Marshall McLuhan, The medium is the message, Monday Conference on ABC TV, https://www.youtube.com/watch?v=UoCrx0scCkM

[^mcluhan-podcast]: https://theoretician.podbean.com/e/the-medium-is-the-message-marshall-mcluhan-keyword/


[^printing-bible]: https://medium.com/lessons-from-history/how-the-printing-press-and-the-papacys-corrupt-practices-accelerated-martin-luther-s-reformation-f50c9da3e675

[^digital-art]: If you want to read more about this then please read the work of art in the age of its digital reproduction