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

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 6 characters long and include at least one letter and one number.');
      return;
    }

    if (!password.trim()) {
      setError('Password cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/reset-password/${id}/${token}`,
        { password }
      );

      setMessage(response.data.message);
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      // Handle server error
      if (err?.response) {
        setError(err?.response?.data?.message || 'An error occurred during password reset.');
      } else {
        setError('An unexpected error occurred.');
      }
      setMessage('');
    }
  };

  return (
    <div style={divStyle}>
      <div className="reset-password-page">
        <h1 className="reset-password-title">Reset Password</h1>
        {message && <p className="reset-success-message">{message}</p>}
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
