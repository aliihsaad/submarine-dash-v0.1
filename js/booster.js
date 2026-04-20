function spawnBooster() {
  const el = document.createElement("img");
  const x = gameArea.offsetWidth;
  const y = Math.floor(Math.random() * (gameArea.offsetHeight - boosterHeight));

  el.classList.add("booster");
  el.src = boosterAsset;
  el.alt = "";
  el.style.position = "absolute";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.width  = boosterWidth + "px";
  el.style.height = boosterHeight + "px";

  boosters.push({ element: el, x: x, width: boosterWidth });
  gameArea.appendChild(el);
}

function startBoosterSpawn() {
  clearInterval(boosterSpawnId);
  boosterSpawnId = setInterval(spawnBooster, boosterSpawnDelay);
}

function moveBoosters() {
  for (let i = 0; i < boosters.length; i = i + 1) {
    const m = boosters[i];
    m.x = m.x - boostersSpeed;
    m.element.style.left = m.x + "px";

    if (m.x + m.width < 0) {
      m.element.remove();
      boosters.splice(i, 1);
      i = i - 1;
    }
  }
}