import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import styles from './Case.module.css';

const CreateCase = () => {
  const [lawyers, setLawyers] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    caseNumber: '',
    title: '',
    description: '',
    judgeName: '',
    lawyerId: '' // Optional
  });

  // Fetch lawyers for the dropdown when the component loads
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        // Assuming you have a route that gets all users and you filter by role, 
        // or a specific route like GET /users/lawyers
        const res = await api.get('/users/lawyers'); 
        setLawyers(res.data);
      } catch (error) {
        console.log("Failed to fetch lawyers", error);
      }
    };
    fetchLawyers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If lawyerId is an empty string, send null so the backend handles it properly
      const dataToSend = { ...formData, lawyerId: formData.lawyerId || null };
      await api.post('/cases', dataToSend);
      alert('Case created successfully!');
      // Navigate back to dashboard (or all cases) based on role
      navigate(-1); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create case");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Register New Case</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <label className={styles.inputGroup}>Case Number:
          <input className={styles.input} type="number" name="caseNumber" value={formData.caseNumber} onChange={handleChange} required />
        </label>
        
        <label className={styles.inputGroup}>Title:
          <input className={styles.input} type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        
        <label className={styles.inputGroup}>Description:
          <textarea className={styles.textarea} name="description" value={formData.description} onChange={handleChange} required />
        </label>
        
        <label className={styles.inputGroup}>Judge Name:
          <input className={styles.input} type="text" name="judgeName" value={formData.judgeName} onChange={handleChange} required />
        </label>

        <label className={styles.inputGroup}>Assign Lawyer (Optional):
          <select className={styles.select} name="lawyerId" value={formData.lawyerId} onChange={handleChange}>
            <option value="">-- Leave Unassigned --</option>
            {lawyers.map(lawyer => (
              <option key={lawyer._id} value={lawyer._id}>
                {lawyer.username} ({lawyer.email})
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className={styles.submitBtn}>Create Case</button>
      </form>
    </div>
  );
};

export default CreateCase;