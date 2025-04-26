import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/signup', {
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
      program,
    })
    .then(() => navigate('/signin'))
    .catch(err => console.log(err));
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign up</h2>
        <p>
          Create an account or <a href="/signin">Sign in</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Program</label>
            <select
              required
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              <option value="Internship">Internship</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Both">Both Internship and Scholarship</option>
            </select>
          </div>
          <button type="submit">Sign up</button>
        </form>
        <p className="disclaimer">
          By signing up to create an account, you are accepting our terms of service and privacy policy
        </p>
      </div>
    </div>
  );
};

export default Signup;
