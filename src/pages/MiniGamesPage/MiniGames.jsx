import React from 'react';
import { useNavigate } from 'react-router-dom';
import SlideMenuBar from '../../components/NavBar/NavBar';
import './MiniGames.css';

const MiniGames = () => {
  const navigate = useNavigate();

  // Handlers to navigate to each game page
  const handleCandyCrushStart = () => {
    navigate('/Candy'); // Adjust route to your actual route
  };

  const handleMemoryCardStart = () => {
    navigate('/memoryCardGame'); // Adjust route to your actual route
  };

  return (
    <div>
      <SlideMenuBar />
      <div className="mini-games-container">
        <h1 className="title">MINI GAMES</h1>
        <div className="games">
          {/* Candy Crush Section */}
          <div className="game-card">
            <h2>Candy Crush</h2>
            <br />
            <div className="game-preview candy-crush">
              <div className="candy-background" />
              <button className="start-button2" onClick={handleCandyCrushStart}>
                Start
              </button>
            </div>
          </div>

          {/* Memory Card Section */}
          <div className="game-card">
            <h2>Memory Card</h2>
            <br />
            <div className="game-preview memory-card">
              <div className="memoryCard-background" />
              <button className="start-button2" onClick={handleMemoryCardStart}>
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGames;
