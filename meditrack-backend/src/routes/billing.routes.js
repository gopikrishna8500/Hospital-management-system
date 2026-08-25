const express = require("express");
const router = express.Router();
const pool = require("../config/db");

/* =====================================================
   GET ALL BILLING RECORDS
   GET /api/billing
===================================================== */

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        patient_name,
        amount,
        created_at
      FROM billing
      ORDER BY created_at DESC, id DESC
    `);

    res.status(200).json({
      message: "Billing records fetched successfully",
      data: result.rows,
    });
  } catch (err) {
    console.error("GET BILLING ERROR:", err);

    res.status(500).json({
      message:
        err.message || "Failed to fetch billing records",
    });
  }
});


/* =====================================================
   CREATE BILL
   POST /api/billing
===================================================== */

router.post("/", async (req, res) => {
  try {
    console.log("=================================");
    console.log("CREATE BILL REQUEST");
    console.log("BODY:", req.body);
    console.log("=================================");

    const {
      patient_id,
      patient_name,
      amount,
    } = req.body;


    /* =========================
       VALIDATE PATIENT
    ========================== */

    if (!patient_name || !String(patient_name).trim()) {
      return res.status(400).json({
        message: "Patient name is required",
      });
    }


    /* =========================
       VALIDATE AMOUNT
    ========================== */

    const numericAmount = Number(amount);

    if (
      amount === undefined ||
      amount === null ||
      amount === "" ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return res.status(400).json({
        message: "Valid billing amount is required",
      });
    }


    /* =========================
       INSERT BILL
    ========================== */

    const result = await pool.query(
      `
      INSERT INTO billing
      (
        patient_name,
        amount
      )
      VALUES ($1, $2)
      RETURNING
        id,
        patient_name,
        amount,
        created_at
      `,
      [
        String(patient_name).trim(),
        numericAmount,
      ]
    );


    /* =========================
       SUCCESS
    ========================== */

    console.log(
      "BILL CREATED:",
      result.rows[0]
    );

    res.status(201).json({
      message: "Invoice generated successfully",
      data: result.rows[0],
    });

  } catch (err) {
    console.error(
      "CREATE BILLING ERROR:",
      err
    );

    res.status(500).json({
      message:
        err.message ||
        "Failed to generate invoice",
    });
  }
});


/* =====================================================
   GET SINGLE BILL
   GET /api/billing/:id
===================================================== */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        patient_name,
        amount,
        created_at
      FROM billing
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      message: "Invoice fetched successfully",
      data: result.rows[0],
    });

  } catch (err) {
    console.error(
      "GET SINGLE BILL ERROR:",
      err
    );

    res.status(500).json({
      message:
        err.message ||
        "Failed to fetch invoice",
    });
  }
});


/* =====================================================
   DELETE BILL
   DELETE /api/billing/:id
===================================================== */

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM billing
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      message: "Invoice deleted successfully",
      data: result.rows[0],
    });

  } catch (err) {
    console.error(
      "DELETE BILL ERROR:",
      err
    );

    res.status(500).json({
      message:
        err.message ||
        "Failed to delete invoice",
    });
  }
});


module.exports = router;