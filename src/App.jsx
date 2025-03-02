import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import ChallengeFriend from "./components/ChallengeFriend";
import Score from "./components/Score";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/challenge" element={<ChallengeFriend />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </Router>
  );
}

export default App;