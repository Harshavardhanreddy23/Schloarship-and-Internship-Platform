import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signin.css'; // Import CSS file

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Post the sign-in data to the backend
    axios.post('http://localhost:3001/signin', { email, password, program })
      .then(response => {
        const { token, role, email } = response.data;

        // Store user data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('studentEmail', email); // ✅ Use consistent key

        // Navigate based on user role
        if (role === 'admin') {
          navigate('/admin'); // Redirect to Admin Page
        } else {
          navigate('/StudentPortal'); // Redirect to Student Portal
        }
      })
      .catch(err => {
        console.error('Sign-in error:', err);
        alert('Sign-in failed. Please check your credentials.');
      });
  };

  return (
    <div className="signin-container">
      <h2>Sign in</h2>
      <p>Log in to your account or <a href="/signup">Sign up</a></p>
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
        <div className="form-group">
          <label>Program</label>
          <select
            name="program"
            required
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Internship">Internship</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Both">Both Internship and Scholarship</option>
          </select>
        </div>
        <button type="submit" className="signin-button">Sign in</button>
      </form>
      <p>By signing in, you are accepting our terms of service and privacy policy</p>
    </div>
  );
};

export default SignInForm;
