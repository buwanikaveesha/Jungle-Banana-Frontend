import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Candy from './pages/CandyCrushPage/Candy'; // Adjust the path based on your file structure
import Home from './pages/HomePage/Home';
import LevelSelectionPage from './pages/LevelSelectionPage/LevelSelectionPage';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/candy' element={<Candy/>}/>
        <Route path='/levelSelection' element={<LevelSelectionPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;