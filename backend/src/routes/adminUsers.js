const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getAdmins,
  approveAdmin,
} = require("../controllers/adminUsersController");

router.get("/", requireAuth, getAdmins);
router.put("/:id/approve", requireAuth, approveAdmin);

module.exports = router;
