const gameCanvas = document.querySelector(".canvas");
const startButton = document.getElementById("start-btn");
const result = document.getElementById("result");
const gameState = document.getElementById("game-state");
const scoresContainer = document.querySelector("#scores");
const nameInput = document.getElementById("name-input");
const leaderboardBtn = document.getElementById("leaderboard-btn");
const restrictText = document.getElementById("restrict-text");
const apiUrl = "https://reaction-app-server.herokuapp.com/api/v1/all";
// Speed and Delay variables
let delay;
let speed = 0;
let speedInterval;

// POST Request - Adds new score to leaderboard
const addNewScore = () => {
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      speed: Number(speed),
    }),
  }).then((res) => {
    console.log("Request complete! response:", res);
  });
};

// Start game button handler
startButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Checks if input is empty and adds the input validator
  if (nameInput.value === "") {
    restrictText.classList.add("show");
  } else {
    restrictText.classList.remove("show");
    startGame();
  }
});

// Handles adding new leaderboard items and renders leaderboard on load
const renderLeaderboard = () => {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      scoresContainer.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        const container = document.createElement("div");
        const scoreElement = document.createElement("p");
        const nameElement = document.createElement("h4");
        scoreElement.innerText = `Speed: ${data[i].speed}ms`;
        nameElement.innerText = `${data[i].name}`;
        scoresContainer.appendChild(container);
        container.appendChild(nameElement);
        container.appendChild(scoreElement);
      }
    });
};

leaderboardBtn.addEventListener("click", () => {
  leaderboardBtn.classList.remove("show");
  addNewScore();
  renderLeaderboard();
});

// Sets all elements to start game construct
const startGame = () => {
  leaderboardBtn.classList.remove("show");
  restrictText.classList.remove("show");
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
    leaderboardBtn.classList.add("show");
  });
};

renderLeaderboard()();
