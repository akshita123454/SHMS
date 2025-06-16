import React, { useState } from 'react';
import axios from 'axios';

const CreatePatient = ({ onPatientCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/patients/', formData);
      const newPatientId = response.data._id;
      
      // Store in localStorage
      localStorage.setItem('patientId', newPatientId);
      
      setMessage('Patient created successfully!');
      
      // Send patientId to parent
      onPatientCreated(newPatientId);
    } catch (error) {
      console.error('Error creating patient:', error);
      setMessage('Error creating patient');
    }
  };

  return (
    <div>
      <h2>Create Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Create Patient</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePatient;
