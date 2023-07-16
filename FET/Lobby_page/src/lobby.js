const express = require("express");
const axios = require("axios");

const app = express();

// Endpoint to get a specific trivia game
app.get('/lobby/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/games/${id}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    .then(response => {
      const game = response.data;
      console.log(game);
      if (!game) {
        res.status(404).json({ error: "Game not found" });
      } else {
        res.json(game);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Endpoint to get the available trivia games
app.get('/lobby', (req, res) => {
  const { category, difficulty, timeFrame } = req.query;

  const params = {
    category,
    difficulty,
    timeFrame
  };

  axios.get('https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/games', { params, headers: { 'Access-Control-Allow-Origin': '*' } })
    .then(response => {
      const games = response.data;
      res.json(games);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
