const express = require("express");
const router = express.Router();
const pool = require("../../config/db");

// Get Doctors
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      doctors.*,
      departments.department_name
      FROM doctors
      LEFT JOIN departments
      ON doctors.department_id=departments.id
      ORDER BY doctors.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Add Doctor
router.post("/", async (req, res) => {
  try {
    const {
      doctor_name,
      specialization,
      department_id,
      qualification,
      experience,
      phone,
      email,
      consultation_fee,
      availability,
      working_days,
      working_hours,
      photo,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO doctors
      (
      doctor_name,
      specialization,
      department_id,
      qualification,
      experience,
      phone,
      email,
      consultation_fee,
      availability,
      working_days,
      working_hours,
      photo
      )

      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)

      RETURNING *`,
      [
        doctor_name,
        specialization,
        department_id,
        qualification,
        experience,
        phone,
        email,
        consultation_fee,
        availability,
        working_days,
        working_hours,
        photo,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Update Doctor
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      doctor_name,
      specialization,
      department_id,
      qualification,
      experience,
      phone,
      email,
      consultation_fee,
      availability,
      working_days,
      working_hours,
      photo,
    } = req.body;

    const result = await pool.query(
      `UPDATE doctors
      SET
      doctor_name=$1,
      specialization=$2,
      department_id=$3,
      qualification=$4,
      experience=$5,
      phone=$6,
      email=$7,
      consultation_fee=$8,
      availability=$9,
      working_days=$10,
      working_hours=$11,
      photo=$12

      WHERE id=$13

      RETURNING *`,
      [
        doctor_name,
        specialization,
        department_id,
        qualification,
        experience,
        phone,
        email,
        consultation_fee,
        availability,
        working_days,
        working_hours,
        photo,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Delete Doctor
router.delete("/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM doctors WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Doctor Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;