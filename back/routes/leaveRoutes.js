const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");
const User = require("../models/User");


router.post("/apply", async (req, res) => {
  const { userId, leaveType, startDate, endDate, days } = req.body;
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "User not found" });

  if (leaveType === "Casual Leave" && user.casualLeaveBalance < days) {
    return res.status(400).json({ message: "Not enough casual leave balance" });
  }

  if (leaveType === "Medical Leave" && user.medicalLeaveBalance < days) {
    return res.status(400).json({ message: "Not enough medical leave balance" });
  }

  const leave = new Leave({ userId, leaveType, startDate, endDate, days });
  await leave.save();

  if (leaveType === "Casual Leave") {
    user.casualLeaveBalance -= days;
  } else {
    user.medicalLeaveBalance -= days;
  }
  await user.save();

  res.json({ message: "Leave applied successfully" });
});

module.exports = router;
