const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getTeamPublic,
  getTeamAdmin,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/teamController");

/* PUBLIC */
router.get("/", getTeamPublic);

/* ADMIN */
router.get("/admin", requireAuth, getTeamAdmin);
router.post("/", requireAuth, createMember);
router.put("/:id", requireAuth, updateMember);
router.delete("/:id", requireAuth, deleteMember);

module.exports = router;
