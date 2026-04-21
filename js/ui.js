const oxygenBarFill = document.querySelector(".oxygen-bar-fill");
const scoreDisplay = document.querySelector(".score-value");
const oxygenPercentage = document.querySelector(".oxygen-percentage")




function updateHUD() {
  scoreDisplay.innerText = score;
  oxygenBarFill.style.width = oxygenLevel + "%";
  oxygenPercentage.innerText = oxygenLevel + "%";

  oxygenBarFill.classList.remove("medium", "low");
  oxygenPercentage.classList.remove("med-color", "low-color")
  if (oxygenLevel < 25) {
    oxygenBarFill.classList.add("low");
    oxygenPercentage.classList.add("low-color")
  } else if (oxygenLevel < 50) {
    oxygenBarFill.classList.add("medium");
    oxygenPercentage.classList.add("med-color")
  }

}
