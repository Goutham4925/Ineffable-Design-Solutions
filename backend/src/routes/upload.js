const router = require("express").Router();
const upload = require("../middleware/upload");

router.post("/", upload.array("images", 10), (req, res) => {
  if (!req.files || !req.files.length) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const urls = req.files.map((file) => file.path);
  res.json({ urls });
});

module.exports = router;
