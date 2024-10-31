import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MemoryCardGame from './components/MemoryCardGame/MemoryCard';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/HomePage/Home';
import Leaderboard from './pages/LeaderboardPage/Leaderboard';
import LevelSelectionPage from './pages/LevelSelectionPage/LevelSelectionPage';
import Login from './pages/LoginPage/Login';
import MiniGames from './pages/MiniGamesPage/MiniGames';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignUp from './pages/SignUpPage/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/levelSelection' element={<LevelSelectionPage/>}/>
        <Route path='/miniGames' element={<MiniGames/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/navBar' element={<NavBar/>}/>
        <Route path='/memoryCardGame' element={<MemoryCardGame/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;