function startOxygenDrain() {
    clearInterval(oxygenDrainId);
    oxygenDrainId = setInterval(function () {
        oxygenLevel = Math.max(0, oxygenLevel - oxygenDrainAmount);
        updateHUD();

        if (oxygenLevel <=0) {
            endGame();
        }
    }, oxygenDrainDelay)
}

function spawnOxygenTank() {
  const tankElement = document.createElement("img");
  const tankX = gameArea.offsetWidth;
  const minY = oxygenTankMargin
  const maxY = gameArea.offsetHeight - oxygenTankSize - oxygenTankMargin;
  const tankY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

  tankElement.classList.add("oxygenTank");
  tankElement.src = oxygenTankAsset;
  tankElement.alt = "";
  tankElement.style.position = "absolute";
  tankElement.style.left = tankX + "px";
  tankElement.style.top = tankY + "px";
  tankElement.style.width = oxygenTankSize + "px";
  tankElement.style.height = oxygenTankSize + "px";

  oxygenTanks.push({ element: tankElement, x: tankX, y: tankY, width: oxygenTankSize });
  gameArea.appendChild(tankElement);
}

function startOxygenTankSpawn() {
  clearInterval(oxygenTankSpawnId);
  oxygenTankSpawnId = setInterval(spawnOxygenTank, oxygenTankSpawnDelay);
}

function moveOxygenTanks() {
  for (let i = 0; i < oxygenTanks.length; i = i + 1) {
    const m = oxygenTanks[i];
    m.x = m.x - oxygenTanksSpeed;
    m.element.style.left = m.x + "px";

    if (m.x + m.width < 0) {
      m.element.remove();
      oxygenTanks.splice(i, 1);
      i = i - 1;
    }
  }
}