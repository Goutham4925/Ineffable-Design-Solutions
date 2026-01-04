const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");

// Public
router.get("/", serviceController.getAllServices);
router.get("/:slug", serviceController.getServiceBySlug);

// Admin
router.post("/", serviceController.createService);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;
