import React from 'react';
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import centeredImage from '../../assets/images/Group 5.png';
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate('/levelSelection'); 
  };

  return (
    <div className="center-image-overlay">
      <img src={centeredImage} alt="Background" />
      <div className='wrapper'>
        <form onSubmit={handleLogin}> {}
          <h1>Login</h1>
          <div className='input-box1'>
            <input type='text' placeholder='Username' required />
            <FaUser className='icon'/>
          </div>
          <div className='input-box1'>
            <input type='password' placeholder='Password' required />
            <FaLock className='icon'/>
          </div>
          <div className='remember-forgot'>
            <label><input type='checkbox'/>Remember me</label>
            <a href='#'>Forgot password</a>
          </div>
          <button className='loginbtn2' type='submit'>Login</button>
          <br></br>
          <div className='register-link'>
            <p>Don't have an account? <a href='./signup'>Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
