const express = require("express");
const router = express.Router();
const patientsController = require("./patients.controller");
const { verifyToken, authorizeRoles } = require("../../middleware/auth.middleware");

// Create patient (Admin + Doctor)
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "doctor"),
  patientsController.createPatient
);

// Get patients (All roles)
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin", "doctor", "staff"),
  patientsController.getPatients
);

// Update patient (Admin + Doctor)
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "doctor"),
  patientsController.updatePatient
);

// Delete patient (Admin only)
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  patientsController.deletePatient
);

module.exports = router;