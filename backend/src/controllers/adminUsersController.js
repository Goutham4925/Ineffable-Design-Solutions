const prisma = require("../../prisma/client");

/* ================= GET ALL ADMINS ================= */
exports.getAdmins = async (req, res, next) => {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        approved: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(admins);
  } catch (err) {
    next(err);
  }
};

/* ================= APPROVE ADMIN ================= */
exports.approveAdmin = async (req, res, next) => {
  try {
    // ❌ prevent approving yourself (safety)
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        error: "You cannot approve yourself",
      });
    }

    await prisma.admin.update({
      where: { id: req.params.id },
      data: { approved: true },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/* ================= CHANGE ROLE ================= */
exports.changeRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!["ADMIN", "SUPER_ADMIN"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // ❌ prevent changing your own role
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        error: "You cannot change your own role",
      });
    }

    await prisma.admin.update({
      where: { id: req.params.id },
      data: { role },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/* ================= DELETE ADMIN ================= */
exports.deleteAdmin = async (req, res, next) => {
  try {
    // ❌ prevent deleting yourself
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        error: "You cannot delete yourself",
      });
    }

    await prisma.admin.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
