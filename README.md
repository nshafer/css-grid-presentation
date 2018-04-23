# CSS Grid Presentation

This is the presentation I gave to [Digital Flagstaff](http://digitalflagstaff.com/) in April of 2018.
The goals of the presentation were to be a high-level overview of the challenge of layout on the web, and how CSS Grid aims to assist with that.
The audience for this presentation are both skilled web developers that are new to CSS Grid, as well as non developers.
Thus there are a few slides that explain CSS so they can follow along.

## Outline

- Intro
    - Who am I
    - CSS hyper crash course
    - Responsive web design hyper crash course (media queries)
- History of Layout on the web
    - Linear markup
    - Tables
    - Floats / Bootstrap3
    - Flexbox / Bootstrap4
- Introducing CSS Grid
    - Terminology
        - Grid container (display: grid)
        - Grid Item (all direct descendants)
        - Grid Track (row, column)
        - Grid Line (line between grid tracks)
        - Grid Cell
        - Grid Area
    - grid-template-rows, grid-template-columns
        -
    - grid-row, grid-column
    - grid-template-areas, grid-area
- Advanced usage
    - grid-template values
        - Fixed-values (100px)
        - Percentage (50%)
        - Flex (1fr)
    - minmax
    - min-content, max-content
    - fit-content
- Using it today
    - Browser compatibility (caniuse.com)

    

### Note about how this presentation was built

I decided to [dogfood](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) this presentation in the most literal sense.
Therefore it is built completely out of HTML, CSS and Javascript, and presented in-browser, instead of presentation software.

I also wanted this to be accessible to modification by anyone, so I had a strict no-tooling mandate.
No local tools were used to build any part of this, such as css compilers, javascript transpilers, bundlers, etc.
I stuck to standards where I could, but for the sake of completing this in a reasonable amount of time, I only focused on it working well in Chromium/Chrome, as that was the browser I did the presentation with.
Transpiling the JS to ES5, autoprefixing the CSS, etc are out of scope for this project. That said, it should work in any modern evergreen browser (Chrome, Safari, Firefox, Edge).

The result is that anyone should be able to clone this repository on any OS, modify files as they see fit, and see results immediately in their local browser.

