const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  leaveType: { type: String, enum: ["Casual Leave", "Medical Leave"], required: true },
  startDate: Date,
  endDate: Date,
  days: Number,
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
});

module.exports = mongoose.model("Leave", leaveSchema);
