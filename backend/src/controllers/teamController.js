// Team Controller
// Implement CRUD operations for team members
const prisma = require("../../prisma/client");

/* ================= PUBLIC ================= */
exports.getTeamPublic = async (req, res, next) => {
  try {
    const team = await prisma.teamMember.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });

    res.json(team);
  } catch (err) {
    next(err);
  }
};

/* ================= ADMIN ================= */
exports.getTeamAdmin = async (req, res, next) => {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(team);
  } catch (err) {
    next(err);
  }
};

exports.createMember = async (req, res, next) => {
  try {
    const { name, role, bio, avatar } = req.body;

    const member = await prisma.teamMember.create({
      data: { name, role, bio, avatar },
    });

    res.json(member);
  } catch (err) {
    next(err);
  }
};

exports.updateMember = async (req, res, next) => {
  try {
    const { name, role, bio, avatar, active } = req.body;

    const member = await prisma.teamMember.update({
      where: { id: req.params.id },
      data: { name, role, bio, avatar, active },
    });

    res.json(member);
  } catch (err) {
    next(err);
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    await prisma.teamMember.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
