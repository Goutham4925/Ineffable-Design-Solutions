const prisma = require("../../prisma/client");

exports.getAdmins = async (req, res) => {
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
};

exports.approveAdmin = async (req, res) => {
  await prisma.admin.update({
    where: { id: req.params.id },
    data: { approved: true },
  });

  res.json({ success: true });
};
