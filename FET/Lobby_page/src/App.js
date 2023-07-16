import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameLobby from "./GameLobby";
import GameDetailsPage from "./GameDetailsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/lobby" element={<GameLobby />} />
          <Route path="/gameDetails" element={<GameDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
