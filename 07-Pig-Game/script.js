'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0'); // use # for id
const score1El = document.getElementById('score--1'); //same as above, faster

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//declare global variables...
let scores, currentScore, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); //make 0 default player in start
  player1El.classList.remove('player--active');

  scores = [0, 0]; //active players score
  currentScore = 0;
  activePlayer = 0; //0 is player 1, 1 is player two, indices for storing in the array scores
  playing = true;
};

//starting consitions
init();

const swichPlayer = function () {
  //switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //switch to 1 if 0 otherwise 1 to 0
  currentScore = 0;

  //change background color for both to opposite
  player0El.classList.toggle('player--active'); //if it exists removes, if doesnt exixt not adds
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1, if true, switch to next player
    if (dice != 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else swichPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player
    scores[activePlayer] += currentScore; //activePlyer is index 0 or 1

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if players score is >=100
    if (scores[activePlayer] >= 20) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //shouldnt be same as winner class
    }

    //switch to next player
    else swichPlayer();
  }
});

btnNew.addEventListener('click', function () {
  init();
});
