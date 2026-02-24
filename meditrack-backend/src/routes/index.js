const express = require("express");
const router = express.Router();
const db = require("../config/db");

const authRoutes = require("../modules/auth/auth.routes"); // 👈 ADD THIS

router.use("/auth", authRoutes); // 👈 ADD THIS

router.get("/health", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({
      message: "MediTrack Backend Running",
      dbTime: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

module.exports = router;
