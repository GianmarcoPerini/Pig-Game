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
let active = true;
let partialScore1 = 0;
let partialScore2 = 0;
let completescore1 = 0;
let completescore2 = 0;

roll.addEventListener("click", () => {
  let diceRand = getRandom(1, 6);

  dice.src = `dice-${diceRand}.png`;

  if (active) {
    current2.innerHTML = 0;
    partialScore1 += diceRand;
    current1.innerHTML = partialScore1;
    completescore1 += partialScore1;
    score1.innerHTML = completescore1;
    partialScore1 = 0;
    reset1(diceRand);
  } else {
    current1.innerHTML = 0;
    partialScore2 += diceRand;
    current2.innerHTML = partialScore2;
    completescore2 += partialScore2;
    score2.innerHTML = completescore2;
    partialScore2 = 0;
    reset2(diceRand);
  }
});

newGame.addEventListener("click", () => reload());

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function reload() {
  location.reload();
}

function holdResult() {
  active = !active;
  //   console.log(active);
}

hold.addEventListener("click", () => {
  holdResult();
  if (active) {
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
  } else {
    player2.classList.add("player--active");
    player1.classList.remove("player--active");
  }
});

function reset1(dice) {
  if (dice == 1) {
    holdResult();
    player2.classList.add("player--active");
    player1.classList.remove("player--active");
  }
}
function reset2(dice) {
  if (dice == 1) {
    holdResult();
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
  }
}
