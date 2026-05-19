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


app.use("/api/appointments", appointmentRoutes);

/* =========================
   FIX: UPLOAD PATH (IMPORTANT)
========================= */
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // ✅ FIX
}

app.use("/uploads", express.static(uploadDir));

/* =========================
   MULTER CONFIG (FINAL FIX)
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ FIX (absolute path)
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "");
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // ✅ 5MB limit (VERY IMPORTANT)
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only PDF or Image allowed"), false);
    }

    cb(null, true);
  },
});

/* =========================
   ROUTES
========================= */
app.use("/api/dashboard", require("./modules/dashboard/dashboard.routes"));
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/patients", require("./modules/patients/patients.routes"));
app.use("/api/billing", require("./routes/billing.routes"));
/* =========================
   REPORT UPLOAD (FINAL)
========================= */
app.post("/api/reports/:patientId", upload.single("report"), async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file);

    const { patientId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded ❌" });
    }

    const result = await pool.query(
      `INSERT INTO reports (patient_id, file_name, file_path)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [patientId, req.file.filename, req.file.path]
    );

    res.json({
      message: "Report uploaded successfully ✅",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);

    res.status(500).json({
      message: error.message || "Upload failed ❌",
    });
  }
});

/* =========================
   GET REPORTS
========================= */
app.get("/api/reports/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    const result = await pool.query(
      "SELECT * FROM reports WHERE patient_id = $1 ORDER BY uploaded_at DESC",
      [patientId]
    );

    res.json({ data: result.rows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});

/* =========================
   GLOBAL ERROR HANDLER (IMPORTANT)
========================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === "Only PDF or Image allowed") {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: "Server error ❌" });
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("🚀 MediTrack Backend Running");
});

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

module.exports = app;