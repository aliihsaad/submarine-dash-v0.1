function updateSubmarine() {
    if(!gameRunning) return;

    velocity = velocity + gravity;
    submarineY = submarineY + velocity;
    submarine.style.top = submarineY + "px";
}

function boostSubmarine() {
    if(!gameRunning) return;
    velocity = boostPower;
}

function checkBounds() {
    const minY = 0;
    const maxY = gameArea.offsetHeight - submarine.offsetHeight;
    
    if (submarineY < minY) {
        submarineY = minY;
        velocity = 0;
    }
    
    if (submarineY > maxY) {
        submarineY = maxY;
        velocity = 0;
    }

    submarine.style.top = submarineY + "px";
}

function handleHit() {
    isInvincible = true;
    submarine.classList.add("invincible");
    clearTimeout(hitRecoveryTimeoutId);
    hitRecoveryTimeoutId = setTimeout(function () {
        isInvincible = false;
        submarine.classList.remove("invincible");
    }, hitInvincbilityTime);
}