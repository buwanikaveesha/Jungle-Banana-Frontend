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

      {/*Description*/}
      <div className="home-text-container">
        <p className="game-description">
          Embark on a wild adventure in the jungle filled with <br></br>bananas, challenges, and fun!
          <br></br>Get ready to explore the mysterious <br></br> jungle and conquer exciting levels.<br></br>
          Join us now and unleash your inner explorer!
        </p>
      </div>

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
