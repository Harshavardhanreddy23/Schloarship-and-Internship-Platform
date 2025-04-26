import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentPortal.css';

const StudentPortal = () => {
  const [scholarships, setScholarships] = useState([]);
  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/student/opportunities')
      .then((res) => {
        setScholarships(res.data.scholarships);
        setInternships(res.data.internships);
      })
      .catch((err) => {
        console.error("Error fetching opportunities:", err);
      });
  }, []);

  // Optional: Keep this if you want to add logout functionality elsewhere
  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  return (
    <div className="portal-container">
      <h1>Welcome to Your Student Portal</h1>
      <p>Select an opportunity below to learn more:</p>

      <div className="section">
        <h2>Scholarships</h2>
        <ul className="link-list">
          {scholarships.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Internships</h2>
        <ul className="link-list">
          {internships.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentPortal;
