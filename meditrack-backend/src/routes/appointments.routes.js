const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const sendMail = require("../utils/mailer");

/* =========================
   CREATE APPOINTMENT (PUBLIC)
========================= */
router.post("/", async (req, res) => {
  try {
    let {
      patient_id,
      patient_name,
      email,
      doctor_name,
      department,
      appointment_date,
      appointment_time,
    } = req.body;

    /* =========================
       VALIDATION
    ============================ */
    if (
      !patient_name ||
      !email ||
      !doctor_name ||
      !department ||
      !appointment_date ||
      !appointment_time
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    /* =========================
       SAFE patient_id
    ============================ */
    if (!patient_id || isNaN(patient_id)) {
      patient_id = null;
    } else {
      patient_id = parseInt(patient_id);
    }

    /* =========================
       SAVE TO DATABASE
    ============================ */
    const result = await pool.query(
      `INSERT INTO appointments 
      (patient_id, patient_name, email, doctor_name, department, appointment_date, appointment_time)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        patient_id,
        patient_name,
        email,
        doctor_name,
        department,
        appointment_date,
        appointment_time,
      ]
    );

    /* =========================
       EMAIL TEMPLATE
    ============================ */
    const patientEmailHTML = `
    <div style="font-family: Arial, sans-serif; padding:20px;">
      <h2>Appointment Confirmation</h2>
      <p>Dear ${patient_name}, your appointment is booked successfully.</p>
      <p><strong>Doctor:</strong> ${doctor_name}</p>
      <p><strong>Department:</strong> ${department}</p>
      <p><strong>Date:</strong> ${appointment_date}</p>
      <p><strong>Time:</strong> ${appointment_time}</p>
    </div>
    `;

    /* =========================
       SEND EMAILS (NON-BLOCKING ✅ FAST)
    ============================ */
    sendMail(
      email,
      "MediTrack Hospital | Appointment Confirmation",
      patientEmailHTML
    ).catch(err => console.error("Email Error:", err));

    sendMail(
      process.env.EMAIL_USER,
      "New Appointment Alert",
      `New appointment for ${patient_name}`
    ).catch(err => console.error("Email Error:", err));

    /* =========================
       RESPONSE
    ============================ */
    res.json({
      message: "Appointment booked successfully ✅",
      data: result.rows[0],
    });

  } catch (err) {
    console.error("APPOINTMENT ERROR:", err);
    res.status(500).json({
      message: err.message || "Booking failed",
    });
  }
});

/* =========================
   GET ALL APPOINTMENTS (ADMIN) ✅ FIXED
========================= */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM appointments ORDER BY appointment_date DESC"
    );

    res.json({
      data: result.rows,
    });

  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({
      message: "Failed to fetch appointments",
    });
  }
});

module.exports = router;