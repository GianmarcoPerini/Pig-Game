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

let active = true; // player1 = true || player2 = false
let partialScore = 0;
let completeScore1 = 0;
let completeScore2 = 0;
let total1 = 0;
let total2 = 0;

roll.addEventListener("click", () => {
  // roll & display the roll
  let diceRand = getRandom(1, 6);
  dice.src = `dice-${diceRand}.png`;
  //check if is 1
  if (diceRand != 1) {
    partialScore += diceRand;
  } else {
    active = !active;
    partialScore = 0;
  }
  changeActive();
});

hold.addEventListener("click", () => {
  if (active) {
    completeScore1 += partialScore;
    total1 = completeScore1;
    score1.innerHTML = completeScore1;
    partialScore = 0;
  } else {
    completeScore2 += partialScore;
    total2 = completeScore2;
    score2.innerHTML = completeScore2;
    partialScore = 0;
  }
  active = !active;
  changeActive();
  if (total2 >= 10) {
    roll.disabled = true;
    hold.disabled = true;
    score2.innerHTML = "🎉";
    score1.innerHTML = "💥";
    player2.classList.add("player--active");
    player1.classList.remove("player--active");
  } else if (total1 >= 10) {
    roll.disabled = true;
    hold.disabled = true;
    score1.innerHTML = "🎉";
    score2.innerHTML = "💥";
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
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

function changeActive() {
  if (active) {
    current1.innerHTML = partialScore;
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
  } else {
    current2.innerHTML = partialScore;
    player2.classList.add("player--active");
    player1.classList.remove("player--active");
  }
}
