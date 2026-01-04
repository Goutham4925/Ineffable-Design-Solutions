module.exports = (req, res, next) => {
  if (req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ error: "Super admin only" });
  }
  next();
};
