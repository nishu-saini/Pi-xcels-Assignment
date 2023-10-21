const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const data = require("./movies_metadata.json");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// middleware
app.use(express.json());

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// A mock route to return some data.
app.get("/api/movies", (req, res) => {
  if (!data) {
    return res.status(404).json({
      message: "Data Not Found",
    });
  }

  res.status(200).json(data);
});

app.get("/api/movie/:id", (req, res) => {
  const id = req.params.id;

  const movie = data.filter((movie) => movie.id === parseInt(id));

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  res.status(200).json(movie);
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
