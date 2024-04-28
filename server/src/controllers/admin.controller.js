const express = require("express");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin.model");

const app = express.Router();

app.post("/signup", async (req, res) => {
  let { email } = req.body;

  try {
    let admin = await AdminModel.findOne({ email: email });

    if (admin) {
      return res.send({
        status: "Failed",
        message: "Please try with different email",
      });
    }
    admin = await AdminModel.create(req.body);

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
    let admin = await AdminModel.findOne({ email });
    console.log(admin);
    if (!admin) {
      return res.send({ status: "Failed", message: "Please check your email" });
    }
    if (admin.password !== password) {
      return res.send({
        status: "Failed",
        message: "Please check your password",
      });
    }
    if (admin && admin.password === password) {
      const token = jwt.sign({ admin }, "1234");
      return res.send({ status: "Success", message: { admin, token } });
    }
  } catch (error) {
    return res.send({ message: error.message, status: "Failed" });
  }
});

module.exports = app;
