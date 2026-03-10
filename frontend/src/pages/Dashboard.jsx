
// // export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios.js';
// import styles from './Dashboard.module.css';

// // --- Role-Specific Dashboard Components ---

// const AdminDashboard = ({ navigate }) => (
//   <div>
//     <h1 className={styles.header}>Admin Dashboard</h1>
//     <div className={styles.grid}>
//       <div className={styles.card} onClick={() => navigate('/admin/all-users')} style={{ cursor: 'pointer' }}>
//         <h3>Manage Users</h3>
//         <p>Add, remove, or update lawyers, clerks, and judges in the system.</p>
//       </div>
//       <div className={styles.card} onClick={() => navigate('/admin/all-cases')} style={{ cursor: 'pointer' }}>
//         <h3>System Overview</h3>
//         <p>View all court cases, statuses, and system analytics.</p>
//       </div>
//     </div>
//   </div>
// );

// const ClerkDashboard = ({ navigate }) => (
//   <div>
//     <h1 className={styles.header}>Clerk Dashboard</h1>
//     <div className={styles.grid}>
//       <div className={styles.card} onClick={() => navigate('/clerk/create-case')} style={{ cursor: 'pointer' }}>
//         <h3>Case Registration</h3>
//         <p>Register new court cases and assign initial details.</p>
//       </div>
//       <div className={styles.card} onClick={() => navigate('/clerk/all-cases')} style={{ cursor: 'pointer' }}>
//         <h3>Case Management</h3>
//         <p>View all cases and update lawyer/judge assignments.</p>
//       </div>
//     </div>
//   </div>
// );

// const LawyerDashboard = ({ navigate }) => (
//   <div>
//     <h1 className={styles.header}>Lawyer Dashboard</h1>
//     <div className={styles.grid}>
//       <div className={styles.card} onClick={() => navigate('/lawyer/assigned-cases')} style={{ cursor: 'pointer' }}>
//         <h3>My Active Cases</h3>
//         <p>View and manage the court cases currently assigned to you.</p>
//       </div>
//       <div className={styles.card} onClick={() => navigate('/lawyer/hearing-date')} style={{ cursor: 'pointer' }}>
//         <h3>Hearing Schedule</h3>
//         <p>Check your upcoming court dates and hearings.</p>
//       </div>
//     </div>
//   </div>
// );

// // --- NEW: Judge Dashboard ---
// const JudgeDashboard = ({ navigate }) => (
//   <div>
//     <h1 className={styles.header}>Judge Dashboard</h1>
//     <div className={styles.grid}>
//       <div className={styles.card} onClick={() => navigate('/judge/all-cases')} style={{ cursor: 'pointer' }}>
//         <h3>My Docket</h3>
//         <p>View the court cases currently assigned to your courtroom.</p>
//       </div>
//       <div className={styles.card} onClick={() => navigate('/judge/hearings')} style={{ cursor: 'pointer' }}>
//         <h3>Hearing Schedule</h3>
//         <p>Review your upcoming hearings and court dates.</p>
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
//       {/* Pass the navigate function to the components so the cards can act as buttons */}
//       {role === "admin" && <AdminDashboard navigate={navigate} />}
//       {role === "clerk" && <ClerkDashboard navigate={navigate} />}
//       {role === "lawyer" && <LawyerDashboard navigate={navigate} />}
//       {role === "judge" && <JudgeDashboard navigate={navigate} />} {/* Added Judge logic */}
      
//       {/* Added 'judge' to the allowed roles array */}
//       {!["admin", "clerk", "lawyer", "judge"].includes(role) && (
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
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../api/axios.js';
import styles from './Dashboard.module.css';

// --- Shared Analytics Component ---
const DashboardAnalytics = ({ stats, chartData }) => {
  // Colors matching our premium UI theme
  const COLORS = { Open: '#22c55e', Pending: '#eab308', Closed: '#ef4444' };

  return (
    <div className={styles.analyticsSection}>
      {/* Number Summary Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h4>Total Cases</h4>
          <span className={styles.statNumber}>{stats.total}</span>
        </div>
        <div className={`${styles.statCard} ${styles.statOpen}`}>
          <h4>Open Cases</h4>
          <span className={styles.statNumber}>{stats.open}</span>
        </div>
        <div className={`${styles.statCard} ${styles.statPending}`}>
          <h4>Pending Cases</h4>
          <span className={styles.statNumber}>{stats.pending}</span>
        </div>
        <div className={`${styles.statCard} ${styles.statClosed}`}>
          <h4>Closed Cases</h4>
          <span className={styles.statNumber}>{stats.closed}</span>
        </div>
      </div>

      {/* The Pie Chart */}
      {stats.total > 0 && (
        <div className={styles.chartContainer}>
          <h3>Case Status Distribution</h3>
          {/* We added explicit width and height directly to ResponsiveContainer */}
          <div style={{ width: '100%', height: '300px' }}> 
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Role-Specific Navigation Components ---
const AdminDashboard = ({ navigate }) => (
  <div className={styles.grid}>
    <div className={styles.card} onClick={() => navigate('/admin/all-users')}>
      <h3>Manage Users</h3>
      <p>Add, remove, or update system personnel.</p>
    </div>
    <div className={styles.card} onClick={() => navigate('/admin/all-cases')}>
      <h3>System Directory</h3>
      <p>View all court cases and system records.</p>
    </div>
  </div>
);

const ClerkDashboard = ({ navigate }) => (
  <div className={styles.grid}>
    <div className={styles.card} onClick={() => navigate('/clerk/create-case')}>
      <h3>Case Registration</h3>
      <p>Register new court cases and assign details.</p>
    </div>
    <div className={styles.card} onClick={() => navigate('/clerk/all-cases')}>
      <h3>Case Management</h3>
      <p>View cases and update assignments.</p>
    </div>
  </div>
);

const LawyerDashboard = ({ navigate }) => (
  <div className={styles.grid}>
    <div className={styles.card} onClick={() => navigate('/lawyer/assigned-cases')}>
      <h3>My Active Cases</h3>
      <p>View and manage your assigned cases.</p>
    </div>
    <div className={styles.card} onClick={() => navigate('/lawyer/hearing-date')}>
      <h3>Hearing Schedule</h3>
      <p>Check your upcoming court dates.</p>
    </div>
  </div>
);

const JudgeDashboard = ({ navigate }) => (
  <div className={styles.grid}>
    <div className={styles.card} onClick={() => navigate('/judge/all-cases')}>
      <h3>My Docket</h3>
      <p>View cases assigned to your courtroom.</p>
    </div>
    <div className={styles.card} onClick={() => navigate('/judge/hearings')}>
      <h3>Hearing Schedule</h3>
      <p>Review your upcoming hearings.</p>
    </div>
  </div>
);

// --- Main Dashboard Wrapper ---
const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, open: 0, pending: 0, closed: 0 });
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Get User Role
        const authRes = await api.get("/auth/check");
        if (!authRes.data.role) return navigate("/login");
        setRole(authRes.data.role);

        // 2. Fetch Cases to build Analytics
        // Because of our backend security, this automatically fetches ONLY the cases 
        // belonging to this specific user (or all cases if Admin/Clerk!)
        const caseRes = await api.get("/cases");
        const cases = caseRes.data;

        const open = cases.filter(c => c.status === 'open').length;
        const pending = cases.filter(c => c.status === 'pending').length;
        const closed = cases.filter(c => c.status === 'closed').length;

        setStats({ total: cases.length, open, pending, closed });
        setChartData([
          { name: 'Open', value: open },
          { name: 'Pending', value: pending },
          { name: 'Closed', value: closed }
        ].filter(data => data.value > 0)); // Only show slice if value > 0

      } catch (error) {
        console.log("Error loading dashboard", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (isLoading) return <div className={styles.loading}>Loading your workspace...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Welcome to your Dashboard</h1>
        <p>Here is an overview of your current workspace.</p>
      </div>

      {/* 1. Show the beautiful charts & numbers first */}
      <DashboardAnalytics stats={stats} chartData={chartData} />

      <h2 style={{ marginTop: '3rem', color: '#0f172a' }}>Quick Actions</h2>

      {/* 2. Show the navigation action cards below the analytics */}
      {role === "admin" && <AdminDashboard navigate={navigate} />}
      {role === "clerk" && <ClerkDashboard navigate={navigate} />}
      {role === "lawyer" && <LawyerDashboard navigate={navigate} />}
      {role === "judge" && <JudgeDashboard navigate={navigate} />}
    </div>
  );
};

export default Dashboard;