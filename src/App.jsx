import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import GameInterface from './components/GameInterface';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/common.css';
import { decodeHTML } from './utils/utils';  // Using absolute path (try this if relative path doesn't work)



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false); // New state to track game over

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsGameOver(false); // Reset game over state if user logs in again
  };

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false); // Reset game over state when starting new game
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsGameStarted(false); // End the game and show the "Back to Home" button
  };

  const goBackToHome = () => {
    setIsLoggedIn(false);
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  return (
    <div className="app">
      <Header />
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : !isGameStarted ? (
        !isGameOver ? (
          <>
            <div className="instructions">
              <h3>How to Play:</h3>
              <ul>
                <li>Select the correct answer for each trivia question.</li>
                <li>You will receive a score for every correct answer.</li>
                <li>After completing all the questions, your total score will be displayed.</li>
                <li>Have fun and challenge your knowledge!</li>
              </ul>
              <button onClick={startGame}>Start Game</button>
            </div>
          </>
        ) : (
          <div className="game-over">
            <h2>Game Over</h2>
            <button onClick={goBackToHome}>Back to Home</button>
          </div>
        )
      ) : (
        <GameInterface onGameOver={handleGameOver} />
      )}
      <Footer />
    </div>
  );
};

export default App;
