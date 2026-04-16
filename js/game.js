const startScreen = document.querySelector(".start-screen");
const gameContainer = document.querySelector(".game-container");
const gameOverScreen = document.querySelector(".game-over")
const gameArea = document.querySelector(".game-area")
const submarine = document.querySelector(".submarine")
const countdownNumber = document.querySelector(".countdown-number")
const countdownElement = document.querySelector(".countdown-overlay")


let submarineY;
let score;
let oxygenLevel;
// (boolean false during countdown)
let gameRunning;
let velocity;
let obstacles;
let obstacleSpawnId;






// to be deleted after mvp completed (only for div)
function nextPage() {
    startScreen.classList.add("hidden");
    gameContainer.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
}

function startCountdown() {
  const countdownArr = ["3", "2", "1"];
  let currentIndex = 0;

  countdownElement.classList.remove("hidden");
  countdownNumber.innerText = countdownArr[currentIndex];

  const intervalId = setInterval(() => {
    currentIndex++;

    if (currentIndex < countdownArr.length) {
      countdownNumber.innerText = countdownArr[currentIndex];
    } else {
      clearInterval(intervalId);
      countdownElement.classList.add("hidden");
      gameRunning = true;
      startObstacleSpawn();
    }


  }, 1000);
}



function startGame() {
    score = 0;
    oxygenLevel = 100;
    velocity = 0;
    gameRunning = false;
    obstacles    = [];   // empty — no obstacles yet
    

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    gameContainer.classList.remove("hidden");

// submarine position on start
    submarineY = (gameArea.offsetHeight - submarine.offsetHeight) / 2;
    submarine.style.top = submarineY + "px";
    submarine.classList.remove("invincible"); // make sure blink animation is off

    updateHUD();
    startCountdown();
}


function gameloop() {
  if (!gameRunning) {
    return;
  }

  moveObstacles();
  checkCollisions();

  requestAnimationFrame(gameloop);
}



function checkCollisions() {

}


function endGame() {
    
}


function restartGame() {
    startScreen.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
}


