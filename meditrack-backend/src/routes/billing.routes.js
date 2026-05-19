const express = require("express");
const router = express.Router();
const pool = require("../config/db");

/* =========================
   CREATE BILL
========================= */
router.post("/", async (req, res) => {
  try {
    const { patient_id, patient_name, amount } = req.body;

    if (!patient_name || !amount) {
      return res.status(400).json({
        message: "Patient name and amount required",
      });
    }

    const result = await pool.query(
      `INSERT INTO billing (patient_id, patient_name, amount)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [patient_id || null, patient_name, amount]
    );

    res.json({
      message: "Invoice created successfully ✅",
      data: result.rows[0],
    });

  } catch (err) {
    console.error("BILLING ERROR:", err);
    res.status(500).json({
      message: err.message || "Billing failed ❌",
    });
  }
});

/* =========================
   GET ALL BILLS
========================= */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM billing ORDER BY created_at DESC"
    );

    res.json({ data: result.rows });

  } catch (err) {
    console.error("FETCH BILL ERROR:", err);
    res.status(500).json({
      message: "Failed to fetch bills",
    });
  }
});

module.exports = router;