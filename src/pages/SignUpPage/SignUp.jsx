import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileBackgroundImage from '../../assets/images/jungle.jpg';
import './SignUp.css';

const SignUp = () => {

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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }
  
    // Password strength validation
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 6 characters long and include at least one letter and one number.'
      );
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        username,
        email,
        password
      });
      console.log('User signed up:', response.data);
  
      if (response.data.status) {
        setSuccess('Sign-up successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Sign-up failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during sign up. Please try again.');
      console.error(error);
    }
  };
  

  return (
    <div style={divStyle}>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          
          {error && <p className="signUp-error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          
          <div className='input-box'>
            <input 
              type='text' 
              placeholder='Username' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            
          </div>
          
          <div className='input-box'>
            <input 
              type='email' 
              placeholder='Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className='input-box'>
            <input 
              type='password' 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            
          </div>

          <button className='loginbtn2' type='submit'>Sign Up</button>
          
          <div className='register-link'>
            <p>Already have an account? <a href='./login'>Login</a></p>
          </div>
        </form>
      </div>
      </div>
  );
};

export default SignUp;
