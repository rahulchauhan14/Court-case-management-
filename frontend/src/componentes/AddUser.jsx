import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import styles from './User.module.css'; // Reusing the same CSS module

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'lawyer' // Defaulting to lawyer
  });
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const navigate = useNavigate();

  // Fetch the current logged-in user's role so we can restrict the dropdown options
  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await api.get("/auth/check");
        setCurrentUserRole(res.data.role);
      } catch (error) {
        console.log("Failed to check role");
      }
    };
    checkRole();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/addUser', formData);
      alert(`${formData.role} added successfully!`);
      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New User</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <label className={styles.inputGroup}>Name:
          <input className={styles.input} type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        
        <label className={styles.inputGroup}>Email:
          <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        
        <label className={styles.inputGroup}>Password:
          <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>

        {/* <label className={styles.inputGroup}>Role:
          <select className={styles.input} name="role" value={formData.role} onChange={handleChange}>
            <option value="lawyer">Lawyer</option>
            <option value="clerk">Clerk</option> */}
            {/* Only show the Admin option if the person creating the user is an Admin */}
            {/* {currentUserRole === 'admin' && <option value="admin">Admin</option>}
          </select>
        </label> */}
        <label className={styles.inputGroup}>Role:
  <select className={styles.input} name="role" value={formData.role} onChange={handleChange}>
    <option value="lawyer">Lawyer</option>
    <option value="clerk">Clerk</option>
    {/* Admins can create Admins and Judges */}
    {currentUserRole === 'admin' && (
      <>
        <option value="admin">Admin</option>
        <option value="judge">Judge</option>
      </>
    )}
  </select>
</label>
        <button type="submit" className={styles.submitBtn}>Register User</button>
      </form>
    </div>
  );
};

export default AddUser;