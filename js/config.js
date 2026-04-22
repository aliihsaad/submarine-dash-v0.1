// == Frame Rate == 
const TARGET_FPS = 60;
const TARGET_MS = 1000 / TARGET_FPS;



// ==Obstacles== //
const obstacleGapMargin = 70;
let obstacleSpawnDelay = 3800;
let obstacleSpeed = 2.5;
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
let missileSpawnDelay = 5000;
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

// ==OxygenTank== //
const oxygenTankAsset = "assets/decor/oxygen-tank.png";

let oxygenTanksSpeed = obstacleSpeed;
const oxygenTankSpawnDelay = 6500;
const oxygenTankSize = 42;
const oxygenTankMargin = 40;
 

// ==Physics== //
const gravity = 0.45;
const boostPower = -8;

// ==Collision Penalty== //
let collisionOxygenPenalty = 25;
let hitInvincbilityTime = 1000;

// ==Oxygen== //
const oxygenDrainAmount = 2;
const oxygenDrainDelay = 1000;

// ==Audio== //
let soundOn = false;
const subHit = "assets/audio/subHit.mp3";
const underWater = "assets/audio/underWater.mp3"
const sonar = "assets/audio/sonar.mp3"
const gameOver = "assets/audio/gameOver.mp3"
const woosh = "assets/audio/woosh.mp3"




