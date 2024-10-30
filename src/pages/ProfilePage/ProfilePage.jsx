import React from 'react';
import userPic from '../../assets/images/user pic.jpg';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h1 className="profile-title">PROFILE</h1>
      <br></br>
      <div className="profile-container">
        <div className="profile-picture">
          <img
            src={userPic} 
            alt="Profile"
          />
        </div>
        <div className="profile-details">
          <p>Name: Buwani</p>
          <p>Email: buwani@gmail.com</p>
          <p>Current Score: 100</p>
          <p>Current Position: 1st</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
