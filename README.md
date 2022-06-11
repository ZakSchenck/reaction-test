# Reaction Test Game
Live website: https://zakschenck.github.io/reaction-test
<img width="1440" alt="Screen Shot 2022-06-10 at 8 22 19 PM" src="https://user-images.githubusercontent.com/91504668/173165048-5e757546-6044-4c74-9cec-ed2816613a04.png">


## App Description
This is a fullstack reaction test video game. Time is measured in milliseconds. I implemented a top ten high scores leaderboard of the ten most recent submissions on the backend.

## Logic Methodology
The best way I found to approach this with logic is with ``setInterval`` and ``setTimeout`` functions. To get a random delay time I used ``delay = Math.floor(Math.random() * 2000) + 1800;`` This randomly selects a delay time within a couple seconds after clicking the start game button. To calculate the reaction speed I set a variable ``let speed = 0``, and used ``setInterval`` to add 1 to the current number every millisecond.

## Tools Used
• HTML5 <br>
• Sass/SCSS <br>
• Javascript <br>
• Node.js <br>
• Express.js <br>
• PostgreSQL

## Frontend Requests
GET request / Rendering leaderboard <br>
```js
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
```
POST request
```js
const addNewScore = () => {
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      score: speed,
    }),
  }).then((res) => {
    console.log("Request complete! response:", res);
  });
};
```
## Backend Requests
GET request
```js
app.get("/api/v1/all", (req, res) => {
  db.query(
    // Limit of 10 leaderboard scores in ASCENDING order
    "SELECT * FROM public.leaderboard ORDER BY public.leaderboard.score asc LIMIT 10 ",
    (error, dbRes) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        res.status(200).json(dbRes.rows);
      }
    }
  );
});
```
DELETE Request
```js
app.delete("/api/v1/all/:id", (req, res) => {
  db.query(
    "DELETE FROM public.leaderboard WHERE public.leaderboard.id = $1",
    [Number(req.params.id)],
    (error, dbRes) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        res.status(200).json(dbRes.rows);
      }
    }
  );
});
```
POST Request 
```js
app.post("/api/v1/all", (req, res) => {
  db.query(
    "INSERT INTO public.leaderboard (name, score) VALUES ($1, $2) RETURNING *",
    [req.body.name, req.body.score],
    (error, dbRes) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        res.status(200).json(dbRes.rows);
      }
    }
  );
});
```
