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
window.handleHit = handleHit;

function handleBooster() {
    isInvincible = true;
    hitInvincbilityTime = 8000;
    submarine.classList.add("invincible");
    clearTimeout(boosterTimeoutId);
    boosterTimeoutId = setTimeout(function () {
        isInvincible = false;
        hitInvincbilityTime = 1000;
        submarine.classList.remove("invincible");
    }, hitInvincbilityTime);
}
window.handleBooster = handleBooster;