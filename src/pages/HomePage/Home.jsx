import React from 'react';
import { useNavigate } from 'react-router-dom';
import centeredImage from '../../assets/images/Group 4.png';
import './Home.css';

const BananaGame = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="game-container">
      {/* Fancy animated circle */}
      <div className="fancy-circle"></div>

      {/* Section for the centered image */}
      <section className="center-image-section">
        <img src={centeredImage} alt="Centered Image" className="centered-image" />
      </section>

      
        {/* Button inside the container */}
        <div className="button-container">
          <button className='loginbtn' id="loginButton" onClick={handleLoginClick}>
            GO
          </button>
        </div>
      </div>
      );
};

      export default BananaGame;
