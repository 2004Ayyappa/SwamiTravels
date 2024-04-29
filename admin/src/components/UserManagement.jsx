import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/UserManagement.css';
import DashboardLayout from './DashboardLayout';
import { error, success } from "../Utils/notification";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [bookingCounts, setBookingCounts] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://swamitravels-bbxl.onrender.com/user/users');
        setUsers(response.data.data); // Assuming the users array is inside the `data` property of the response
        
        // Fetch booking counts for all users
        const counts = {};
        for (const user of response.data.data) {
          const count = await fetchBookingCount(user._id);
          counts[user._id] = count;
        }
        setBookingCounts(counts);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to fetch booking count for a user
  const fetchBookingCount = async (userId) => {
    try {
      const response = await axios.get(`https://swamitravels-bbxl.onrender.com/order/count/${userId}`);
      return response.data.count;
    } catch (error) {
      console.error('Error fetching booking count:', error);
      return 0;
    }
  };

  // Function to handle user deletion
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`https://swamitravels-bbxl.onrender.com/user/deleteuser/${id}`);
      setUsers(users.filter(user => user._id !== id));
      if (response.data.status === "Failed") {
        error(response.data.message);
      } else {
        success(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h2>User Management</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Gender</th>
              <th>Booking Status</th>
              <th>Actions</th> {/* Add column for actions */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.gender}</td>
                <td>{bookingCounts[user._id]}</td> {/* Use bookingCounts to get booking count */}
                <td>
                  <button className="delete-button" onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
