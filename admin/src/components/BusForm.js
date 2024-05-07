
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/BusManagement.css'; // Import CSS file for styling
import DashboardLayout from './DashboardLayout';
 function BusForm() {
  const [buses, setBuses] = useState([]);
  const [newBusData, setNewBusData] = useState({
    companyname: '',
    from: '',
    to: '',
    price: 0,
    email: '',
    phone: '',
    amenities: '',
    rating: 0,
    arrival: '',
    departure: '',
    seats: []
  });

  useEffect(() => {
    fetchAllBuses();
  }, []);

  const fetchAllBuses = async () => {
    try {
      const response = await axios.post('https://swamitravels-api.onrender.com/bus/getall');
      if (Array.isArray(response.data)) {
        setBuses(response.data);
      } else {
        console.error('Data received from server is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching buses:', error.message);
    }
  };

  const addNewBus = async () => {
    try {
      const response = await axios.post('https://swamitravels-api.onrender.com/bus/addnew', newBusData);
      if (response.data && typeof response.data === 'object') {
        setBuses([...buses, response.data]);
        setNewBusData({
          companyname: '',
          from: '',
          to: '',
          price: 0,
          email: '',
          phone: '',
          amenities: '',
          rating: 0,
          arrival: '',
          departure: '',
          seats: []
        });
      } else {
        console.error('Invalid response received from server:', response.data);
      }
    } catch (error) {
      console.error('Error adding new bus:', error.message);
    }
  };

  return (
    <DashboardLayout>
    <div>
      <h2>Bus Management</h2>

      <h3>Add New Bus</h3>
      <input
        type="text"
        placeholder="Company Name"
        value={newBusData.companyname}
        onChange={(e) => setNewBusData({ ...newBusData, companyname: e.target.value })}
      />
      <input
        type="text"
        placeholder="From"
        value={newBusData.from}
        onChange={(e) => setNewBusData({ ...newBusData, from: e.target.value })}
      />
      <input
        type="text"
        placeholder="To"
        value={newBusData.to}
        onChange={(e) => setNewBusData({ ...newBusData, to: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newBusData.price}
        onChange={(e) => setNewBusData({ ...newBusData, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={newBusData.email}
        onChange={(e) => setNewBusData({ ...newBusData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={newBusData.phone}
        onChange={(e) => setNewBusData({ ...newBusData, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Amenities"
        value={newBusData.amenities}
        onChange={(e) => setNewBusData({ ...newBusData, amenities: e.target.value })}
      />
      <input
        type="number"
        placeholder="Rating"
        value={newBusData.rating}
        onChange={(e) => setNewBusData({ ...newBusData, rating: e.target.value })}
      />
      <input
        type="text"
        placeholder="Arrival Time"
        value={newBusData.arrival}
        onChange={(e) => setNewBusData({ ...newBusData, arrival: e.target.value })}
      />
      <input
        type="text"
        placeholder="Departure Time"
        value={newBusData.departure}
        onChange={(e) => setNewBusData({ ...newBusData, departure: e.target.value })}
      />

      {/* Other input fields for new bus data */}

      <button onClick={addNewBus}>Add Bus</button>

      <h3>All Buses</h3>
      <ul>
        {buses.map((bus) => (
          <li key={bus._id}>
            {bus.companyname} - {bus.from} to {bus.to}
            {/* Display other bus details as needed */}
          </li>
        ))}
      </ul>
    </div>
    </DashboardLayout>
  );
}
export default BusForm;
