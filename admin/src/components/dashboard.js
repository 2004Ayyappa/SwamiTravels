import React, { useState, useEffect } from "react";
import axios from "axios";

import {BiBus,BiBuildings} from "react-icons/bi";// Import required icons
import "../Styles/DashboardLayout.css"; // Import professional CSS styling
import { BsPeopleFill, BsCardList } from "react-icons/bs";
import DashboardLayout from "./DashboardLayout";
const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [busCount, setBusCount] = useState(0);
  const [cityCount, setCityCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    fetchUserCount();
    fetchBusCount();
    fetchCityCount();
    fetchOrderCount();
  }, []);

  const fetchUserCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/count");
      setUserCount(response.data.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  const fetchBusCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/bus/count");
      setBusCount(response.data.count);
    } catch (error) {
      console.error("Error fetching bus count:", error);
    }
  };

  const fetchCityCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/city/count");
      setCityCount(response.data.count);
    } catch (error) {
      console.error("Error fetching city count:", error);
    }
  };

  const fetchOrderCount = async () => {
    try {
        const response = await axios.get("http://localhost:8080/order/count");
        setOrderCount(response.data.count);
      } catch (error) {
        console.error("Error fetching city count:", error);
      }
  };

  return (
    <div className="dashboard">
        <DashboardLayout/>
      <div className="dashboard-item">
        <BsPeopleFill className="dashboard-icon" />
        <div className="dashboard-info">
          <h2>Total Users Registered</h2>
          <p>{userCount}</p>
        </div>
      </div>
      <div className="dashboard-item">
        <BiBus className="dashboard-icon" />
        <div className="dashboard-info">
          <h2>Total Buses Available</h2>
          <p>{busCount}</p>
        </div>
      </div>
      <div className="dashboard-item">
        <BiBuildings className="dashboard-icon" />
        <div className="dashboard-info">
          <h2>Total Cities Available</h2>
          <p>{cityCount}</p>
        </div>
      </div>
      <div className="dashboard-item">
        <BsCardList className="dashboard-icon" />
        <div className="dashboard-info">
          <h2>Total Orders</h2>
          <p>{orderCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
