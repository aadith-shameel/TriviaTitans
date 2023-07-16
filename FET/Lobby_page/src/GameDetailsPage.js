import React from "react";
import { Link, useLocation } from "react-router-dom";

function GameDetailsPage() {
  const location = useLocation();
  const activeGame = location.state?.game;

  const handleJoinGame = (game) => {
    console.log('User joined the game:', game);

    // Add your logic to handle the user joining the game
    // Redirect the user to the game page or display a confirmation message
  };

  if (!activeGame) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="game-details card">
        <h2>{activeGame.GameName}</h2>
        <p>Category: {activeGame.Category}</p>
        <p>Difficulty: {activeGame.Difficulty}</p>
        <p>Start Time: {activeGame.StartTime}</p>
        {/* <Link to="/lobby" className="btn btn-primary btn-sm float-end">
          Go Back
        </Link> */}
        <button className="btn btn-primary" onClick={() => handleJoinGame(activeGame)}>
          Join Game
        </button>
      </div>
    </div>
  );
}

export default GameDetailsPage;
