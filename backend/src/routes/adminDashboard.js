const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getDashboardStats,
} = require("../controllers/adminDashboardController");

router.get("/", requireAuth, getDashboardStats);

module.exports = router;
