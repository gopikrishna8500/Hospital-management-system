// const express = require("express");
// const router = express.Router();

// const pool = require("../config/db");
// const sendMail = require("../utils/mailer");
// const sendWhatsApp = require("../utils/whatsapp");

// router.post("/", async (req, res) => {
//   try {
//     let {
//       patient_id,
//       patient_name,
//       email,
//       mobile,
//       doctor_name,
//       department,
//       appointment_date,
//       appointment_time,
//     } = req.body;

//     if (
//       !patient_name ||
//       !email ||
//       !mobile ||
//       !doctor_name ||
//       !department ||
//       !appointment_date ||
//       !appointment_time
//     ) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     if (!patient_id || isNaN(patient_id)) {
//       patient_id = null;
//     } else {
//       patient_id = parseInt(patient_id);
//     }

//     const result = await pool.query(
//       `INSERT INTO appointments
//       (
//         patient_id,
//         patient_name,
//         email,
//         mobile,
//         doctor_name,
//         department,
//         appointment_date,
//         appointment_time
//       )
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
//       RETURNING *`,
//       [
//         patient_id,
//         patient_name,
//         email,
//         mobile,
//         doctor_name,
//         department,
//         appointment_date,
//         appointment_time,
//       ]
//     );

//     console.log("Appointment saved to database ✅");
//     console.log("Appointment ID:", result.rows[0].id);

//     const patientEmailHTML = `
//       <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:30px;">
//         <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;">

//           <h2 style="color:#0d9488;">
//             MediTrack Hospital
//           </h2>

//           <h3>Appointment Confirmation ✅</h3>

//           <p>
//             Dear <strong>${patient_name}</strong>,
//           </p>

//           <p>
//             Your appointment has been successfully booked.
//           </p>

//           <hr>

//           <p>
//             <strong>Doctor:</strong> ${doctor_name}
//           </p>

//           <p>
//             <strong>Department:</strong> ${department}
//           </p>

//           <p>
//             <strong>Date:</strong> ${appointment_date}
//           </p>

//           <p>
//             <strong>Time:</strong> ${appointment_time}
//           </p>

//           <p>
//             Please arrive 10 minutes before your appointment.
//           </p>

//           <br>

//           <p>
//             Thank you,<br>
//             <strong>MediTrack Hospital</strong>
//           </p>

//         </div>
//       </div>
//     `;

//     const whatsappMessage = `
// MediTrack Hospital 🏥

// Appointment Confirmed ✅

// Dear ${patient_name},

// Your appointment has been successfully booked.

// 👨‍⚕️ Doctor: ${doctor_name}
// 🏥 Department: ${department}
// 📅 Date: ${appointment_date}
// ⏰ Time: ${appointment_time}

// Please arrive 10 minutes before your appointment.

// Thank you,
// MediTrack Hospital
// `;

//     /* =========================
//        PATIENT EMAIL
//     ========================= */

//     try {
//       await sendMail(
//         email,
//         "MediTrack Hospital | Appointment Confirmation",
//         patientEmailHTML
//       );

//       console.log("Patient email completed successfully ✅");

//     } catch (error) {
//       console.error("Patient Email Failed ❌");
//       console.error(error.message);
//     }

//     /* =========================
//        WHATSAPP
//     ========================= */

//     try {
//       await sendWhatsApp(
//         mobile,
//         whatsappMessage
//       );

//       console.log("Patient WhatsApp completed successfully ✅");

//     } catch (error) {
//       console.error("Patient WhatsApp Failed ❌");
//       console.error(error.message);
//     }

//     /* =========================
//        ADMIN EMAIL
//     ========================= */

//     try {
//       await sendMail(
//         "gopikrishnadindu@gmail.com",
//         "MediTrack | New Appointment Alert",
//         `
//         <h2>New Appointment</h2>

//         <p><strong>Patient:</strong> ${patient_name}</p>
//         <p><strong>Mobile:</strong> ${mobile}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Doctor:</strong> ${doctor_name}</p>
//         <p><strong>Department:</strong> ${department}</p>
//         <p><strong>Date:</strong> ${appointment_date}</p>
//         <p><strong>Time:</strong> ${appointment_time}</p>
//         `
//       );

//       console.log("Admin email completed successfully ✅");

//     } catch (error) {
//       console.error("Admin Email Failed ❌");
//       console.error(error.message);
//     }

//     res.status(201).json({
//       message: "Appointment booked successfully ✅",
//       data: result.rows[0],
//     });

//   } catch (error) {
//     console.error("APPOINTMENT ERROR ❌");
//     console.error(error);

//     res.status(500).json({
//       message: error.message || "Booking failed",
//     });
//   }
// });


// router.get("/", async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT * FROM appointments ORDER BY appointment_date DESC"
//     );

//     res.json({
//       data: result.rows,
//     });

//   } catch (error) {
//     console.error("FETCH ERROR:", error);

//     res.status(500).json({
//       message: "Failed to fetch appointments",
//     });
//   }
// });


// module.exports = router;





const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const sendMail = require("../utils/mailer");
const sendWhatsApp = require("../utils/whatsapp");

/* =========================
   CREATE APPOINTMENT
========================= */

router.post("/", async (req, res) => {
  try {
    let {
      patient_id,
      patient_name,
      email,
      mobile,
      doctor_name,
      department,
      appointment_date,
      appointment_time,
    } = req.body;

    /* =========================
       VALIDATION
    ========================= */

    if (
      !patient_name ||
      !email ||
      !mobile ||
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
       SAFE PATIENT ID
    ========================= */

    if (!patient_id || isNaN(patient_id)) {
      patient_id = null;
    } else {
      patient_id = parseInt(patient_id);
    }

    /* =========================
       SAVE APPOINTMENT
    ========================= */

    const result = await pool.query(
      `
      INSERT INTO appointments
      (
        patient_id,
        patient_name,
        email,
        mobile,
        doctor_name,
        department,
        appointment_date,
        appointment_time
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
        patient_id,
        patient_name,
        email,
        mobile,
        doctor_name,
        department,
        appointment_date,
        appointment_time,
      ]
    );

    const appointment = result.rows[0];

    console.log("=================================");
    console.log("Appointment saved to database ✅");
    console.log("Appointment ID:", appointment.id);
    console.log("=================================");

    /* =========================
       PATIENT EMAIL TEMPLATE
    ========================= */

    const patientEmailHTML = `
      <div style="
        font-family: Arial, sans-serif;
        background: #f8fafc;
        padding: 30px;
      ">
        <div style="
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 30px;
          border-radius: 12px;
        ">

          <h2 style="color: #0d9488;">
            MediTrack Hospital 🏥
          </h2>

          <h3>Appointment Confirmation</h3>

          <p>
            Dear <strong>${patient_name}</strong>,
          </p>

          <p>
            Your appointment has been booked successfully.
          </p>

          <hr />

          <p>
            <strong>Doctor:</strong>
            ${doctor_name}
          </p>

          <p>
            <strong>Department:</strong>
            ${department}
          </p>

          <p>
            <strong>Date:</strong>
            ${appointment_date}
          </p>

          <p>
            <strong>Time:</strong>
            ${appointment_time}
          </p>

          <hr />

          <p>
            Please arrive 10 minutes before your appointment.
          </p>

          <br />

          <p>
            Thank you,<br />
            <strong>MediTrack Hospital</strong>
          </p>

        </div>
      </div>
    `;

    /* =========================
       WHATSAPP MESSAGE
    ========================= */

    const whatsappMessage = `
MediTrack Hospital 🏥

Appointment Confirmed ✅

Dear ${patient_name},

Your appointment has been successfully booked.

👨‍⚕️ Doctor: ${doctor_name}
🏥 Department: ${department}
📅 Date: ${appointment_date}
⏰ Time: ${appointment_time}

Please arrive 10 minutes before your appointment.

Thank you,
MediTrack Hospital
`;

    /* =========================
       SEND PATIENT EMAIL
    ========================= */

    let patientEmailStatus = "pending";

    try {
      await sendMail(
        email,
        "MediTrack Hospital | Appointment Confirmation",
        patientEmailHTML
      );

      patientEmailStatus = "sent";

      console.log("Patient email sent successfully ✅");
    } catch (error) {
      patientEmailStatus = "failed";

      console.error("Patient Email Failed ❌");
      console.error(error.message);
    }

    /* =========================
       SEND WHATSAPP
    ========================= */

    let whatsappStatus = "pending";

    try {
      await sendWhatsApp(
        mobile,
        whatsappMessage
      );

      whatsappStatus = "sent";

      console.log("Patient WhatsApp completed successfully ✅");
    } catch (error) {
      whatsappStatus = "failed";

      console.error("Patient WhatsApp Failed ❌");
      console.error(error.message);
    }

    /* =========================
       ADMIN EMAIL TEMPLATE
    ========================= */

    const adminEmailHTML = `
      <div style="
        font-family: Arial, sans-serif;
        padding: 20px;
      ">

        <h2>New MediTrack Appointment 🏥</h2>

        <hr />

        <p>
          <strong>Appointment ID:</strong>
          ${appointment.id}
        </p>

        <p>
          <strong>Patient:</strong>
          ${patient_name}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Mobile:</strong>
          ${mobile}
        </p>

        <p>
          <strong>Doctor:</strong>
          ${doctor_name}
        </p>

        <p>
          <strong>Department:</strong>
          ${department}
        </p>

        <p>
          <strong>Date:</strong>
          ${appointment_date}
        </p>

        <p>
          <strong>Time:</strong>
          ${appointment_time}
        </p>

      </div>
    `;

    /* =========================
       SEND ADMIN EMAIL
    ========================= */

    let adminEmailStatus = "pending";

    try {
      await sendMail(
        process.env.ADMIN_EMAIL,
        "MediTrack | New Appointment Alert",
        adminEmailHTML
      );

      adminEmailStatus = "sent";

      console.log("Admin email sent successfully ✅");
    } catch (error) {
      adminEmailStatus = "failed";

      console.error("Admin Email Failed ❌");
      console.error(error.message);
    }

    /* =========================
       RESPONSE
    ========================= */

    return res.status(201).json({
      message: "Appointment booked successfully ✅",

      notifications: {
        patientEmail: patientEmailStatus,
        whatsapp: whatsappStatus,
        adminEmail: adminEmailStatus,
      },

      data: appointment,
    });

  } catch (error) {

    console.error("=================================");
    console.error("APPOINTMENT ERROR ❌");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      message: error.message || "Booking failed",
    });
  }
});


/* =========================
   GET ALL APPOINTMENTS
========================= */

router.get("/", async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT *
      FROM appointments
      ORDER BY appointment_date DESC
      `
    );

    return res.json({
      data: result.rows,
    });

  } catch (error) {

    console.error("FETCH APPOINTMENTS ERROR ❌");
    console.error(error.message);

    return res.status(500).json({
      message: "Failed to fetch appointments",
    });
  }
});


module.exports = router;