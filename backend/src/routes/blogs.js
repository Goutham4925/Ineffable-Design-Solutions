const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

/* ================= ROUTES ================= */

router.get("/", getAllProjects);

// ⚠️ slug route MUST be before :id
router.get("/slug/:slug", getProjectBySlug);

router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
