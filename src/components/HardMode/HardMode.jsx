import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import monkeyImage from '../../assets/images/animal.png';
import backgroundImage from '../../assets/images/dark-jungle.jpg';
import AuthContext from '../../context/AuthContext';
import './HardMode.css';

function InstructionOverlay({ onClose }) {
  return (
    <div className="instruction-overlay">
      <div className="instruction-content">
        <h2>How to Play the Banana Game</h2>
        <p>
          Solve the given equations vertically by finding the correct numbers to complete each equation.
          Click the number buttons to submit your answer for each equation. Points will be awarded based on the accuracy and difficulty level.
        </p>
        <p>
          You have a limited time to solve as many equations as possible. Try to achieve the highest score!
        </p>
        <button onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
}

function HardMode() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { level } = useParams();

  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [notification, setNotification] = useState('');
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [notificationType, setNotificationType] = useState('');
  const timerInterval = useRef(null);

  useEffect(() => {
    if (!showInstructions) {
      startTimer();
      fetchQuestion();
    }

    return () => clearInterval(timerInterval.current);
  }, [showInstructions]);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/question");
      const { question, solution } = response.data;
      setQuestion(question);
      setSolution(solution);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const startTimer = () => {
    setTimer(15);
    clearInterval(timerInterval.current);
    timerInterval.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval.current);
          setShowOverlay(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  const handleAnswerClick = async (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === solution;

    setNotification(isCorrect ? 'Correct! Well done' : 'Incorrect! Try again');
    setNotificationType(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      const points = level === 'easy' ? 5 : level === 'medium' ? 10 : 20;
      setScore((prev) => prev + points);

      try {
        await axios.put(
          "http://localhost:3000/api/score",
          { score: points, level },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error updating score:", error);
        if (error.response?.status === 403) {
          alert('Session expired. Please log in again.');
          navigate('/login');
        }
      }
    }

    setTimeout(() => {
      setNotification('');
      if (isCorrect) fetchQuestion();
    }, 2000);
  };

  const handleRestart = () => {
    clearInterval(timerInterval.current);
    setTimer(15);
    setScore(0);
    setShowOverlay(false);
    fetchQuestion();
    startTimer();
  };

  const handleQuit = () => {
    clearInterval(timerInterval.current);
    navigate('/levelselection');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showInstructions && <InstructionOverlay onClose={handleCloseInstructions} />}

      <img src={monkeyImage} alt="Monkey" className="monkey-image" />
      <div className="score-timer">
        <p>Timer: {timer}s</p>
        <p>Score: {score}</p>
      </div>

      {timer <= 10 && <ThinkingBubble timer={timer} />}

      <div className="load-question">
        <img src={question} alt="Game Question" />
      </div>

      <div className="answer-options">
      <h5 className="easy-game-answer">Answer is: {solution}</h5>
        {Array.from({ length: 10 }, (_, index) => (
          <button
            key={index}
            className={`answer-button ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => handleAnswerClick(index)}
          >
            {index}
          </button>
        ))}
      </div>

      {notification && (
        <div className={`notification-popup ${notificationType}`}>
          {notification}
        </div>
      )}

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Time’s up!</h2>
            <p>Final Score: {score}</p>
            <button onClick={handleRestart}>Restart</button>
            <button onClick={handleQuit}>Quit</button>
          </div>
        </div>
      )}
    </div>
  );
}

const ThinkingBubble = ({ timer }) => (
  <div className="thinking-bubble">
    <p>Hurry up!<br /> Only {timer} seconds left!</p>
  </div>
);
export default HardMode;
