module.exports = (req, res, next) => {
  // ⛔ Guard first
  if (!req.user || !req.user.role) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ error: "Super admin only" });
  }

  next();
};
