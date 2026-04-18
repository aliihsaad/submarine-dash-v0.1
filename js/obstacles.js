

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
  topElement.classList.add("obstacle", "obstacle-top");
  topElement.src    = obstacleAsset;
  topElement.alt    = "";                              
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


  obstacles.push(obstacle);
  gameArea.appendChild(topElement);
  gameArea.appendChild(bottomElement);
}



function startObstacleSpawn() {
  clearInterval(obstacleSpawnId);
  spawnObstacle();
  obstacleSpawnId = setInterval(spawnObstacle, obstacleSpawnDelay);
}


// Called every frame by gameLoop() in game.js.
function moveObstacles() {
  for (let index = 0; index < obstacles.length; index = index + 1) {
    const obstacle = obstacles[index];


    obstacle.x = obstacle.x - obstacleSpeed;

    obstacle.topElement.style.left    = obstacle.x + "px";
    obstacle.bottomElement.style.left = obstacle.x + "px";


    if (obstacle.x + obstacle.width < 0) {
      obstacle.topElement.remove();
      obstacle.bottomElement.remove();
      obstacles.splice(index, 1);

      index = index - 1;
    }
  }
}

function updateScore() {
  const submarineFront = submarine.offsetLeft + submarine.offsetWidth;
  obstacles.forEach(function(obstacle) {
    if(!obstacle.scored && obstacle.x + obstacle.width < submarineFront) {
      obstacle.scored = true;
      score = score + 1;
      updateHUD();
    }
  });
}