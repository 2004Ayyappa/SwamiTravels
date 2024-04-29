import React, { useState, useEffect } from "react";
import axios from "axios";
import { error} from "../Utils/notification";
import "../Styles/BusManagement.css";
import DashboardLayout from "./DashboardLayout";
import { Link } from "react-router-dom";

const BusManagement = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchAllBuses();
  }, []);

  const fetchAllBuses = async () => {
    try {
      const response = await axios.get("https://swamitravels-bbxl.onrender.com/bus/getall");
      if (Array.isArray(response.data)) {
        setBuses(response.data);
      } else {
        console.error(
          "Data received from server is not an array:",
          response.data
        );
      }
    } catch (err) {
      console.error("Error fetching buses:", err.message);
      error("Failed to fetch buses. Please try again later.");
    }
  };

  const handleUpdate = async (busId, updatedFields) => {
    try {
      await axios.put(`https://swamitravels-bbxl.onrender.com/bus/update/${busId}`, updatedFields);
      alert("Updated successfully");
      // Assuming the API updates the bus details successfully
      // You may want to handle the response based on your API implementation
      // For now, just refetch all buses to update the list
      fetchAllBuses();
    } catch (err) {
      console.error("Error updating bus:", err.message);
      error("Failed to update bus details. Please try again later.");
    }
  };

  const handleDelete = async (busId) => {
    try {
      await axios.delete(`https://swamitravels-bbxl.onrender.com/bus/delete/${busId}`);
      alert("Deleted Successfully");
      fetchAllBuses();
    } catch (err) {
      console.error("Error deleting bus:", err.message);
      error("Failed to delete bus. Please try again later.");
    }
  };

  const handleChange = (busId, field, value) => {
    // Update the bus details locally before sending the update request to the server
    const updatedBuses = buses.map((bus) =>
      bus._id === busId ? { ...bus, [field]: value } : bus
    );
    setBuses(updatedBuses);
  };

  return (
    <div className="dashboard">
      <DashboardLayout />
      <div>
        <center>
          <h3>List of Buses</h3>
        </center>
        <table className="bus-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>From</th>
              <th>To</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td>{bus.companyname}</td>
                <td>
                  <input
                    type="text"
                    value={bus.from}
                    onChange={(e) => handleChange(bus._id, "from", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={bus.to}
                    onChange={(e) => handleChange(bus._id, "to", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={bus.price}
                    onChange={(e) => handleChange(bus._id, "price", e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdate(bus._id, { from: bus.from, to: bus.to, price: bus.price })}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(bus._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <center>
          <Link to="/allbuses">
            <button type="submit">Add New Buses</button>
          </Link>
        </center>
      </div>
    </div>
  );
};

export default BusManagement;
