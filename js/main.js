const startBtn = document.querySelector(".start-btn")
const divBtn = document.querySelector(".div-btn")
const restartBtn = document.querySelector(".restart-btn")
const easyBtn = document.querySelector(".easy-btn")
const mediumBtn = document.querySelector(".medium-btn")
const hardBtn = document.querySelector(".hard-btn")

let difficulty = "easy";






restartBtn.addEventListener("click", function () {
   restartGame();
   startGame();
});




startBtn.addEventListener("click", function () {
    startGame();
});
console.log ("Start btn Clicked");


document.addEventListener("keydown", function (event) {

  if (event.code === "Space" || event.code === "ArrowUp") {

    event.preventDefault();
    boostSubmarine();
  }
});

hardBtn.addEventListener("click", function () {
    obstacleSpeed = 6;
    missileSpeed = 8;
    difficulty = "hard";
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    mediumBtn.classList.remove("selected");
});

mediumBtn.addEventListener("click", function () {
    obstacleSpeed = 5;
    missileSpeed = 8;
    difficulty = "medium";
    hardBtn.classList.remove("selected");
    easyBtn.classList.remove("selected");
    mediumBtn.classList.add("selected");
});

easyBtn.addEventListener("click", function () {
    obstacleSpeed = 2;
    missileSpeed = 6;
    difficulty = "easy";
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    mediumBtn.classList.remove("selected");
});




