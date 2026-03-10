import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import styles from './Dashboard.module.css';

// --- Role-Specific Dashboard Components ---

const AdminDashboard = () => (
  <div>
    <h1 className={styles.header}>Admin Dashboard</h1>
    <div className={styles.grid}>
      <div className={styles.card}>
        <h3>Manage Users</h3>
        <p>Add, remove, or update lawyers and clerks in the system.</p>
      </div>
      <div className={styles.card}>
        <h3>System Overview</h3>
        <p>View total cases, resolved cases, and system analytics.</p>
      </div>
    </div>
  </div>
);

const ClerkDashboard = () => (
  <div>
    <h1 className={styles.header}>Clerk Dashboard</h1>
    <div className={styles.grid}>
      <div className={styles.card}>
        <h3>Case Registration</h3>
        <p>Register new court cases and assign initial details.</p>
      </div>
      <div className={styles.card}>
        <h3>Case Assignment</h3>
        <p>Assign registered cases to available lawyers.</p>
      </div>
    </div>
  </div>
);

const LawyerDashboard = () => (
  <div>
    <h1 className={styles.header}>Lawyer Dashboard</h1>
    <div className={styles.grid}>
      <div className={styles.card}>
        <h3>My Active Cases</h3>
        <p>View and manage the court cases currently assigned to you.</p>
      </div>
      <div className={styles.card}>
        <h3>Case Updates</h3>
        <p>Update case statuses, add descriptions, and upload documents.</p>
      </div>
    </div>
  </div>
);


// --- Main Dashboard Wrapper ---

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await api.get("/auth/check");
        if (res.data.role) {
          setRole(res.data.role);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("Not authenticated, redirecting...");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [navigate]);

  if (isLoading) {
    return <div className={styles.loading}>Loading your dashboard...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Conditionally render the correct dashboard based on the role */}
      {role === "admin" && <AdminDashboard />}
      {role === "clerk" && <ClerkDashboard />}
      {role === "lawyer" && <LawyerDashboard />}
      
      {/* Fallback just in case an unknown role slips through */}
      {!["admin", "clerk", "lawyer"].includes(role) && (
        <div className={styles.header}>
          <h1>Error</h1>
          <p>Invalid user role detected. Please contact support.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;