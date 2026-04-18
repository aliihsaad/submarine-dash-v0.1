const startBtn = document.querySelector(".start-btn")
const divBtn = document.querySelector(".div-btn")
const restartBtn = document.querySelector(".restart-btn")







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

