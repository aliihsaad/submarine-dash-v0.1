const startScreen = document.querySelector(".start-screen");
const gameContainer = document.querySelector(".game-container");
const gameOverScreen = document.querySelector(".game-over");
const gameArea = document.querySelector(".game-area");
const submarine = document.querySelector(".submarine");
const countdownNumber = document.querySelector(".countdown-number");
const countdownElement = document.querySelector(".countdown-overlay");
const finalScoreDisplay = document.querySelector(".final-score-value");
const difficultyElement = document.querySelector(".difficulty");
 



let submarineY;
let score;
let oxygenLevel;
// (boolean false during countdown)
let gameRunning;
let velocity;
let obstacles;
let obstacleSpawnId;


let gameLoopId;
let countdownTimeoutId;
let hitRecoveryTimeoutId;
let oxygenDrainId;
let boosterTimeoutId;
let oxygenTankSpawnId;

// Elements
let obstacle;
let oxygenTanks;

let isInvincible;

let missiles;
let missileSpawnId;

let boosters;
let boosterSpawnId;

let topThree;
let scores;

function saveHighScore(newScore) {
    // 1. Get existing scores or empty array
    scores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // 2. Add new score, sort descending, and take the top 3
    scores.push(newScore);
    scores.sort((a, b) => b - a);
    topThree = scores.slice(0, 3);
    
    
    // 3. Save back to localStorage
    localStorage.setItem('highScores', JSON.stringify(topThree));
    renderHighScores(topThree);
}

function renderHighScores(scores = null) {
    const scoreDisplay = document.getElementById('high-score-list');
    if (!scoreDisplay) return;

    const highScores = scores || JSON.parse(localStorage.getItem('highScores')) || [];
    scoreDisplay.innerHTML = highScores
        .map((score, index) => `<li><strong>: ${score}</strong></li>`)
        .join('');
}


function startCountdown() {
  const countdownValues = ["3", "2", "1"];
  let currentIndex = 0;
  countdownNumber.innerText = countdownValues[currentIndex];
  countdownElement.classList.remove("hidden");


  function showNextNumber() {
    currentIndex = currentIndex + 1;


    if (currentIndex >= countdownValues.length) {
      countdownElement.classList.add("hidden");


      gameRunning = true;
      startOxygenDrain();
      startObstacleSpawn();
      startBoosterSpawn();
      startOxygenTankSpawn();
      if (difficulty === "Medium" || difficulty === "Hard") startMissileSpawn();
      gameLoop();
      return;
    }

    countdownNumber.innerText = countdownValues[currentIndex];
    countdownTimeoutId = setTimeout(showNextNumber, 1000);
  }
  countdownTimeoutId = setTimeout(showNextNumber, 1000);
}



function startGame() {
  cancelAnimationFrame(gameLoopId);
  clearTimeout(countdownTimeoutId);
  clearTimeout(hitRecoveryTimeoutId);

    score = 0;
    oxygenLevel = 100;
    velocity = 0;
    gameRunning = false;
    obstacles    = [];
    missiles = [];
    boosters = [];
    oxygenTanks = [];
    

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    difficultyElement.innerText = difficulty;

// submarine position on start
    submarineY = (gameArea.offsetHeight - submarine.offsetHeight) / 2; // position the submarine in the middle of the game area
    submarine.style.top = submarineY + "px";
    submarine.classList.remove("invincible"); // make sure blink animation is off

    updateHUD();
    startCountdown();
}


function gameLoop() {
  boostersSpeed = obstacleSpeed;
  oxygenTanksSpeed = obstacleSpeed;
  if (!gameRunning) 
    return;
  updateSubmarine();
  checkBounds();
  moveOxygenTanks();
  moveObstacles();
  moveMissiles();
  moveBoosters();
  updateScore();
  checkCollisions();

  
  gameLoopId = requestAnimationFrame(gameLoop);
}


function checkCollisions() {
  // because the submarine body is big
  const submarineRect = shrinkRect(
    submarine.getBoundingClientRect(),
    submarineHitInsetX,
    submarineHitInsetY
  );

  // ── Check: did the sub hit a pipe? ──────────────────────────
  for (let index = 0; index < obstacles.length; index = index + 1) {
    const obstacle = obstacles[index];

    // Get the shrunk hitbox for each pipe.
    const topRect = shrinkRect(
      obstacle.topElement.getBoundingClientRect(),
      obstacleHitInsetX,
      obstacleHitInsetY
    );
    const bottomRect = shrinkRect(
      obstacle.bottomElement.getBoundingClientRect(),
      obstacleHitInsetX,
      obstacleHitInsetY
    );

    // rectanglesOverlap() returns true if the two rects touch or overlap.
    // We check against BOTH the top and bottom pipe of this pair.
    if (
      rectanglesOverlap(submarineRect, topRect) ||
      rectanglesOverlap(submarineRect, bottomRect)
    ) {
      // ── Invincibility check ──────────────────────────────────
      // If the sub is already in a post-hit invincibility window,
      // skip this collision entirely and move to the next obstacle.
      if (isInvincible) continue;

      // ── Apply the oxygen penalty ─────────────────────────────
      // Math.max(0, ...) clamps oxygen so it never goes below 0.
      oxygenLevel = Math.max(0, oxygenLevel - collisionOxygenPenalty);

      // ── Remove the collided obstacle from DOM and array ──────
      obstacle.topElement.remove();
      obstacle.bottomElement.remove();
      obstacles.splice(index, 1);
      // (No index-- here because we immediately return after this hit.)

      // Sync the oxygen bar to reflect the new lower value.
      updateHUD();

      // ── Check if this hit killed the player ──────────────────
      if (oxygenLevel <= 0) {
        endGame();
        return; // stop checking — game is over
      }

      // ── Start the invincibility window ───────────────────────
      // handleHit() adds the "invincible" CSS class (blink animation)
      // and sets isInvincible = true for hitInvincibilityMs (1000ms).
      handleHit(); // defined in player.js

      return; // only one hit per frame — stop checking other obstacles
    }
  }

  for (let i = 0; i < missiles.length; i = i + 1) {
  const m = missiles[i];
  const missileRect = shrinkRect(
    m.element.getBoundingClientRect(),
    missileHitInsetX,
    missileHitInsetY
  );
    if (rectanglesOverlap(submarineRect, missileRect)) {
     if (isInvincible) continue;
     oxygenLevel = Math.max(0, oxygenLevel - collisionOxygenPenalty);
     m.element.remove();
     missiles.splice(i, 1);
     updateHUD();
      if (oxygenLevel <= 0) { endGame(); return; }
      handleHit();
      return;
    }
  }

    for (let j = 0; j < boosters.length; j++) {
    const booster = boosters[j];
    const boosterRect = booster.element.getBoundingClientRect();

     if (rectanglesOverlap(submarineRect, boosterRect)) {
      handleBooster();
      booster.element.remove();
      boosters.splice(j, 1);
      j--;
    }
  }

  for (let k = 0; k < oxygenTanks.length; k++) {
    const tank = oxygenTanks[k];
    const tankRect = tank.element.getBoundingClientRect();
     if (rectanglesOverlap(submarineRect, tankRect)) {
     const tankSound = new Audio(sonar);                                                                                                       
     if (!isMuted) tankSound.play();
      oxygenLevel = Math.min(oxygenLevel + 25, 100);
      tank.element.remove();
      oxygenTanks.splice(k, 1);
     }
  }
}

  function endGame() {
    gameRunning = false;

    cancelAnimationFrame(gameLoopId);
    clearInterval(oxygenDrainId);
    clearInterval(obstacleSpawnId);
    clearInterval(missileSpawnId);
    clearInterval(oxygenTankSpawnId);
    clearTimeout(countdownTimeoutId);
    clearTimeout(hitRecoveryTimeoutId);

    saveHighScore(score);

    const gameOverSound = new Audio('assets/audio/gameOver.mp3');
    gameOverSound.play();

    setTimeout(function () {
      renderHighScores(topThree);
      countdownElement.classList.add("hidden");
      submarine.classList.remove("invincible");
      finalScoreDisplay.innerText = score;
      gameContainer.classList.add("hidden");
      gameOverScreen.classList.remove("hidden");
    }, 2000);
  }


function restartGame() {
  cancelAnimationFrame(gameLoopId);
  clearInterval(obstacleSpawnId);
  clearInterval(missileSpawnId); 
  clearInterval(oxygenTankSpawnId);
  cancelAnimationFrame(gameLoopId);
  clearTimeout(countdownTimeoutId);


  countdownElement.classList.add("hidden");
  submarine.classList.remove("invincible");

  // Clear all existing game elements from DOM
  obstacles.forEach(function (obstacle) {
    obstacle.topElement.remove();
    obstacle.bottomElement.remove();
  });
  
  missiles.forEach(function (missile) {
    missile.element.remove();
  });
  
  boosters.forEach(function (booster) {
    booster.element.remove();
  });
  
  oxygenTanks.forEach(function (tank) {
    tank.element.remove();
  });

    obstacles = [];
    missiles = [];
    boosters = [];
    oxygenTanks = [];
    


}



function rectanglesOverlap(firstRect, secondRect) {
  return (
    firstRect.left   < secondRect.right  &&   // first hasn't passed second on the left
    firstRect.right  > secondRect.left   &&   // first hasn't passed second on the right
    firstRect.top    < secondRect.bottom &&   // first hasn't passed second above
    firstRect.bottom > secondRect.top        // first hasn't passed second below
  );
}


// ─────────────────────────────────────────────────────────────
// shrinkRect(rect, insetX, insetY)
// Returns a NEW rectangle that is smaller than the input rect.
//
// getBoundingClientRect() returns the FULL visual bounding box.
// Shrinking it makes the effective hitbox smaller than the visual.
// This is called "forgiveness hitbox" — it makes the game feel fair.
//
// Example with insetX=8, insetY=6:
//   Original: left=50, right=150, top=100, bottom=200
//   Shrunk:   left=58, right=142, top=106, bottom=194
//
// Note: this returns a plain object { left, right, top, bottom },
// NOT a real DOMRect. That's fine — rectanglesOverlap() only reads
// those four properties, so it works the same way.
// ─────────────────────────────────────────────────────────────
function shrinkRect(rect, insetX, insetY) {
  return {
    left:   rect.left   + insetX,  // push left edge INWARD (to the right)
    right:  rect.right  - insetX,  // push right edge INWARD (to the left)
    top:    rect.top    + insetY,  // push top edge INWARD (downward)
    bottom: rect.bottom - insetY,  // push bottom edge INWARD (upward)
  };
}

