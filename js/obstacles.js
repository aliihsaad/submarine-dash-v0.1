const obstacleAsset = "assets/obstacles/pipe-green.png";

const obstacleSpeed = 3;
const obstacleWidth = 96;
const obstacleHeight = 520;
const obstacleGap = 220;



function spawnObstacle() {
    const topElement    = document.createElement("img");
    const bottomElement = document.createElement("img");
    const obstacleX = gameArea.offsetWidth;
    const minGapTop = obstacleGapMargin;
    const maxGapTop = gameArea.offsetHeight - obstacleGap - obstacleGapMargin;
    const gapTop = Math.floor(Math.random() * (maxGapTop - minGapTop + 1)) + minGapTop;
    const topY = gapTop - obstacleHeight;
    const bottomY = gapTop + obstacleGap;

      // ── Style the top pipe
  topElement.classList.add("obstacle", "obstacle-top"); // CSS classes for positioning
  topElement.src    = obstacleAsset;
  topElement.alt    = "";                               // empty alt — decorative image
  topElement.style.left   = obstacleX + "px";
  topElement.style.top    = topY + "px";
  topElement.style.width  = obstacleWidth + "px";
  topElement.style.height = obstacleHeight + "px";

  // ── Style the bottom pipe
  bottomElement.classList.add("obstacle", "obstacle-bottom");
  bottomElement.src    = obstacleAsset;
  bottomElement.alt    = "";
  bottomElement.style.left   = obstacleX + "px";
  bottomElement.style.top    = bottomY + "px";
  bottomElement.style.width  = obstacleWidth + "px";
  bottomElement.style.height = obstacleHeight + "px";


  const obstacle = {
    topElement: topElement,
    bottomElement: bottomElement,
    x: obstacleX,
    width: obstacleWidth,
    scored: false,
  };

  // ── Add to tracking array and to the DOM ────────────────────
  // obstacles[] (declared in game.js) tracks all active obstacles.
  // Without pushing here, this obstacle would be invisible to moveObstacles()
  // and checkCollisions().
  obstacles.push(obstacle);
  gameArea.appendChild(topElement);
  gameArea.appendChild(bottomElement);
}



function startObstacleSpawn() {
  // Clear any leftover interval from a previous game — safety net.
  clearInterval(obstacleSpawnId);

  // Spawn one pair immediately so the player doesn't wait 2.5 seconds.
  spawnObstacle();

  // Then spawn a new pair every obstacleSpawnDelay milliseconds (2500ms).
  // obstacleSpawnId is saved to a global (game.js) so endGame() can stop it.
  obstacleSpawnId = setInterval(spawnObstacle, obstacleSpawnDelay);
}


// Called every frame by gameLoop() in game.js.
// Slides each obstacle left by obstacleSpeed pixels and removes it when off-screen.
function moveObstacles() {
  for (let index = 0; index < obstacles.length; index = index + 1) {
    const obstacle = obstacles[index];

    // ── Move left by obstacleSpeed pixels ───────────────────────
    obstacle.x = obstacle.x - obstacleSpeed;

    // Apply the new x position to BOTH pipe elements visually.
    obstacle.topElement.style.left    = obstacle.x + "px";
    obstacle.bottomElement.style.left = obstacle.x + "px";

    // ── Remove when fully off the left edge ──────────────────────
    // obstacle.x is the LEFT edge of the pipe.
    // Adding obstacle.width gives the RIGHT edge.
    // When the right edge goes below 0, the whole pair is off-screen.
    if (obstacle.x + obstacle.width < 0) {
      // Remove both pipe elements from the DOM so the browser forgets them.
      obstacle.topElement.remove();
      obstacle.bottomElement.remove();

      // Remove from the obstacles array (same splice + index correction from race car lab).
      obstacles.splice(index, 1);

      // CRITICAL: after splice, the array is one shorter.
      // The item that WAS at index+1 is now at index.
      // Subtract 1 from index so the next iteration re-checks the same slot.
      index = index - 1;
    }
  }
}