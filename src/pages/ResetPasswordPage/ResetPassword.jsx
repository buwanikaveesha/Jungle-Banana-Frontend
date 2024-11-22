import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileBackgroundImage from '../../assets/images/jungle.jpg';
import './ResetPassword.css';

const ResetPassword = () => {

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

  const { id, token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Password strength validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    setError(
      'Password must be 8+ characters, with at least one uppercase, one lowercase, one number, and one special character.'
    );
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:3000/api/reset-password/${id}/${token}`,
      { password }
    );

    console.log(response); // Log response for debugging
    setMessage(response.data.message);
    setError('');

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  } catch (err) {
    console.error(err); // Log error for debugging
    setError(err?.response?.data?.message || 'An error occurred.');
    setMessage('');
  }
};


  return (
    <div style={divStyle}>
      <div className="reset-password-container">
        <h1 className="reset-password-title">Reset Password</h1>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="reset-error-message">{error}</p>}
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
