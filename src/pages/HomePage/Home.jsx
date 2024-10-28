import React from 'react';
import { useNavigate } from 'react-router-dom';
import centeredImage from '../../assets/images/Home.png';
import './Home.css';

const BananaGame = () => {
  const navigate = useNavigate(); 

  
  const handleLoginClick = () => {
    
    navigate('/login'); 
  };

  return (
    <div>
      {/* Section for the centered image */}
      <section className="center-image-section">
        <img src={centeredImage} alt="Centered Image" />
      </section>

      {/* Button inside the container */}
      <div className="button-container">
        <button className='loginbtn' id="loginButton" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default BananaGame;
