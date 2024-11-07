import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import SlideMenuBar from '../../components/NavBar/NavBar';
import AuthContext from '../../context/AuthContext';
import './leaderboard.css';

const Leaderboard = () => {
  const { token } = useContext(AuthContext); // assuming AuthContext provides token
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const currentUserEmail = 'user@example.com'; // Replace with actual current user’s email
  const [difficultyLevel, setDifficultyLevel] = useState('easy'); // Default to 'easy'

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/leaderboard?level=${difficultyLevel}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log("API response:", response.data);

        // Extract leaderboard data for the specified difficulty level
        const leaderboardData = response.data[difficultyLevel];

        // Check if the leaderboardData is an array
        if (Array.isArray(leaderboardData)) {
          setLeaderboard(leaderboardData);

          // Find the current user's rank if the data includes it
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
  }, [token, difficultyLevel]); // Re-run when difficulty level changes

  return (
    <div>
      <SlideMenuBar />
    <div className="leader-board">
      <div className='leader-board-title'>
      <h2>LEADERBOARD</h2>
      </div>
      
      {/* Difficulty Level Selector */}
      <div>
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
      </div>

      {/* Leaderboard Table */}
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
              <td>{user.rank}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display current user's rank */}
      {userRank && <p>Your Rank: {userRank}</p>}
    </div>
    </div>
  );
};

export default Leaderboard;
