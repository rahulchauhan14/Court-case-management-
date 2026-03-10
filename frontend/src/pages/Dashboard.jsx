// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios.js';
// import styles from './Dashboard.module.css';

// // --- Role-Specific Dashboard Components ---

// const AdminDashboard = () => (
//   <div>
//     <h1 className={styles.header}>Admin Dashboard</h1>
//     <div className={styles.grid}>
//       <div className={styles.card}>
//         <h3>Manage Users</h3>
//         <p>Add, remove, or update lawyers and clerks in the system.</p>
//       </div>
//       <div className={styles.card}>
//         <h3>System Overview</h3>
//         <p>View total cases, resolved cases, and system analytics.</p>
//       </div>
//     </div>
//   </div>
// );

// const ClerkDashboard = () => (
//   <div>
//     <h1 className={styles.header}>Clerk Dashboard</h1>
//     <div className={styles.grid}>
//       <div className={styles.card}>
//         <h3>Case Registration</h3>
//         <p>Register new court cases and assign initial details.</p>
//       </div>
//       <div className={styles.card}>
//         <h3>Case Assignment</h3>
//         <p>Assign registered cases to available lawyers.</p>
//       </div>
//     </div>
//   </div>
// );

// const LawyerDashboard = () => (
//   <div>
//     <h1 className={styles.header}>Lawyer Dashboard</h1>
//     <div className={styles.grid}>
//       <div className={styles.card}>
//         <h3>My Active Cases</h3>
//         <p>View and manage the court cases currently assigned to you.</p>
//       </div>
//       <div className={styles.card}>
//         <h3>Case Updates</h3>
//         <p>Update case statuses, add descriptions, and upload documents.</p>
//       </div>
//     </div>
//   </div>
// );


// // --- Main Dashboard Wrapper ---

// const Dashboard = () => {
//   const [role, setRole] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const res = await api.get("/auth/check");
//         if (res.data.role) {
//           setRole(res.data.role);
//         } else {
//           navigate("/login");
//         }
//       } catch (error) {
//         console.log("Not authenticated, redirecting...");
//         navigate("/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserRole();
//   }, [navigate]);

//   if (isLoading) {
//     return <div className={styles.loading}>Loading your dashboard...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       {/* Conditionally render the correct dashboard based on the role */}
//       {role === "admin" && <AdminDashboard />}
//       {role === "clerk" && <ClerkDashboard />}
//       {role === "lawyer" && <LawyerDashboard />}
      
//       {/* Fallback just in case an unknown role slips through */}
//       {!["admin", "clerk", "lawyer"].includes(role) && (
//         <div className={styles.header}>
//           <h1>Error</h1>
//           <p>Invalid user role detected. Please contact support.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import styles from './Dashboard.module.css';

// --- Role-Specific Dashboard Components ---

const AdminDashboard = ({ navigate }) => (
  <div>
    <h1 className={styles.header}>Admin Dashboard</h1>
    <div className={styles.grid}>
      <div className={styles.card} onClick={() => navigate('/admin/all-users')} style={{ cursor: 'pointer' }}>
        <h3>Manage Users</h3>
        <p>Add, remove, or update lawyers, clerks, and judges in the system.</p>
      </div>
      <div className={styles.card} onClick={() => navigate('/admin/all-cases')} style={{ cursor: 'pointer' }}>
        <h3>System Overview</h3>
        <p>View all court cases, statuses, and system analytics.</p>
      </div>
    </div>
  </div>
);

const ClerkDashboard = ({ navigate }) => (
  <div>
    <h1 className={styles.header}>Clerk Dashboard</h1>
    <div className={styles.grid}>
      <div className={styles.card} onClick={() => navigate('/clerk/create-case')} style={{ cursor: 'pointer' }}>
        <h3>Case Registration</h3>
        <p>Register new court cases and assign initial details.</p>
      </div>
      <div className={styles.card} onClick={() => navigate('/clerk/all-cases')} style={{ cursor: 'pointer' }}>
        <h3>Case Management</h3>
        <p>View all cases and update lawyer/judge assignments.</p>
      </div>
    </div>
  </div>
);

const LawyerDashboard = ({ navigate }) => (
  <div>
    <h1 className={styles.header}>Lawyer Dashboard</h1>
    <div className={styles.grid}>
      <div className={styles.card} onClick={() => navigate('/lawyer/assigned-cases')} style={{ cursor: 'pointer' }}>
        <h3>My Active Cases</h3>
        <p>View and manage the court cases currently assigned to you.</p>
      </div>
      <div className={styles.card} onClick={() => navigate('/lawyer/hearing-date')} style={{ cursor: 'pointer' }}>
        <h3>Hearing Schedule</h3>
        <p>Check your upcoming court dates and hearings.</p>
      </div>
    </div>
  </div>
);

// --- NEW: Judge Dashboard ---
const JudgeDashboard = ({ navigate }) => (
  <div>
    <h1 className={styles.header}>Judge Dashboard</h1>
    <div className={styles.grid}>
      <div className={styles.card} onClick={() => navigate('/judge/all-cases')} style={{ cursor: 'pointer' }}>
        <h3>My Docket</h3>
        <p>View the court cases currently assigned to your courtroom.</p>
      </div>
      <div className={styles.card} onClick={() => navigate('/judge/hearings')} style={{ cursor: 'pointer' }}>
        <h3>Hearing Schedule</h3>
        <p>Review your upcoming hearings and court dates.</p>
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
      {/* Pass the navigate function to the components so the cards can act as buttons */}
      {role === "admin" && <AdminDashboard navigate={navigate} />}
      {role === "clerk" && <ClerkDashboard navigate={navigate} />}
      {role === "lawyer" && <LawyerDashboard navigate={navigate} />}
      {role === "judge" && <JudgeDashboard navigate={navigate} />} {/* Added Judge logic */}
      
      {/* Added 'judge' to the allowed roles array */}
      {!["admin", "clerk", "lawyer", "judge"].includes(role) && (
        <div className={styles.header}>
          <h1>Error</h1>
          <p>Invalid user role detected. Please contact support.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;