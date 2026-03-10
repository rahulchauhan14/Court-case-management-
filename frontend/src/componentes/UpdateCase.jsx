
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import styles from './Case.module.css'; 
import CaseHearings from './CaseHearings';
import CaseDocuments from './CaseDocument';

const UpdateCase = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    lawyerId: '',
    judgeId: '' // <-- Added judgeId to state
  });
  
  const [lawyers, setLawyers] = useState([]);
  const [judges, setJudges] = useState([]); // <-- Added state for judges
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
          // Extract _id if populated, otherwise use the raw ID or empty string
          lawyerId: caseData.lawyerId ? (caseData.lawyerId._id || caseData.lawyerId) : '',
          judgeId: caseData.judgeId ? (caseData.judgeId._id || caseData.judgeId) : '' // <-- Handle judgeId
        });

        // 3. If Admin/Clerk, fetch BOTH lawyers and judges lists for the assignment dropdowns
        if (role === 'admin' || role === 'clerk') {
          const [lawyersRes, judgesRes] = await Promise.all([
            api.get('/auth/lawyers'),
            api.get('/auth/judges')
          ]);
          setLawyers(lawyersRes.data);
          setJudges(judgesRes.data);
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
      // Send null if IDs are empty strings so the backend unassigns them properly
      const dataToSend = { 
        ...formData, 
        lawyerId: formData.lawyerId || null,
        judgeId: formData.judgeId || null 
      };
      
      await api.put(`/cases/${id}`, dataToSend);
      
      alert('Case updated successfully!');
      navigate(-1); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update case");
    }
  };

  if (loading) return <div className={styles.container}>Loading case details...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Update Case</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        {/* Title is only editable by Admin/Clerk. Lawyers/Judges see it as read-only */}
        <label className={styles.inputGroup}>Title:
          <input 
            className={styles.input} 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            disabled={userRole === 'lawyer' || userRole === 'judge'} 
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

        {/* Only show Assignment dropdowns to Admins and Clerks */}
        {(userRole === 'admin' || userRole === 'clerk') && (
          <>
            <label className={styles.inputGroup}>Assigned Judge:
              <select className={styles.select} name="judgeId" value={formData.judgeId} onChange={handleChange}>
                <option value="">-- Unassigned --</option>
                {judges.map(judge => (
                  <option key={judge._id} value={judge._id}>
                    Hon. {judge.username}
                  </option>
                ))}
              </select>
            </label>

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
          </>
        )}

        <button type="submit" className={styles.submitBtn}>Save Updates</button>
      </form>

      {/* Embedded Components for Hearings and Documents */}
      <CaseHearings caseId={id} userRole={userRole} />
      <CaseDocuments caseId={id} />
    </div>
  );
};

export default UpdateCase;