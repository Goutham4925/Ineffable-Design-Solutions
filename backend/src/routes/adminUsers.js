const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const requireSuperAdmin = require("../middleware/requireSuperAdmin");

const {
  getAdmins,
  approveAdmin,
  changeRole,
  deleteAdmin,
} = require("../controllers/adminUsersController");

/* ================= ALL ROUTES REQUIRE LOGIN ================= */
router.use(requireAuth);

/* ================= SUPER ADMIN ONLY ================= */
router.get("/", requireSuperAdmin, getAdmins);

router.put("/:id/approve", requireSuperAdmin, approveAdmin);

router.put("/:id/role", requireSuperAdmin, changeRole);

router.delete("/:id", requireSuperAdmin, deleteAdmin);

module.exports = router;
