
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
    price:'' ,
    email: '',
    phone: '',
    rating: '',
    arrival: '',
    departure: '',
    seats: []
  });

  useEffect(() => {
    fetchAllBuses();
    
  }, []);

  const fetchAllBuses = async () => {
    try {
      const response = await axios.post('https://swamitravels-bbxl.onrender.com/bus/getall');
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
      const response = await axios.post('https://swamitravels-bbxl.onrender.com/bus/addnew', newBusData);
      if (response.data && typeof response.data === 'object') {
        setBuses([...buses, response.data]);
        setNewBusData({
          companyname: '',
          from: '',
          to: '',
          price: 0,
          email: '',
          phone: '',
          rating: 0,
          arrival: '',
          departure: '',
          seats: []
        });
        alert("Bus added successfully");
        
      } else {
        console.error('Invalid response received from server:', response.data);
      }
    } catch (error) {
      console.error('Error adding new bus:', error.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBusData({ ...newBusData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    addNewBus(); // Call addNewBus function to add the new bus
  };


  return (
  <DashboardLayout>
    
    <div >
        <center>
        <h2>Add New Buses</h2>
        </center>
      <form onSubmit={handleSubmit} className="new-bus-form">
     
        <div className="form-group">
          <input
            type="text"
            name="companyname"
            placeholder="Company Name"
            value={newBusData.companyname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="from"
            placeholder="From"
            value={newBusData.from}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="to"
            placeholder="To"
            value={newBusData.to}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newBusData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newBusData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newBusData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={newBusData.rating}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="arrival"
            placeholder="Arrival Time"
            value={newBusData.arrival}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="departure"
            placeholder="Departure Time"
            value={newBusData.departure}
            onChange={handleInputChange}
            required
          />
        </div>

         
<center><button type="submit">Add Bus</button>
</center>
      </form>
    </div>
    </DashboardLayout>
  );
}

export default BusForm;

