import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import monkeyImage from '../../assets/images/animal.png';
import backgroundImage from '../../assets/images/dark-jungle.jpg';
import AuthContext from '../../context/AuthContext';
import './MediumMode.css';

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

function MediumMode() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { level } = useParams();

  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [notification, setNotification] = useState('');
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const timerInterval = useRef(null);
  const [notificationType, setNotificationType] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    startTimer();
  };

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:3000/api/question");
      const { question, solution } = response.data;
      setQuestion(question);
      setSolution(solution);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showInstructions) {
      startTimer();
      fetchData();
    }
    return () => clearInterval(timerInterval.current);
  }, [showInstructions]);

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
        } else {
          console.log('Error updating score, Status:', response.status);
        }
      } catch (error) {
        console.log("Error during score update:", error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 403) {
          alert('Session expired. Please log in again.');
        }
      }
    }
    setTotalRounds((prev) => prev + 1);
    setSelectedAnswer('');
    if (isAnswerCorrect) fetchData();
  };

  const showNotification = (message, type) => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => setNotification(''), 2000);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === solution;

    if (isAnswerCorrect) {
      showNotification('Correct! Well done', 'correct');
      handleScoreCalculate(true);
    } else {
      showNotification('Incorrect! Try again', 'incorrect');
      handleScoreCalculate(false);
    }
  };

  const handleRestart = () => {
    clearInterval(timerInterval.current);
    setTimer(30);
    setScore(0);
    setCorrectRounds(0);
    setTotalRounds(0);
    setShowOverlay(false);
    setSelectedAnswer('');
    setNotification('');
    fetchData();
    startTimer();
  };
  
  

  const handleQuit = () => {
    clearInterval(timerInterval.current);
    navigate('/levelselection');
  };

  return (
    <div style={divStyle}>
      {showInstructions && <InstructionOverlay onClose={handleCloseInstructions} />}

      <img src={monkeyImage} alt="Monkey" className="monkey-image" />
      <div className="score-timer">
        <p>Timer: {timer}s</p>
        <p>Score: {score}</p>
      </div>

      {timer <= 10 && (
        <ThinkingBubble timer={timer} />
      )}

      <div className='load-medium-game'>
        <img
          className="medium-img-game"
          src={question}
          alt="banana-game-medium"
        />
      </div>
      <br />
      <div className="answer-options">
        <h5 className="medium-game-answer">
          Answer is:
        </h5>

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
};

const ThinkingBubble = ({ timer }) => (
  <div className="thinking-bubble">
    <p>Hurry up!<br /> Only {timer} seconds left!</p>
  </div>
);

export default MediumMode;
