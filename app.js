const gameCanvas = document.querySelector(".canvas");
const startButton = document.getElementById("start-btn");
const result = document.getElementById("result");
const gameState = document.getElementById("game-state");

// Speed and Delay variables
let delay;
let speed = 0;
let speedInterval;

// Start game button handler
startButton.addEventListener("click", () => {
  startGame();
});

// Sets all elements to start game construct
const startGame = () => {
  speed = 0;
  delay = 0;
  startButton.style.pointerEvents = "none";
  gameState.innerText = "Wait for it...";
  // Delays the time before "GO!" to a random integer after pressing start game
  delay = Math.floor(Math.random() * 2000) + 1800;
  window.setTimeout(() => {
    gameCanvas.style.pointerEvents = "auto";
    gameCanvas.classList.add("green");
    speedHandler();
    gameState.innerText = "GO!";
  }, delay);
};

// Handles the reaction time
const speedHandler = () => {
  speedInterval = setInterval(() => {
    speed += 1;
  }, 1);

  // Reset game function
  const resetGame = () => {
    gameCanvas.classList.remove("green");
    result.innerText = `${speed}ms`;
    gameCanvas.style.pointerEvents = "none";
    clearInterval(speedInterval);
    startButton.style.pointerEvents = "auto";
  };

  // Resets game immediately when game canvas is clicked
  gameCanvas.addEventListener("click", () => {
    resetGame();
    gameState.innerText = "Press start game and click when this turns green";
  });
};
