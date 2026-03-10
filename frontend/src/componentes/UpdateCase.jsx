import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import styles from './Case.module.css'; // Reusing your existing Case styles
import CaseHearings from './CaseHearings';
import CaseDocuments from './CaseDocument';
const UpdateCase = () => {
  const { id } = useParams(); // Gets the case ID from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    lawyerId: ''
  });
  const [lawyers, setLawyers] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get the current user's role to determine permissions
        const authRes = await api.get('/auth/check');
        const role = authRes.data.role;
        setUserRole(role);

        // 2. Fetch the specific case details
        const caseRes = await api.get(`/cases/${id}`);
        const caseData = caseRes.data;
        
        setFormData({
          title: caseData.title,
          description: caseData.description,
          status: caseData.status,
          // If lawyerId is populated (an object), extract the _id, otherwise use the string or empty
          lawyerId: caseData.lawyerId ? (caseData.lawyerId._id || caseData.lawyerId) : ''
        });

        // 3. If Admin/Clerk, fetch the lawyers list for the assignment dropdown
        if (role === 'admin' || role === 'clerk') {
          // Note: Adjust this to your actual lawyers endpoint if it's different!
          const lawyersRes = await api.get('/auth/lawyers'); 
          setLawyers(lawyersRes.data);
        }
      } catch (error) {
        console.log("Error fetching data", error);
        alert("Failed to load case data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send null if lawyerId is empty so the backend unassigns it properly
      const dataToSend = { ...formData, lawyerId: formData.lawyerId || null };
      await api.put(`/cases/${id}`, dataToSend);
      
      alert('Case updated successfully!');
      navigate(-1); // Go back to the previous page
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update case");
    }
  };

  if (loading) return <div className={styles.container}>Loading case details...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Update Case</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        {/* Title is only editable by Admin/Clerk. Lawyers see it as read-only */}
        <label className={styles.inputGroup}>Title:
          <input 
            className={styles.input} 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            disabled={userRole === 'lawyer'} 
            required 
          />
        </label>
        
        <label className={styles.inputGroup}>Description:
          <textarea 
            className={styles.textarea} 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </label>
        
        <label className={styles.inputGroup}>Status:
          <select className={styles.select} name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </label>

        {/* Only show Lawyer Assignment to Admins and Clerks */}
        {(userRole === 'admin' || userRole === 'clerk') && (
          <label className={styles.inputGroup}>Assigned Lawyer:
            <select className={styles.select} name="lawyerId" value={formData.lawyerId} onChange={handleChange}>
              <option value="">-- Unassigned --</option>
              {lawyers.map(lawyer => (
                <option key={lawyer._id} value={lawyer._id}>
                  {lawyer.username} ({lawyer.email})
                </option>
              ))}
            </select>
          </label>
        )}

        <button type="submit" className={styles.submitBtn}>Save Updates</button>
      </form>
      {/* Add this right before the final closing </div> in UpdateCase */}
  <CaseHearings caseId={id} userRole={userRole} />
  <CaseDocuments caseId={id} />
    </div>
  );
};

export default UpdateCase;