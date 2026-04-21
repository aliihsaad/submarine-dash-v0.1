const startBtn = document.querySelector(".start-btn")
const divBtn = document.querySelector(".div-btn")
const restartBtn = document.querySelector(".restart-btn")
const easyBtn = document.querySelector(".easy-btn")
const mediumBtn = document.querySelector(".medium-btn")
const hardBtn = document.querySelector(".hard-btn")
const title = document.querySelector(".difficulty");

const audioBtn = document.querySelector('.audio-btn');                                                                                                              
const bgMusic = new Audio('assets/audio/underWater.mp3');
bgMusic.loop = true;                                                                                                                                          
let isMuted = true;

let difficulty = "Easy";







restartBtn.addEventListener("click", function () {
   restartGame();
   startGame();
});




startBtn.addEventListener("click", function () {
    startGame();
});
console.log ("Start btn Clicked");


document.addEventListener("keydown", function (event) {

  if (event.code === "Space" || event.code === "ArrowUp") {

    event.preventDefault();
    boostSubmarine();
const wooshSound = new Audio(woosh);                                                                            
    if (!isMuted) wooshSound.play();

  }
});

hardBtn.addEventListener("click", function () {
    obstacleSpeed = 5;
    missileSpeed = 8;
    collisionOxygenPenalty = 35;
    difficulty = "Hard";
    title.classList.toggle("h")
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    mediumBtn.classList.remove("selected");
});

mediumBtn.addEventListener("click", function () {
    obstacleSpeed = 3;
    missileSpeed = 8;
    collisionOxygenPenalty = 30;
    difficulty = "Medium";

    title.classList.toggle("m")
    hardBtn.classList.remove("selected");
    easyBtn.classList.remove("selected");
    mediumBtn.classList.add("selected");
});

easyBtn.addEventListener("click", function () {
    obstacleSpeed = 2;
    missileSpeed = 6;
    difficulty = "Easy";
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    mediumBtn.classList.remove("selected");
});


  audioBtn.addEventListener('click', function () {
    isMuted = !isMuted;

    if (isMuted) {
      bgMusic.pause();
      audioBtn.style.backgroundImage = "url('assets/decor/no-sound.png')";
    } else {
      bgMusic.play();
      audioBtn.style.backgroundImage = "url('assets/decor/sound-on.png')";
    }
  });



