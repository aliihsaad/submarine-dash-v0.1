const startScreen = document.querySelector(".start-screen");
const gameContainer = document.querySelector(".game-container");

function startGame() {
    startScreen.classList.toggle("hidden");
    gameContainer.classList.toggle("hidden");
}
