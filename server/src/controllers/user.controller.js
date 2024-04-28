const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const app = express.Router();

app.post("/signup", async (req, res) => {
  let { email } = req.body;

  try {
    let user = await UserModel.findOne({ email: email });

    if (user) {
      return res.send({
        status: "Failed",
        message: "Please try with different email",
      });
    }
    user = await UserModel.create(req.body);

    return res.send({
      status: "Success",
      message: "Signup Successful",
    });
  } catch (error) {
    return res.send({ message: error.message, status: "Failed" });
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
   console.log(req.body);
  try {
    let user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.send({ status: "Failed", message: "Please check your email" });
    }
    if (user.password !== password) {
      return res.send({
        status: "Failed",
        message: "Please check your password",
      });
    }
    if (user && user.password === password) {
      const token = jwt.sign({ user }, "1234");
      return res.send({ status: "Success", message: { user, token } });
    }
  } catch (error) {
    return res.send({ message: error.message, status: "Failed" });
  }
});


// Route to fetch all registered users
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.send({ status: "Success", data: users });
  } catch (error) {
    return res.send({ message: error.message, status: "Failed" });
  }
});
// Delete users

app.delete("/deleteuser/:id", async (req, res) => {

  try {
    const userId =  req.params.id;

    // Find the city by its ID and delete it
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      // If the city with the provided ID does not exist, respond with 404
      return res.send({ status:"Failed",
      message: error.message });
    }
    return res.send({
      status: "Success",
      message: "User Deleted Successfully",
    });
  } catch (error) {
    // If an error occurs during the deletion process, respond with 500 and the error message
    res.status(500).json({ error: error.message });
  }
});

// Route to get the count of all users
app.get("/count", async (req, res) => {
  try {
    const userCount = await UserModel.countDocuments();
    res.status(200).json({ count: userCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
