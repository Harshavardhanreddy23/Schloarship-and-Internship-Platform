import React, { useState } from 'react';
import axios from 'axios';
import './AdminPortal.css'; // Optional: Create a CSS file for styling

const AdminPortal = () => {
  const [type, setType] = useState('scholarship');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      type,
      title,
      description,
      link,
    };

    axios.post('http://localhost:3001/admin/add-entry', payload)
      .then(res => {
        setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully.`);
        setTitle('');
        setDescription('');
        setLink('');
      })
      .catch(err => {
        console.error(err);
        setMessage('Error adding entry.');
      });
  };

  return (
    <div className="admin-portal">
      <h2>Admin Portal</h2>
      <form className="entry-form" onSubmit={handleSubmit}>
        <label>
          Select Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="scholarship">Scholarship</option>
            <option value="internship">Internship</option>
          </select>
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Link:
          <input type="url" value={link} onChange={(e) => setLink(e.target.value)} required />
        </label>
        <button type="submit">Add {type}</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminPortal;
