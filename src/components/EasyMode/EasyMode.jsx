import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './EasyMode.css';

const EasyMode = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  let { level } = useParams();

  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(60);
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
      console.log('Solution:', solution);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    fetchData();
    startTimer();

    return () => clearInterval(timerInterval.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerInterval.current);
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

  const handleScoreCalculate = async (isAnswerCorrect) => {
  if (isAnswerCorrect) {
      const point = level === 'easy' ? 5 : level === 'medium' ? 10 : 20;
      const updatedScore = score + point;

      try {
          const response = await axios.put("http://localhost:3000/api/score", {
              score: point,
              level
          }, {
              headers: { 'Authorization': `Bearer ${token}` } 
              
          });

          if (response.status === 200) {
              setScore(updatedScore);
              setCorrectRounds((prev) => prev + 1);
              fetchData();
          } else {
              console.log('Error updating score');
          }
      } catch (error) {
          console.log("Error during score update:", error);
      }
  }
  setTotalRounds((prev) => prev + 1);
  setSelectedAnswer('');
};


  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === solution;
    setIsCorrect(isAnswerCorrect);
    handleScoreCalculate(isAnswerCorrect);
  };

  const handleRestart = () => {
    clearInterval(timerInterval.current);
    setTimer(60);
    setRound(1);
    setScore(0);
    setCorrectRounds(0);
    setTotalRounds(0);
    setShowOverlay(false);
    fetchData();
    startTimer();
  };

  const handleQuit = () => {
    clearInterval(timerInterval.current);
    navigate('/levelselection');
  };

  return (
    <div className="container-easy">
      <div className="timer-round-easy">
        <p>Timer: {timer}s</p>
        <p>Score: {score}</p>
      </div>
      <div className='load-easy-game'>
        <img className="easy-img-game" src={question} alt="banana-game-easy" />
      </div>
      <h5 className="medium-game-answer">Answer is: {solution}</h5>
      <div className="buttons-container-easy">
        {Array.from({ length: 10 }, (_, index) => (
          <button
            key={index}
            className={`number-button-easy ${selectedAnswer === index ? 'selected' : ''}`}
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
        <div className="overlay-easy-game">
          <div className="overlay-content-easy-game">
            <h2>Time’s up!</h2>
            <p>Final Score: {score}</p>
            <button onClick={handleRestart}>Restart</button>
            <button onClick={handleQuit}>Quit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EasyMode;
