const express = require("express");
const router = express.Router();
const pool = require("../config/db");

/* =========================
   CREATE BILL
========================= */
router.post("/", async (req, res) => {
  try {
    const { patient_id, patient_name, items, total_amount } = req.body;

    const result = await pool.query(
      `INSERT INTO billing (patient_id, patient_name, items, total_amount)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [patient_id, patient_name, items, total_amount]
    );

    res.json({
      message: "Invoice saved ✅",
      data: result.rows[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Billing failed ❌" });
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
    res.status(500).json({ message: "Failed to fetch bills" });
  }
});

/* =========================
   UPDATE PAYMENT STATUS
========================= */
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const result = await pool.query(
      "UPDATE billing SET status=$1 WHERE id=$2 RETURNING *",
      [status, req.params.id]
    );

    res.json({ data: result.rows[0] });

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;