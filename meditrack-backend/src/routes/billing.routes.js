const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { patient_name, amount } = req.body;

    if (!patient_name || !amount) {
      return res.status(400).json({
        message: "Missing data",
      });
    }

    const result = await pool.query(
      "INSERT INTO billing (patient_name, amount) VALUES ($1, $2) RETURNING *",
      [patient_name, Number(amount)]
    );

    res.json({
      message: "Success",
      data: result.rows[0],
    });

  } catch (err) {
    console.error("ERROR:", err.message);

    res.status(500).json({
      message: err.message, // 👈 VERY IMPORTANT
    });
  }
});

module.exports = router;