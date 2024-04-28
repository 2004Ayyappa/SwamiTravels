import React, { useState, useEffect } from "react";
import axios from "axios";
import {  error } from "../Utils/notification"; // Import success and error functions
import "../Styles/CityManagement.css";
import CityForm from '././CityForm';
import DashboardLayout from "./DashboardLayout";
const CityManagement = () => {
  const [cities, setCities] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedState, setUpdatedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/city");
      setCities(response.data);
    } catch (err) {
      console.error("Error fetching cities:", err);
      error("Failed to fetch cities. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/city/deleteCity/${id}`);
      alert("City deleted successfully");
      fetchData(); // Refresh the list of cities after deletion
    } catch (err) {
      console.error("Error deleting city:", err);
      error("Failed to delete city. Please try again later.");
    }
  };

  const handleUpdate = async (id) => {
    if (!updatedName.trim() || !updatedState.trim()) {
      alert("Please fill out all fields");
      return;
    }
    try {
      await axios.put(`http://localhost:8080/city/updateCity/${id}`, {
        name: updatedName,
        state: updatedState,
      });
      alert("City updated successfully");
      setUpdatedName("");
      setUpdatedState("");
      setSelectedCity(null);
      fetchData(); // Refresh the list of cities after updating
    } catch (err) {
      console.error("Error updating city:", err);
      error("Failed to update city. Please try again later.");
    }
  };

  return (
    <DashboardLayout>
    <div className="city-management">
      <h2>Add New Cities</h2>
      <CityForm/>
      
      {/* Update Form */}
      {selectedCity && (
        <div> 
          <h3>Update City</h3>
          <input
            type="text"
            placeholder="New City Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="text"
            placeholder="New State"
            value={updatedState}
            onChange={(e) => setUpdatedState(e.target.value)}
          />
          <button onClick={() => handleUpdate(selectedCity._id)}>Update</button>
        </div>
      )}
      <h2>List of Cities</h2>
      <table className="city-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city._id}>
              <td>{city.name}</td>
              <td>{city.state}</td>
              <td>
                <button onClick={() => handleDelete(city._id)}>Delete</button>
                <button onClick={() => setSelectedCity(city)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </DashboardLayout>
  );
  
};

export default CityManagement;
