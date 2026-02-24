const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

dotenv.config();

const pool = require("./config/db");
const authenticateToken = require("./middleware/authMiddleware");

const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const authRoutes = require("./modules/auth/auth.routes");
const patientsRoutes = require("./modules/patients/patients.routes");

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* =========================
   ENSURE UPLOADS FOLDER EXISTS
========================= */

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   MULTER CONFIG
========================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "");
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"), false);
    }
    cb(null, true);
  },
});

/* =========================
   ROUTES
========================= */

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientsRoutes);

/* =========================
   REPORTS ROUTES
========================= */

// Upload Report
app.post(
  "/api/reports/:patientId",
  authenticateToken,
  upload.single("report"),
  async (req, res) => {
    const { patientId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const result = await pool.query(
        `INSERT INTO reports (patient_id, file_name, file_path)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [patientId, req.file.filename, req.file.path]
      );

      res.json({
        message: "Report uploaded successfully",
        report: result.rows[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// Get Reports
app.get(
  "/api/reports/:patientId",
  authenticateToken,
  async (req, res) => {
    const { patientId } = req.params;

    try {
      const result = await pool.query(
        "SELECT * FROM reports WHERE patient_id = $1 ORDER BY uploaded_at DESC",
        [patientId]
      );

      res.json({ data: result.rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  }
);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.send("🚀 RunsEra MediTrack Backend Running");
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

module.exports = app;