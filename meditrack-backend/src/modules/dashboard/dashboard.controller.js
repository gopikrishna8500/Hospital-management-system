const dashboardService = require("./dashboard.service");

exports.getDashboardStats = async (req, res) => {
  try {
    const data = await dashboardService.getStats(req.user?.hospital_id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
