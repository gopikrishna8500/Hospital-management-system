const express = require("express");
const router = express.Router();

const pool = require("../../config/db");

/* =====================================================
   GET ALL BEDS
===================================================== */

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM beds
      ORDER BY id ASC
    `);

    res.json({
      data: result.rows,
    });
  } catch (error) {
    console.error("GET BEDS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch beds",
    });
  }
});


/* =====================================================
   GET SINGLE BED
===================================================== */

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM beds
      WHERE id = $1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Bed not found",
      });
    }

    res.json({
      data: result.rows[0],
    });
  } catch (error) {
    console.error("GET BED ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch bed",
    });
  }
});


/* =====================================================
   UPDATE BED STATUS
===================================================== */

router.put("/:id", async (req, res) => {
  try {
    const { status, patient_id } = req.body;

    const allowedStatuses = [
      "Available",
      "Occupied",
      "Reserved",
      "Maintenance",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid bed status",
      });
    }

    const result = await pool.query(
      `
      UPDATE beds
      SET
        status = $1,
        patient_id = $2
      WHERE id = $3
      RETURNING *
      `,
      [
        status,
        patient_id || null,
        req.params.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Bed not found",
      });
    }

    res.json({
      message: "Bed status updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE BED ERROR:", error);

    res.status(500).json({
      message: "Failed to update bed",
    });
  }
});


/* =====================================================
   DELETE BED
===================================================== */

router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM beds
      WHERE id = $1
      RETURNING *
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Bed not found",
      });
    }

    res.json({
      message: "Bed deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BED ERROR:", error);

    res.status(500).json({
      message: "Failed to delete bed",
    });
  }
});


module.exports = router;