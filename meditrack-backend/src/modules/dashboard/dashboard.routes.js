const express = require("express");
const router = express.Router();

const {
  verifyToken,
  authorizeRoles
} = require("../../middleware/auth.middleware");

/* =========================
   ADMIN DASHBOARD
========================= */

router.get(
  "/admin",
  verifyToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Admin Dashboard",
      user: req.user
    });
  }
);

/* =========================
   DOCTOR DASHBOARD
========================= */

router.get(
  "/doctor",
  verifyToken,
  authorizeRoles("doctor"),
  (req, res) => {
    res.json({
      message: "Doctor Dashboard",
      user: req.user
    });
  }
);

/* =========================
   STAFF DASHBOARD
========================= */

router.get(
  "/staff",
  verifyToken,
  authorizeRoles("staff"),
  (req, res) => {
    res.json({
      message: "Staff Dashboard",
      user: req.user
    });
  }
);

module.exports = router;