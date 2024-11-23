import axios from 'axios';
import React, { useState } from 'react';
import ProfileBackgroundImage from '../../assets/images/jungle.jpg';
import './ForgotPassword.css';

const ForgotPassword = () => {

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
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/forgot-password', { email });

      if (response.status === 200) {
        window.alert(response.data.message);
        setMessage(response.data.message);
      } else {
        setError("Unexpected response from server.");
      }
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'User not found or an error occurred.');
      setMessage('');
    }
  };

  return (
    <div style={divStyle}>
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">Forgot Password</h1>
      {message && <p className="forgot-success-message">{message}</p>}
      {error && <p className="forgot-error-message">{error}</p>}
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
