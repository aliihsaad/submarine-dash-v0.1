class Obstacle {
  constructor() {
    // position data
    this.x = gameArea.offsetWidth;
    this.width = obstacleWidth;
    this.scored = false;

    // random gap position
    const minGapTop = obstacleGapMargin;
    const maxGapTop = gameArea.offsetHeight - obstacleGap - obstacleGapMargin;
    const gapTop = Math.floor(Math.random() * (maxGapTop - minGapTop + 1)) + minGapTop;

    // build + style the two pipes
    this.topElement = this.createPipe("obstacle-top", gapTop - obstacleHeight);
    this.bottomElement = this.createPipe("obstacle-bottom", gapTop + obstacleGap);

    gameArea.appendChild(this.topElement);
    gameArea.appendChild(this.bottomElement);
  }

  // helper that builds one pipe img — keeps the constructor short
  createPipe(extraClass, y) {
    const el = document.createElement("img");
    el.classList.add("obstacle", extraClass);
    el.src = obstacleAsset;
    el.alt = "";
    el.style.left = this.x + "px";
    el.style.top = y + "px";
    el.style.width = this.width + "px";
    el.style.height = obstacleHeight + "px";
    return el;
  }

  move() {
    this.x = this.x - obstacleSpeed;
    this.topElement.style.left = this.x + "px";
    this.bottomElement.style.left = this.x + "px";
  }

  isOffScreen() {
    return this.x + this.width < 0;
  }

  remove() {
    this.topElement.remove();
    this.bottomElement.remove();
  }

  checkScore(submarineFront) {
    if (!this.scored && this.x + this.width < submarineFront) {
      this.scored = true;
      score = score + 1;
      updateHUD();
    }
  }
}


function spawnObstacle() {
  obstacles.push(new Obstacle());
}

function startObstacleSpawn() {
  clearInterval(obstacleSpawnId);
  spawnObstacle();
  obstacleSpawnId = setInterval(spawnObstacle, obstacleSpawnDelay);
}

function moveObstacles() {
  for (let i = 0; i < obstacles.length; i = i + 1) {
    const obstacle = obstacles[i];
    obstacle.move();

    if (obstacle.isOffScreen()) {
      obstacle.remove();
      obstacles.splice(i, 1);
      i = i - 1;
    }
  }
}

// Messiles

function spawnMissile() {
  const el = document.createElement("img");
  const x = gameArea.offsetWidth;
  const y = Math.floor(Math.random() * (gameArea.offsetHeight - missileHeight));

  el.classList.add("missile");
  el.src = missileAsset;
  el.alt = "";
  el.style.position = "absolute";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.width  = missileWidth + "px";
  el.style.height = missileHeight + "px";

  missiles.push({ element: el, x: x, width: missileWidth });
  gameArea.appendChild(el);
}

function startMissileSpawn() {
  clearInterval(missileSpawnId);
  missileSpawnId = setInterval(spawnMissile, missileSpawnDelay);
}

function moveMissiles() {
  for (let i = 0; i < missiles.length; i = i + 1) {
    const m = missiles[i];
    m.x = m.x - missileSpeed;
    m.element.style.left = m.x + "px";

    if (m.x + m.width < 0) {
      m.element.remove();
      missiles.splice(i, 1);
      i = i - 1;
    }
  }
}

function updateScore() {
  const submarineFront = submarine.offsetLeft + submarine.offsetWidth;
  obstacles.forEach(function (obstacle) {
    obstacle.checkScore(submarineFront);
  });
}