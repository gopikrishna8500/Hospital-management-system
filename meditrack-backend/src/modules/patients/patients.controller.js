const pool = require("../../config/db");

/* =========================
   CREATE PATIENT
========================= */
exports.createPatient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      phone,
      email,
      address,
      blood_group,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO patients 
      (first_name, last_name, gender, date_of_birth, phone, email, address, blood_group)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        first_name,
        last_name,
        gender,
        date_of_birth,
        phone,
        email,
        address,
        blood_group,
      ]
    );

    res.status(201).json({
      message: "Patient created successfully",
      patient: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL PATIENTS (Pagination)
========================= */
exports.getPatients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT * FROM patients
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({
      page,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE PATIENT
========================= */
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE patients
       SET first_name=$1, last_name=$2, gender=$3,
           date_of_birth=$4, phone=$5,
           email=$6, address=$7, blood_group=$8
       WHERE id=$9
       RETURNING *`,
      [
        req.body.first_name,
        req.body.last_name,
        req.body.gender,
        req.body.date_of_birth,
        req.body.phone,
        req.body.email,
        req.body.address,
        req.body.blood_group,
        id,
      ]
    );

    res.json({
      message: "Patient updated",
      patient: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE PATIENT
========================= */
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM patients WHERE id=$1", [id]);

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};