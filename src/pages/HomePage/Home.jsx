import React from 'react';
import { useNavigate } from 'react-router-dom';
import centeredImage from '../../assets/images/Group 4.png';
import './Home.css';

const BananaGame = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle the login button click
  const handleLoginClick = () => {
    // Navigate to the SignUp page
    navigate('/signup'); // Use the route defined in your App component
  };

  return (
    <div>
      {/* Section for the centered image */}
      <section className="center-image-section">
        <img src={centeredImage} alt="Centered Image" />
      </section>

      {/* Button inside the container */}
      <div className="button-container">
        <button id="loginButton" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default BananaGame;
