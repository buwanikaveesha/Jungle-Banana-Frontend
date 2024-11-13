import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import TigerImage from '../../assets/images/cute-tiger-studio.png';
import ProfileBackgroundImage from '../../assets/images/jungle.jpg';
import SlideMenuBar from '../../components/NavBar/NavBar';
import AuthContext from '../../context/AuthContext';
import './leaderboard.css';

const Leaderboard = () => {

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
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const currentUserEmail = 'user@example.com';
  const [difficultyLevel, setDifficultyLevel] = useState('easy');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/leaderboard?level=${difficultyLevel}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log("API response:", response.data);


        const leaderboardData = response.data[difficultyLevel];


        if (Array.isArray(leaderboardData)) {
          setLeaderboard(leaderboardData);


          const currentUser = leaderboardData.find(user => user.email === currentUserEmail);
          if (currentUser) {
            setUserRank(currentUser.rank);
          }
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, [token, difficultyLevel]);


  const getCrownIcon = (rank) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div style={divStyle}>
      <SlideMenuBar />
      <img src={TigerImage} alt="Tiger" className="tiger-image" />
      <div className='leader-board-title'>
        <h2>LEADERBOARD</h2>
      </div>
      <div className="leader-board-container">
        <div className="leader-board">
          <div>
            <label className='choose-mode' htmlFor="difficulty">Choose difficulty:</label>
          </div>
          <div className='select-mode'>
            <select
              id="difficulty"
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Blurred background behind the table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user) => (
                  <tr key={user.email}>
                    <td>{getCrownIcon(user.rank)} {user.rank}</td>
                    <td>{user.username}</td>
                    <td>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {userRank && <p>Your Rank: {userRank}</p>}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;