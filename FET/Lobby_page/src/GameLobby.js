import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function GameLobby() {
  const navigate = useNavigate();
  const [triviaGames, setTriviaGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    axios.get('https://907fx2wvif.execute-api.us-east-1.amazonaws.com/Dev/games')
      .then(response => {
        setTriviaGames(response.data.value);
        setFilteredGames(response.data.value);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const filteredByDifficulty = selectedDifficulty
      ? triviaGames.filter(game => game.Difficulty === selectedDifficulty)
      : triviaGames;

    const filteredBySearchTerm = filteredByDifficulty.filter(game =>
      game.GameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.Category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredGames(filteredBySearchTerm);
  }, [selectedDifficulty, searchTerm, triviaGames]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleFilterDifficulty = event => {
    setSelectedDifficulty(event.target.value);
  };

  const handleJoinGame = (game) => {
    console.log('User joined the game:', game);
    navigate('/gameDetails', { state: { game } });

    // Add your logic to handle the user joining the game
    // Redirect the user to the game page or display a confirmation message
  };

  return (
    <div className="container">
      <h1 style={{ color: "blue" }}>Trivia Game Lobby</h1>
      <div className="filters">
        <div className="filter-item mt-4">
          <label>
            Difficulty:
            <select
              className="ms-3"
              value={selectedDifficulty}
              onChange={handleFilterDifficulty}
            >
              <option value="">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
        </div>
        <div className="filter-item search-item mt-4 mb-4">
          <label>
            Search:
            <input
              className="ms-3"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </label>
        </div>
      </div>
      <div className="games-container">
        {filteredGames.map(game => (
          <Card key={game.Id} className="game card">
            <Card.Body>
              <Card.Title>{game.GameName}</Card.Title>
              <Card.Text>
                Category: {game.Category}
                <br />
                Difficulty: {game.Difficulty}
                <br />
                Start Time: {game.StartTime}
              </Card.Text>
              <Button variant="primary" onClick={() => handleJoinGame(game)}>Game Details</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default GameLobby;
