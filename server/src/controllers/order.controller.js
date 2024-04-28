const express = require("express");
const BusModel = require("../models/bus.model");
const Order = require("../models/order.model");
const moment = require("moment");
const app = express.Router();
const User =require("../models/user.model");
app.post("/", async (req, res) => {
   console.log("body", req.body);
  try {
    const order = await Order.create({ ...req.body });
    let ticketdata =
      req.body.ticketSummary.date +
      "@" +
      req.body.ticketSummary.ticket +
      "@" +
      req.body.userDetails.gender;
     console.log(ticketdata);
    let filter = { _id: req.body.bus };
    let update = { $push: { seats: ticketdata } };
    const busUpdate = await BusModel.findOneAndUpdate(filter, update);
    return res.status(201).json(order);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/myticket", async (req, res) => {
  try {
    const order = await Order.find({ user: req.body.id });
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.delete("/oneorder/:id", async (req, res) => {
  let id = req.params.id.split(":")[1];
   console.log(id);
  try {
    const order = await Order.findOneAndDelete({ user: id });
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/myticket/today", async (req, res) => {

  const date = JSON.stringify(new Date()).split("T")[0].split('"')[1];
  try {
    const order = await Order.find({ user: req.body.id });
     console.log(order);
    let data = order.filter((ele) => {
      let orderDate = JSON.stringify(ele.ticketSummary.date)
        .split("T")[0]
        .split('"')[1];
      if (orderDate === date) {
        return ele;
      }
    });
    console.log(data);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/myticket/upcoming", async (req, res) => {
  const currentDate = new Date();
  try {
    const order = await Order.find({
      "ticketSummary.date": { $gt: new Date(currentDate) },
    });
     console.log("checking upcoming");
    console.log(order);
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/myticket/past", async (req, res) => {
  const currentDate = JSON.stringify(new Date()).split("T")[0].split('"')[1];
  try {
    const order = await Order.find({
      "ticketSummary.date": { $lt: new Date(currentDate) },
    });
    console.log("checking past");
     console.log(order);
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

// Route to get the count of all users
app.get("/count", async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();
    res.status(200).json({ count: orderCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/count/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the bookings associated with the user
    const bookings = await Order.find({ user: userId });

    // Count the number of bookings
    const count = bookings.length;

    // Send the booking count in the response
    res.json({ count });
  } catch (error) {
    console.error('Error fetching booking count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
