// const express = require("express");
// const router = express.Router();

// const authMiddleware = require("../../middleware/authMiddleware");
// const roleMiddleware = require("../../middleware/roleMiddleware");

// const dashboardController = require("./dashboard.controller");

// router.get(
//   "/stats",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   dashboardController.getDashboardStats
// );

// module.exports = router;

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
  "/",
  verifyToken,                 // Must be logged in
  authorizeRoles("admin"),     // Only admin allowed
  (req, res) => {
    res.json({
      message: "Admin dashboard data secured",
      user: req.user
    });
  }
);

module.exports = router;