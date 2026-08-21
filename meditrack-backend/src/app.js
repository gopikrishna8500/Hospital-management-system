const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const appointmentRoutes = require("./routes/appointments.routes");

dotenv.config();

const pool = require("./config/db");

const app = express();

/* =========================
GLOBAL MIDDLEWARE
========================= */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* =========================
APPOINTMENT ROUTES
========================= */

app.use("/api/appointments", appointmentRoutes);

/* =========================
UPLOAD DIRECTORY
========================= */

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

/* =========================
SERVE UPLOADED FILES
========================= */

app.use("/uploads", express.static(path.resolve(uploadDir)));
/* =========================
MULTER CONFIGURATION
========================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      file.originalname.replace(/\s+/g, "");

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Only PDF or Image allowed"),
        false
      );
    }

    cb(null, true);
  },
});

/* =========================
MAIN API ROUTES
========================= */

app.use(
  "/api/dashboard",
  require("./modules/dashboard/dashboard.routes")
);

app.use(
  "/api/auth",
  require("./modules/auth/auth.routes")
);

app.use(
  "/api/patients",
  require("./modules/patients/patients.routes")
);

app.use(
  "/api/billing",
  require("./routes/billing.routes")
);

app.use(
  "/api/doctors",
  require("./modules/doctors/doctors.routes")
);

app.use(
  "/api/departments",
  require("./modules/departments/departments.routes")
);

app.use(
  "/api/beds",
  require("./modules/beds/beds.routes")
);

/* =====================================================
   MEDICAL REPORTS
===================================================== */

/* =========================
UPLOAD MEDICAL REPORT
========================= */

app.post(
  "/api/reports/:patientId",
  upload.single("report"),
  async (req, res) => {
    try {
      console.log("FILE RECEIVED:", req.file);

      const { patientId } = req.params;

      /* Check patient ID */
      if (!patientId) {
        return res.status(400).json({
          message: "Patient ID is required",
        });
      }

      /* Check file */
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      /* Save report information */
      const result = await pool.query(
        `
        INSERT INTO reports
        (
          patient_id,
          file_name,
          file_path
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
          patientId,
          req.file.filename,
          req.file.path,
        ]
      );

      /* Create browser URL */
      const fileUrl =
        `https://hospital-management-system-3-ne6q.onrender.com/uploads/${encodeURIComponent(
          req.file.filename
        )}`;

      res.status(201).json({
        message: "Report uploaded successfully",
        data: {
          ...result.rows[0],
          file_url: fileUrl,
        },
      });

    } catch (error) {
      console.error(
        "REPORT UPLOAD ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Upload failed",
      });
    }
  }
);

/* =========================
GET REPORTS FOR ONE PATIENT
========================= */

app.get(
  "/api/reports/:patientId",
  async (req, res) => {
    try {
      const { patientId } = req.params;

      const result = await pool.query(
        `
        SELECT
          id,
          patient_id,
          file_name,
          file_path,
          uploaded_at
        FROM reports
        WHERE patient_id = $1
        ORDER BY uploaded_at DESC
        `,
        [patientId]
      );

      /* Add browser URL */
      const reports = result.rows.map(
        (report) => ({
          ...report,

          file_url:
            `https://hospital-management-system-3-ne6q.onrender.com/uploads/${encodeURIComponent(
              report.file_name
            )}`,
        })
      );

      res.json({
        data: reports,
      });

    } catch (error) {
      console.error(
        "GET PATIENT REPORTS ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch reports",
      });
    }
  }
);

/* =========================
GET ALL MEDICAL REPORTS
========================= */

app.get(
  "/api/reports",
  async (req, res) => {
    try {
      const result = await pool.query(
        `
        SELECT
          reports.id,
          reports.patient_id,
          reports.file_name,
          reports.file_path,
          reports.uploaded_at,
          patients.first_name,
          patients.last_name

        FROM reports

        LEFT JOIN patients
          ON reports.patient_id = patients.id

        ORDER BY reports.uploaded_at DESC
        `
      );

      /* Add browser-accessible URL */
      const reports = result.rows.map(
        (report) => ({
          ...report,

          file_url:
            `https://hospital-management-system-3-ne6q.onrender.com/uploads/${encodeURIComponent(
              report.file_name
            )}`,
        })
      );

      res.json({
        data: reports,
      });

    } catch (error) {
      console.error(
        "GET ALL REPORTS ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch medical reports",
      });
    }
  }
);

/* =========================
GLOBAL ERROR HANDLER
========================= */

app.use(
  (err, req, res, next) => {
    console.error(
      "GLOBAL ERROR:",
      err
    );

    /* Multer errors */
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: err.message,
      });
    }

    /* File type error */
    if (
      err.message ===
      "Only PDF or Image allowed"
    ) {
      return res.status(400).json({
        message: err.message,
      });
    }

    /* Other errors */
    res.status(500).json({
      message:
        err.message ||
        "Server error",
    });
  }
);

/* =========================
HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.send(
    "🚀 MediTrack Backend Running"
  );
});

/* =========================
404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

module.exports = app;