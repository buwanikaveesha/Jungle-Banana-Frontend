import React from 'react';
import SlideMenuBar from '../../components/NavBar/NavBar';
import './Leaderboard.css';

const Leaderboard = () => {
  const players = [
    { name: 'Buwani', score: 100 },
    { name: 'Nimnadi', score: 100 },
    { name: 'Chanith', score: 100 },
    { name: 'Yasiru', score: 100 },
    { name: 'Imesha', score: 100 },
  ];

  return (
    <div>
      <SlideMenuBar /> {/* Add SlideMenuBar */}
      <br></br>
      <div>
      <h1 className="leaderboard-title">LEADERBOARD</h1>
      </div>
      <div className="leaderboard-container">
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <div className="header-cell">Name</div>
            <div className="header-cell">Score</div>
          </div>
          {players.map((player, index) => (
            <div key={index} className="leaderboard-row">
              <div className="player-rank">{index + 1}</div>
              <div className="player-name">{player.name}</div>
              <div className="player-score">{player.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
