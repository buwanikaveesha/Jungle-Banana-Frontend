import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


const SlideMenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Menu icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/levelselection" onClick={toggleMenu}>Banana Game</Link></li>
          <li><Link to="/miniGames" onClick={toggleMenu}>Mini Games</Link></li>
          <li><Link to="/leaderboard" onClick={toggleMenu}>Leaderboard</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Logout</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default SlideMenuBar;
