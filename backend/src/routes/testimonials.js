const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");

const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

/* ================= PUBLIC ================= */
router.get("/", getTestimonials);

/* ================= ADMIN ================= */
router.post("/", requireAuth, createTestimonial);
router.put("/:id", requireAuth, updateTestimonial);
router.delete("/:id", requireAuth, deleteTestimonial);

module.exports = router;
