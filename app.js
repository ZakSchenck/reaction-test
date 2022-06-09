const gameCanvas = document.querySelector(".canvas");
const startButton = document.getElementById("start-btn");
const result = document.getElementById("result");
const gameState = document.getElementById("game-state");
let delay;
let speed = 0;
let speedInterval;

startButton.addEventListener("click", () => {
  startGame();
});

const startGame = () => {
  speed = 0;
  delay = 0;
  startButton.style.pointerEvents = "none";
  gameState.innerText = "Wait for it...";
  delay = Math.floor(Math.random() * 2000) + 1800;
  window.setTimeout(() => {
    gameCanvas.style.pointerEvents = "auto";
    gameCanvas.classList.add("green");
    speedHandler();
    gameState.innerText = "GO!";
  }, delay);
};

const speedHandler = () => {
  speedInterval = setInterval(() => {
    speed += 1;
  }, 1);

  const resetGame = () => {
    gameCanvas.classList.remove("green");
    result.innerText = `${speed}ms`;
    gameCanvas.style.pointerEvents = "none";
    clearInterval(speedInterval);
    startButton.style.pointerEvents = "auto";
  };

  gameCanvas.addEventListener("click", () => {
    resetGame();
    gameState.innerText = "Press start game and click when this turns green";
  });
};
