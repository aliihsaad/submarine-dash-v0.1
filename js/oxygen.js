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

