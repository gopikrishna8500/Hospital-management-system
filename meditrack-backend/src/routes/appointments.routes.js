// const express = require("express");
// const router = express.Router();
// const pool = require("../config/db");
// const sendMail = require("../utils/mailer");
// const { verifyToken } = require("../middleware/auth.middleware");

// /* =========================
//    CREATE APPOINTMENT
// ========================= */
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     let {
//       patient_id,
//       patient_name,
//       email,
//       doctor_name,
//       department,
//       appointment_date,
//       appointment_time,
//     } = req.body;

//     /* =========================
//        VALIDATION (VERY IMPORTANT)
//     ============================ */

//     if (
//       !patient_name ||
//       !email ||
//       !doctor_name ||
//       !department ||
//       !appointment_date ||
//       !appointment_time
//     ) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     // 🔥 FIX: handle patient_id safely
//     if (!patient_id || isNaN(patient_id)) {
//       patient_id = null; // allow null instead of ""
//     } else {
//       patient_id = parseInt(patient_id);
//     }

//     /* =========================
//        INSERT INTO DB
//     ============================ */

//     const result = await pool.query(
//       `INSERT INTO appointments 
//       (patient_id, patient_name, email, doctor_name, department, appointment_date, appointment_time)
//       VALUES ($1,$2,$3,$4,$5,$6,$7)
//       RETURNING *`,
//       [
//         patient_id,
//         patient_name,
//         email,
//         doctor_name,
//         department,
//         appointment_date,
//         appointment_time,
//       ]
//     );

//     /* =========================
//        EMAIL TO PATIENT
//     ============================ */

//     await sendMail(
//       email,
//       "Appointment Confirmed",
//       `Hello ${patient_name},

// Your appointment is confirmed.

// Doctor: ${doctor_name}
// Department: ${department}
// Date: ${appointment_date}
// Time: ${appointment_time}

// Please visit the hospital on time.

// Thank you.`
//     );

//     /* =========================
//        EMAIL TO HOSPITAL
//     ============================ */

//     await sendMail(
//       process.env.EMAIL_USER,
//       "New Appointment Booked",
//       `New appointment booked:

// Patient: ${patient_name}
// Doctor: ${doctor_name}
// Department: ${department}
// Date: ${appointment_date}
// Time: ${appointment_time}`
//     );

//     /* =========================
//        RESPONSE
//     ============================ */

//     res.json({
//       message: "Appointment booked successfully ✅",
//       data: result.rows[0],
//     });

//   } catch (err) {
//     console.error("APPOINTMENT ERROR:", err);
//     res.status(500).json({
//       message: err.message || "Booking failed",
//     });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const pool = require("../config/db");
// const sendMail = require("../utils/mailer");
// const { verifyToken } = require("../middleware/auth.middleware");

// /* =========================
//    CREATE APPOINTMENT
// ========================= */
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     let {
//       patient_id,
//       patient_name,
//       email,
//       doctor_name,
//       department,
//       appointment_date,
//       appointment_time,
//     } = req.body;

//     /* =========================
//        VALIDATION
//     ============================ */
//     if (
//       !patient_name ||
//       !email ||
//       !doctor_name ||
//       !department ||
//       !appointment_date ||
//       !appointment_time
//     ) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     // ✅ Fix patient_id issue
//     if (!patient_id || isNaN(patient_id)) {
//       patient_id = null;
//     } else {
//       patient_id = parseInt(patient_id);
//     }

//     /* =========================
//        INSERT INTO DATABASE
//     ============================ */
//     const result = await pool.query(
//       `INSERT INTO appointments 
//       (patient_id, patient_name, email, doctor_name, department, appointment_date, appointment_time)
//       VALUES ($1,$2,$3,$4,$5,$6,$7)
//       RETURNING *`,
//       [
//         patient_id,
//         patient_name,
//         email,
//         doctor_name,
//         department,
//         appointment_date,
//         appointment_time,
//       ]
//     );

//     /* =========================
//        PROFESSIONAL EMAIL TEMPLATE
//     ============================ */

//     const patientEmailHTML = `
//     <div style="font-family: Arial, sans-serif; background:#f4f7fb; padding:20px;">
//       <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

//         <!-- HEADER -->
//         <div style="background:#0f766e; color:#fff; padding:20px; text-align:center;">
//           <h1 style="margin:0;">MediTrack Hospital</h1>
//           <p style="margin:5px 0;">Your Health, Our Responsibility</p>
//         </div>

//         <!-- BODY -->
//         <div style="padding:20px; color:#333;">
//           <h2 style="color:#0f766e;">Appointment Confirmation</h2>

//           <p>Dear <strong>${patient_name}</strong>,</p>

//           <p>
//             Greetings from <strong>MediTrack Hospital</strong> 👨‍⚕️<br/>
//             Your appointment has been successfully scheduled.
//           </p>

//           <table style="width:100%; border-collapse:collapse; margin-top:15px;">
//             <tr>
//               <td style="padding:8px; font-weight:bold;">Doctor</td>
//               <td style="padding:8px;">${doctor_name}</td>
//             </tr>
//             <tr style="background:#f9fafb;">
//               <td style="padding:8px; font-weight:bold;">Department</td>
//               <td style="padding:8px;">${department}</td>
//             </tr>
//             <tr>
//               <td style="padding:8px; font-weight:bold;">Date</td>
//               <td style="padding:8px;">${appointment_date}</td>
//             </tr>
//             <tr style="background:#f9fafb;">
//               <td style="padding:8px; font-weight:bold;">Time</td>
//               <td style="padding:8px;">${appointment_time}</td>
//             </tr>
//           </table>

//           <p style="margin-top:20px;">
//             Please arrive <strong>10 minutes early</strong> for your consultation.
//           </p>

//           <p style="font-style:italic; color:#555;">
//             "Caring for life is our highest priority. Your trust inspires us to deliver excellence every day."
//           </p>

//           <p>We wish you good health always.</p>

//           <p>
//             Warm regards,<br/>
//             <strong>MediTrack Hospital Team</strong>
//           </p>
//         </div>

//         <!-- FOOTER -->
//         <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#555;">
//           © 2026 MediTrack Hospital | Compassion • Care • Commitment
//         </div>

//       </div>
//     </div>
//     `;

//     /* =========================
//        EMAIL TO PATIENT
//     ============================ */
//     await sendMail(
//       email,
//       "MediTrack Hospital | Appointment Confirmation",
//       patientEmailHTML
//     );

//     /* =========================
//        EMAIL TO HOSPITAL
//     ============================ */
//     const hospitalEmailHTML = `
//     <div style="font-family: Arial; padding:20px;">
//       <h2 style="color:#0f766e;">New Appointment Booked</h2>

//       <p>A new appointment has been scheduled.</p>

//       <ul>
//         <li><strong>Patient:</strong> ${patient_name}</li>
//         <li><strong>Email:</strong> ${email}</li>
//         <li><strong>Doctor:</strong> ${doctor_name}</li>
//         <li><strong>Department:</strong> ${department}</li>
//         <li><strong>Date:</strong> ${appointment_date}</li>
//         <li><strong>Time:</strong> ${appointment_time}</li>
//       </ul>

//       <p>Please manage the schedule accordingly.</p>
//     </div>
//     `;

//     await sendMail(
//       process.env.EMAIL_USER,
//       "New Appointment Alert",
//       hospitalEmailHTML
//     );

//     /* =========================
//        RESPONSE
//     ============================ */
//     res.json({
//       message: "Appointment booked successfully ✅",
//       data: result.rows[0],
//     });

//   } catch (err) {
//     console.error("APPOINTMENT ERROR:", err);
//     res.status(500).json({
//       message: err.message || "Booking failed",
//     });
//   }
// });

// module.exports = router;










const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const sendMail = require("../utils/mailer");
const { verifyToken } = require("../middleware/auth.middleware");

/* =========================
   CREATE APPOINTMENT
========================= */
router.post("/", verifyToken, async (req, res) => {
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

    // ✅ FIX patient_id issue
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
       EMAIL TEMPLATE (FINAL FIXED)
    ============================ */
    const patientEmailHTML = `
<div style="font-family: Arial, sans-serif; background:#f4f7fb; padding:20px;">
  <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

    <!-- HEADER -->
    <div style="text-align:center; padding:20px; background:#0f766e; color:white;">
      <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" width="60"/>
      <h2 style="margin:10px 0 5px;">MediTrack Hospital</h2>
      <p style="margin:0;">Your Health, Our Responsibility</p>
    </div>

    <!-- BODY -->
    <div style="padding:20px; color:#333;">
      <h2 style="color:#0f766e;">Appointment Confirmation</h2>

      <p>Dear <strong>${patient_name}</strong>,</p>

      <p>
        Greetings from <strong>MediTrack Hospital</strong> 👨‍⚕️<br/>
        Your appointment has been successfully scheduled.
      </p>

      <table style="width:100%; border-collapse:collapse; margin-top:15px;">
        <tr>
          <td style="padding:8px; font-weight:bold;">Doctor</td>
          <td style="padding:8px;">${doctor_name}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:8px; font-weight:bold;">Department</td>
          <td style="padding:8px;">${department}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Date</td>
          <td style="padding:8px;">${appointment_date}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:8px; font-weight:bold;">Time</td>
          <td style="padding:8px;">${appointment_time}</td>
        </tr>
      </table>

      <p style="margin-top:20px;">
        Please arrive <strong>10 minutes early</strong> for your consultation.
      </p>

      <p style="font-style:italic; color:#555;">
        "Caring for life is our highest priority. Your trust inspires us to deliver excellence every day."
      </p>

      <p>We wish you good health always.</p>

      <p>
        Warm regards,<br/>
        <strong>MediTrack Hospital Team</strong>
      </p>
    </div>

    <!-- FOOTER -->
    <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#555;">
      © 2026 MediTrack Hospital | Compassion • Care • Commitment
    </div>

  </div>
</div>
`;

    /* =========================
       SEND EMAIL TO PATIENT
    ============================ */
    await sendMail(
      email,
      "MediTrack Hospital | Appointment Confirmation",
      patientEmailHTML
    );

    /* =========================
       SEND EMAIL TO HOSPITAL
    ============================ */
    const hospitalEmailHTML = `
    <div style="font-family: Arial; padding:20px;">
      <h2 style="color:#0f766e;">New Appointment Booked</h2>

      <p>A new appointment has been scheduled.</p>

      <ul>
        <li><strong>Patient:</strong> ${patient_name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Doctor:</strong> ${doctor_name}</li>
        <li><strong>Department:</strong> ${department}</li>
        <li><strong>Date:</strong> ${appointment_date}</li>
        <li><strong>Time:</strong> ${appointment_time}</li>
      </ul>

      <p>Please manage the schedule accordingly.</p>
    </div>
    `;

    await sendMail(
      process.env.EMAIL_USER,
      "New Appointment Alert",
      hospitalEmailHTML
    );

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

module.exports = router;