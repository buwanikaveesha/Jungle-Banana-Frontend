import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileBackgroundImage from '../../assets/images/jungle.jpg';
import AuthContext from '../../context/AuthContext';
import './Login.css';

const Login = () => {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        login(response.data.token);
        navigate('/levelSelection');
      } else {
        setErrorMessage('Incorrect Username or Password. Try again!');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error("Login error:", error.response || error);
      setErrorMessage('Incorrect Username or Password. Try again!');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div style={divStyle}>
      <div className='wrapper1'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {errorMessage && <p className="login-error-message">{errorMessage}</p>}
          <div className='input-box1'>
            <input
              type='text'
              name="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-box1'>
            <input
              type='password'
              name="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='remember-forgot1'>
            <label><input type='checkbox' /> Remember me</label>
            <a href='./forgotPassword'>Forgot password</a>
          </div>
          <button className='loginbtn2' type='submit'>Login</button>
          <br />
          <div className='register-link'>
            <p>Don't have an account? <a href='./signup'>Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
