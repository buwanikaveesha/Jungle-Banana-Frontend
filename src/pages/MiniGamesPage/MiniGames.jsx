import React from 'react';
import { useNavigate } from 'react-router-dom';
import ZebraImage from '../../assets/images/cartoon-zebra.png';
import ProfileBackgroundImage from '../../assets/images/jungle.jpg';
import SlideMenuBar from '../../components/NavBar/NavBar';
import './MiniGames.css';

const MiniGames = () => {

  const divStyle = {
    backgroundImage: `url(${ProfileBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const navigate = useNavigate();


  const handleCandyCrushStart = () => {
    navigate('/Candy');
  };

  const handleMemoryCardStart = () => {
    navigate('/memoryCardGame');
  };

  return (
    <div style={divStyle}>
      <div>
        <SlideMenuBar />
        <img src={ZebraImage} alt="Zebra" className="zebra-image" />
        <div className="mini-games-container">
          <h1 className="title-minigame">MINI GAMES</h1>
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
    </div>
  );
};

export default MiniGames;
