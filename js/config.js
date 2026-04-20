
// ==Obstacles== //
const obstacleGapMargin = 70;
const obstacleSpawnDelay = 2500;
let obstacleSpeed = 2;
const obstacleWidth = 96;
const obstacleHeight = 520;
const obstacleAsset = "assets/obstacles/pipe-green.png";
const obstacleHitInsetX = 8;
const obstacleHitInsetY = 6;
const obstacleGap = 220;

// ==Missiles== //
const missileAsset = "assets/obstacles/missile.png";
const missileWidth = 60;
const missileHeight = 24;
let missileSpeed = 6;
const missileSpawnDelay = 5000;
const missileHitInsetX = 4;
const missileHitInsetY = 4;

// ==Booster== //
const boosterAsset = "assets/images/booster.png";
const boosterWidth = 24;
const boosterHeight = 24;
let boostersSpeed = obstacleSpeed;
const boosterSpawnDelay = 22000;
const boosterHitInsetX = 4;
const boosterHitInsetY = 4;

const submarineHitInsetX = 18;
const submarineHitInsetY = 12;
 

// ==Physics== //
const gravity = 0.4;
const boostPower = -7;

// ==Collision Penalty== //
const collisionOxygenPenalty = 25;
let hitInvincbilityTime = 1000;

// ==Oxygen== //
const oxygenDrainAmount = 2;
const oxygenDrainDelay = 1000;




