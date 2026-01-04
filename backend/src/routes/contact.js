const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const contact = require("../controllers/contactController");

/* PUBLIC */
router.post("/", contact.createContact);

/* ADMIN */
router.get("/", requireAuth, contact.getContacts);
router.put("/:id/read", requireAuth, contact.markRead);
router.delete("/:id", requireAuth, contact.deleteContact);

module.exports = router;
