import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import GiraffeImage from '../../assets/images/3d-cartoon-wild-animal-nature.png';
import ProfileBackgroundImage from '../../assets/images/jungle.jpg';
import SlideMenuBar from '../../components/NavBar/NavBar';
import AuthContext from '../../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
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

  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/profile', {
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
    <div style={divStyle}>
      <SlideMenuBar />
      <img src={GiraffeImage} alt="Giraffe" className="giraffe-image" />
      <div className="profile-title">
        <h1>PROFILE</h1>
      </div>
      <div className="form-container">
        <div className="input-field">
          <label>Name:</label>
          <input type="text" value={user.username} readOnly />
        </div>
        <div className="input-field">
          <label>Email:</label>
          <input type="email" value={user.email} readOnly />
        </div>
        <div className="score-section">
          {['easy', 'medium', 'hard'].map((level) => (
            <div className="score-box" key={level}>
              <button className="difficulty-label">{level.toUpperCase()}</button>
              <div>Score: {user.score[level]}</div>
              <div>Rank: {user.rank[level]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
