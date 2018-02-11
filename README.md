# React bowling

This project is a very simple React/Redux bowling game.
You will first be asked to input name of players (max. to 4).
Then the game starts, you can throw the ball by clicking on it.
At the end of the game, a modal indicates scores of each players.
Every visual elements is regular pure (S)CSS.

## Instructions how to run

You can try an online version [here](https://jeand.now.sh/bowling).
To run locally :

First :
`yarn install`
or `npm install`

Then :
`yarn start` || `npm run start`

## TODOS :

* Would be nicer if there would be a more interactive/engaging way to throw the ball like :
  * Dragging it with the mouse
  * Positioning it with keyboard, and then pressing the spacebar with a gauge for the power
    Both of those options will use the position of the ball when thrown and the force of the Ball
    to determine how many pins should be knocked down.
* Design was made relatively quickly, it could be greatly improved. Making it only with CSS was
  a funny challenge but limits the options. SVG would be nicer.
  Also the players form is really off.
* Could have more tests especially for gameLogic/Redux
* Could replace the utils with lodash
* The eventual last frame is the 10th frame is a spare or a strike is working correctly logically,
  but is visually not so good (adding one or two actual frames after the tenth one)
