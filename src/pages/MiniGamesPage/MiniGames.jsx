import React from 'react';
import SlideMenuBar from '../../components/NavBar/NavBar';
import './MiniGames.css';

const MiniGames = () => {
  return (
    <div><SlideMenuBar /> {/* Add SlideMenuBar here */}
      <div className="mini-games-container">
        <h1 className="title">MINI GAMES</h1>
        <div className="games">
          {/* Candy Crush Section */}
          <div className="game-card">
            <h2>Candy Crush</h2>
            <br></br>
            <div className="game-preview candy-crush">
              <div className="candy-background" />
              <button className="start-button2">Start</button>
            </div>
          </div>

          {/* Memory Card Section */}
          <div className="game-card">
            <h2>Memory Card</h2>
            <br></br>
            <div className="game-preview memory-card">
              <div className="memoryCard-background">
                
              </div>
                <button className="start-button2">Start</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGames;
