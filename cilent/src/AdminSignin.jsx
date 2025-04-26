import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signin.css'; // Optional styling

const AdminSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/adminsignin', { email, password })
      .then(response => {
        const { role } = response.data;

        if (role === 'admin') {
          // ✅ Store adminEmail for route guarding
          localStorage.setItem('adminEmail', email);
          localStorage.setItem('role', role);
          navigate('/admin'); // Redirect to Admin Portal
        } else {
          alert('Unauthorized access. Only admins are allowed.');
        }
      })
      .catch(err => {
        console.error('Sign-in error:', err);
        alert('Sign-in failed. Please check your credentials.');
      });
  };

  return (
    <div className="signin-container">
      <h2>Admin Sign In</h2>
      <p>Log in to your admin account</p>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signin-button">Sign in</button>
      </form>
      <p>By signing in, you accept our terms of service and privacy policy.</p>
    </div>
  );
};

export default AdminSignInForm;
