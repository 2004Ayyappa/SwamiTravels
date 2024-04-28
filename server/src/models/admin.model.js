const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
  name: String,
  email: String,
  password: String,
});
const AdminModel = model("admin", AdminSchema);

module.exports = AdminModel;