import React from 'react';
import './LevelButton.css';

const LevelButton = ({ time, number }) => {
  return (
    <div className="level-button">
      <p className="level-time">{time}</p>
      <div className="stump">
        <span className="level-number">{number}</span>
      </div>
      <button className="start-button">Start</button>
    </div>
  );
};

export default LevelButton;
