import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ProfilePic from '../../assets/images/user pic.jpg';
import SlideMenuBar from '../../components/NavBar/NavBar';
import AuthContext from '../../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SlideMenuBar />
      <div className="profile-title">
          <h1>PROFILE</h1>
        </div>
      <div className="profile-container">
        
        <div className='profile-card'>
          <div className="profile-image">
            <img src={ProfilePic} alt="Profile" />
          </div>
          <div className="profile-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rank:</strong></p>
            <div className='rank-difficulty'>
              <p>Easy: {user.rank.easy}</p>
              <p>Medium: {user.rank.medium}</p>
              <p>Hard: {user.rank.hard}</p>
            </div>
            <p><strong>Scores:</strong></p>
            <div className='score-difficulty'>
              <p>Easy: {user.score.easy}</p>
              <p>Medium: {user.score.medium}</p>
              <p>Hard: {user.score.hard}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProfilePage;
