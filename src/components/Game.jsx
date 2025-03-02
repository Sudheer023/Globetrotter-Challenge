import React, { useState, useEffect } from "react";
import Data from "/staticData/dataset.js"; // Adjust the import path as needed
import Confetti from "react-confetti";
import { FaSmile, FaSadTear, FaShareAlt } from "react-icons/fa";
import useSound from "use-sound";
import correctSound from "../sound/correct-83487.mp3";
import incorrectSound from "../sound/incorrect-293358.mp3";
import "../App.css";

const Game = () => {
  const [playCorrect] = useSound(correctSound);
  const [playIncorrect] = useSound(incorrectSound);
  const [destination, setDestination] = useState(Data);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showFunfact, setShowFunfact] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  // Fetch a random destination
  const fetchDestination = () => {
    const randomIndex = Math.floor(Math.random() * destination.length);
    setCurrentIndex(randomIndex);
    setFeedback("");
    setShowFunfact(false);
    setShowConfetti(false);
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  const handleGuess = (answer, fun_fact) => {
    if (selectedOption === answer) {
      playCorrect();
      setFeedback("correct");
      setScore({ ...score, correct: score.correct + 1 });
      setShowConfetti(true);
      setShowFunfact(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      playIncorrect();
      setFeedback("incorrect");
      setScore({ ...score, incorrect: score.incorrect + 1 });
      setShowFunfact(true);
    }
  };

  const handleNextClue = () => {
    fetchDestination();
    setSelectedOption("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (username) {
      setIsRegistered(true);
      localStorage.setItem("username", username);
      localStorage.setItem("score", JSON.stringify(score));
    }
  };

  const handleShare = () => {
    setShowSharePopup(true);
    const shareLink = `${window.location.origin}/challenge?username=${username}&score=${score.correct}`;
    const shareMessage = `Challenge me in Globetrotter Challenge! My score: ${score.correct}. Play now: ${shareLink}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`);
  };

  const currentDestination = destination[currentIndex];

  return (
    <div className="game-container">
      <h1>Globetrotter Challenge</h1>

      {/* Username Registration */}
      {!isRegistered && (
        <form onSubmit={handleRegister} className="registration-form">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      )}

      {/* Confetti animation */}
      {showConfetti && <Confetti />}

      {/* Score Display */}
      {isRegistered && (
        <p className="score">Score: Correct - {score.correct}, Incorrect - {score.incorrect}</p>
      )}

      {/* Destination Card */}
      {isRegistered && currentDestination && (
        <div className="destination-card">
          <h2>Clues:</h2>
          <ul>
            {currentDestination.clues.map((clue, index) => (
              <li key={index}>{clue}</li>
            ))}
          </ul>

          <h3>Options:</h3>
          <div className="options-container">
            {currentDestination.option?.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === option ? "selected" : ""}`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            className="submit-button"
            onClick={() => handleGuess(currentDestination.city, currentDestination.fun_fact)}
          >
            Submit
          </button>

          {/* Fun Fact Display */}
          {showFunfact && (
            <div className="fun-fact">
              <p><strong>Fun Fact:</strong> {currentDestination.fun_fact[0]}</p>
            </div>
            
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`feedback ${feedback}`}>
              {feedback === "correct" ? (
                <>
                  <FaSmile className="feedback-icon" size={30} />
                  <p>🎉 Correct! Well done!</p>
                </>
              ) : (
                <>
                  <FaSadTear className="feedback-icon" size={30} />
                  <p>😢 Incorrect! Try again!</p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Next Clue Button */}
      {isRegistered && (
        <button className="next-clue-button" onClick={handleNextClue}>
          Next Clue
        </button>
      )}

      {/* Challenge a Friend Button */}
      {isRegistered && (
        <button className="challenge-button" onClick={handleShare}>
          <FaShareAlt /> Challenge a Friend
        </button>
      )}

      {/* Share Popup */}
      {showSharePopup && (
        <div className="share-popup">
          <p>Share this link with your friend:</p>
          <input
            type="text"
            value={`${window.location.origin}/challenge?username=${username}&score=${score.correct}`}
           
          />
          <button onClick={() => setShowSharePopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Game;