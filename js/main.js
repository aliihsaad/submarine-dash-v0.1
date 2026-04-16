const startBtn = document.querySelector(".start-btn")
const divBtn = document.querySelector(".div-btn")
const restartBtn = document.querySelector(".restart-btn")




// to be deleted after mvp completed
divBtn.addEventListener("click", function () {
    nextPage();
});
console.log ("Next btn Clicked");


restartBtn.addEventListener("click", function () {
   restartGame();
});




startBtn.addEventListener("click", function () {
    startGame();
});
console.log ("Start btn Clicked");


