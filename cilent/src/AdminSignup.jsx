import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (privateKey !== "Harsha") {
      alert("Invalid Admin");
    } else {
      axios.post('http://localhost:3001/adminsignup', {
        email: email.trim(),
        password: password.trim(),
        privatekey: privateKey.trim(),
      })
        .then(result => {
          console.log(result);
          navigate('/AdminSignin');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '20px' // 👈 Tighter spacing from the top
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #3b5998 0%, #8b9dc3 100%)',
        padding: '40px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '10px' }}>Admin Sign Up</h2>
        <p style={{ color: '#fff', marginBottom: '20px' }}>
          Create an admin account or <a href="/AdminSignin" style={{ color: '#ffeb3b' }}>Sign in</a>
        </p>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit}>
          <div>
            <label style={{ color: '#fff' }}>Email Address</label>
            <input
              type="email"
              name="email"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={{ color: '#fff' }}>Password</label>
            <input
              type="password"
              name="password"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label style={{ color: '#fff' }}>Private Key</label>
            <input
              type="text"
              name="privateKey"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: '#000' }}
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </div>
          <button type="submit" style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#ffeb3b',
            color: '#3b5998',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Sign up
          </button>
        </form>
        <p style={{ color: '#fff', marginTop: '15px', fontSize: '14px' }}>
          By signing up to create an admin account, you are accepting our terms of service and privacy policy
        </p>
      </div>
    </div>
  );
};

export default AdminSignUpForm;
