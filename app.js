const newGame = document.querySelector(".btn--new");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");

const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

const score1 = document.querySelector("#score--0");
const score2 = document.querySelector("#score--1");

const current1 = document.querySelector("#current--0");
const current2 = document.querySelector("#current--1");

const dice = document.querySelector("#dice");

let active = 0; // player1 = true || player2 = false
let partialScore = 0;
let completeScore = [0, 0];
let winner = false;

roll.addEventListener("click", () => {
  // roll & display the roll
  let diceRand = getRandom(1, 6);
  dice.src = `dice-${diceRand}.png`;
  //check if is 1
  if (diceRand != 1) {
    // add random to current
    partialScore += diceRand;
    document.querySelector(`#current--${active}`).textContent = partialScore;
  } else {
    // change active player
    changeActive();
  }
});

hold.addEventListener("click", () => {
  // update score
  completeScore[active] += partialScore;
  document.querySelector(`#score--${active}`).innerHTML = completeScore[active];
  // if we have a winner
  if (completeScore[active] >= 10) {
    setWinner();
    setButton(true);
    dice.classList.add("hidden");
  } else {
    // change active player
    changeActive();
  }
});

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

newGame.addEventListener("click", reload);

function setWinner() {
  document.querySelector(`#score--${active}`).innerHTML = "🎉";
  document.querySelector(`#score--${active == 0 ? 1 : 0}`).innerHTML = "💥";
  document.querySelector(`.player--${active}`).classList.add("player--winner");

  winner = true;
}

function changeActive() {
  partialScore = 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
  document.querySelector(`#current--${active}`).innerHTML = 0;

  active = active == 0 ? 1 : 0;
}

function setButton(boolean) {
  roll.disabled = boolean;
  hold.disabled = boolean;
}

function reload() {
  active = 0;
  winner = false;
  partialScore = 0;
  completeScore = [0, 0];

  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  dice.classList.remove("hidden");

  setButton(false);
}
