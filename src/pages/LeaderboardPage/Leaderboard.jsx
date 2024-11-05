import React, { useEffect, useState } from 'react';
import SlideMenuBar from '../../components/NavBar/NavBar';
import './Leaderboard.css';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]); 

  useEffect(() => {
    
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/scores/leaderboard');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const scores = await response.json();
        setPlayers(scores); 
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []); 

  return (
    <div>
      <SlideMenuBar /> {/* Add SlideMenuBar */}
      <br />
      <div>
        <h1 className="leaderboard-title">LEADERBOARD</h1>
      </div>
      <div className="leaderboard-container">
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <div className="header-cell">Rank</div>
            <div className="header-cell">Name</div>
            <div className="header-cell">Score</div>
          </div>
          {players.map((player, index) => (
            <div key={index} className="leaderboard-row">
              <div className="player-rank">{index + 1}</div>
              <div className="player-name">{player.username}</div>
              <div className="player-score">{player.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
