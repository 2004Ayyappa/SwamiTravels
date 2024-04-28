// DashboardLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/DashboardLayout.css'; // Import CSS file for styling
const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <nav className="sidebar">
        <Link to="/dashboard">
        <h2>Admin Dashboard</h2></Link>
        <ul>
          <li><Link to="/busmanagement">Bus Management</Link></li>
          <li><Link to="/citymanagement">City Management</Link></li>
          <li><Link to="/usermanagement">User Management</Link></li>
          {/* Add more navigation links as needed */}
        </ul>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ul><li><Link to="/signin">Logout</Link></li></ul>
      </nav>
      <main className="content">
        {children}
        
      </main>
      
    </div>
  );
};

export default DashboardLayout;
