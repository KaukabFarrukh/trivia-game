import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameInterface = ({ onGameOver }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (answer === correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
    } else {
      onGameOver(); // Call onGameOver function passed from App.jsx when game is over
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="game-interface">
      {currentQuestion ? (
        <>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{currentQuestion.question}</p>
          <div className="answers">
            {currentQuestion.incorrect_answers
              .concat(currentQuestion.correct_answer)
              .sort()
              .map((answer, index) => (
                <button key={index} onClick={() => handleAnswer(answer)}>
                  {answer}
                </button>
              ))}
          </div>
          <p>Score: {score}</p>
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default GameInterface;
