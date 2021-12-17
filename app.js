const newGame = document.querySelector(".btn--new");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const dice = document.querySelector("#dice");

let active = 0; // player1 = true || player2 = false
let partialScore = 0;
let completeScore = [0, 0];
let winner = false;

roll.addEventListener("click", () => {
  if (winner) disableButton();
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
    disableButton();
  } else {
    // change active player
    changeActive();
  }
});

newGame.addEventListener("click", () => reload()); // reload page

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
function reload() {
  location.reload();
}

function setWinner() {
  document.querySelector(`#score--${active}`).innerHTML = "🎉";
  document.querySelector(`#score--${active == 0 ? 1 : 0}`).innerHTML = "💥";
  document
    .querySelector(`.player--${active}`)
    .classList.add("player--winner")
    .add("player--winner name");
  winner = true;
}

function changeActive() {
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
  partialScore = 0;
  document.querySelector(`#current--${active}`).innerHTML = 0;
  active = active == 0 ? 1 : 0;
}

function disableButton() {
  roll.disabled = true;
  hold.disabled = true;
}
