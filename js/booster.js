function spawnBooster() {
  const boosterElement = document.createElement("img");
  const x = gameArea.offsetWidth;
  const y = Math.floor(Math.random() * (gameArea.offsetHeight - boosterHeight));

  boosterElement.classList.add("booster");
  boosterElement.src = boosterAsset;
  boosterElement.alt = "";
  boosterElement.style.position = "absolute";
  boosterElement.style.left = x + "px";
  boosterElement.style.top = y + "px";
  boosterElement.style.width  = boosterWidth + "px";
  boosterElement.style.height = boosterHeight + "px";

  boosters.push({ element: boosterElement, x: x, width: boosterWidth });
  gameArea.appendChild(boosterElement);
}

function startBoosterSpawn() {
  clearInterval(boosterSpawnId);
  boosterSpawnId = setInterval(spawnBooster, boosterSpawnDelay);
}

function moveBoosters(dtFactor) {
  for (let i = 0; i < boosters.length; i = i + 1) {
    const m = boosters[i];
    m.x = m.x - boostersSpeed * dtFactor;
    m.element.style.left = m.x + "px";

    if (m.x + m.width < 0) {
      m.element.remove();
      boosters.splice(i, 1);
      i = i - 1;
    }
  }
}