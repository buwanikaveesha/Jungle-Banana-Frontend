import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './HardMode.css';

function HardMode() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(15);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const timerInterval = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/question");
      const { question, solution } = response.data;
      setQuestion(question);
      setSolution(solution);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    startTimer(); // Start the timer when the component mounts

    return () => clearInterval(timerInterval.current); // Clear timer on unmount
  }, []);

  const startTimer = () => {
    clearInterval(timerInterval.current); // Clear any existing interval before starting a new one
    timerInterval.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval.current);
          setShowOverlay(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleAnswerClick = (number) => {
    setSelectedAnswer(number);
    const correct = number === solution;
    setIsCorrect(correct);
    if (correct) {
      setScore((prevScore) => prevScore + 20);
      setCorrectRounds((prevCorrectRounds) => prevCorrectRounds + 1);
    }

    // Proceed to next round
    setTotalRounds((prevTotalRounds) => prevTotalRounds + 1);
    setTimeout(() => {
      setRound((prevRound) => prevRound + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      fetchData();
    }, 1000);
  };

  const handleRestart = () => {
    // Clear existing timer interval
    clearInterval(timerInterval.current);

    // Reset state for a new game
    setTimer(15);
    setRound(1);
    setScore(0);
    setCorrectRounds(0);
    setTotalRounds(0);
    setShowOverlay(false);
    fetchData();
    startTimer();
  };

  const handleQuit = () => {
    clearInterval(timerInterval.current); // Clear timer when quitting
    navigate('/levelselection');
  };

  return (
    <div className="container-hard">
      <div className="timer-round-hard">
        <p>Timer: {timer}s</p>
        <p>Round: {round}</p>
        <p>Score: {score}</p>
      </div>
      <img className="hard-img" src={question} alt="banana-game-hard" />
      <h5 className="hard-game-answer">Answer is: {solution}</h5>
      <div className="buttons-container-hard">
        {Array.from({ length: 10 }, (_, index) => (
          <button
            key={index}
            className={`number-button-hard ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => handleAnswerClick(index)}
          >
            {index}
          </button>
        ))}
      </div>
      {isCorrect !== null && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? "Correct!" : "Incorrect!"}
        </div>
      )}
      
      {showOverlay && (
        <div className="overlay-hard-game">
          <div className="overlay-content-hard-game">
            <h2>Time’s up!</h2>
            <p>Final Score: {score}</p>
            <p>Correct Rounds: {correctRounds} out of {totalRounds}</p>
            <button onClick={handleRestart}>Restart</button>
            <button onClick={handleQuit}>Quit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HardMode;
