const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  casualLeaveBalance: { type: Number, default: 12 },
  medicalLeaveBalance: { type: Number, default: 12 },
});

module.exports = mongoose.model("User", userSchema);
