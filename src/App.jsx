import React from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Candy from './components/CandyCrushGame/Candy';
import EasyMode from './components/EasyMode/EasyMode';
import HardMode from './components/HardMode/HardMode';
import MediumMode from './components/MediumMode/MediumMode';
import MemoryCardGame from './components/MemoryCardGame/MemoryCard';
import NavBar from './components/NavBar/NavBar';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/HomePage/Home';
import Leaderboard from './pages/LeaderboardPage/Leaderboard';
import LevelSelectionPage from './pages/LevelSelectionPage/LevelSelectionPage';
import Login from './pages/LoginPage/Login';
import MiniGames from './pages/MiniGamesPage/MiniGames';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignUp from './pages/SignUpPage/SignUp';


const LevelRouter = () => {

  const { level } = useParams();

  switch(level) {
    case 'easy':
      return <EasyMode />
    
    case 'medium':
      return <MediumMode />

    case 'hard':
      return <HardMode />

    default:
      return <div>Level not found</div>
  }

}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/levelSelection' element={<LevelSelectionPage />} />
          <Route path='/miniGames' element={<MiniGames />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/navBar' element={<NavBar />} />
          <Route path='/memoryCardGame' element={<MemoryCardGame />} />
          <Route path='/candy' element={<Candy />} />
          <Route path='/level/:level' element={<LevelRouter />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;