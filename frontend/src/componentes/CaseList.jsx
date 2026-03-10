import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import styles from './Case.module.css';
import { useNavigate } from 'react-router-dom';
const CaseList = ({ title }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await api.get('/cases');
        setCases(res.data);
      } catch (error) {
        console.log("Failed to fetch cases", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  if (loading) return <div className={styles.container}>Loading cases...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{title || "Court Cases"}</h2>
      
      {cases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        cases.map((courtCase) => (
          <div key={courtCase._id} className={styles.caseCard}>
            <div className={styles.caseHeader}>
              <h3>Case #{courtCase.caseNumber}: {courtCase.title}</h3>
              <span className={styles.status}>{courtCase.status}</span>
            </div>
            <p><strong>Judge:</strong> {courtCase.judgeName}</p>
            <p><strong>Lawyer:</strong> {courtCase.lawyerId ? courtCase.lawyerId.username : "Unassigned"}</p>
            <p>{courtCase.description}</p>
            {/* You can add a Link here to view details/update the case later */}
            <button 
              className={styles.submitBtn} // You can reuse this class or make a new one
               style={{ marginTop: '10px' }}
              onClick={() => navigate(`../case-update/${courtCase._id}`)}
            >
            Edit Case
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CaseList;