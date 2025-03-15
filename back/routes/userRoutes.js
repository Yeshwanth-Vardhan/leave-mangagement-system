const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:userId/leaveBalance", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    casualLeaveBalance: user.casualLeaveBalance,
    medicalLeaveBalance: user.medicalLeaveBalance,
  });
});

module.exports = router;
