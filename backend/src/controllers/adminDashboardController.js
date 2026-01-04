const prisma = require("../../prisma/client");

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      services,
      projects,
      team,
      testimonials,
      messages,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.teamMember.count(),
      prisma.testimonial.count(),
      prisma.contactSubmission.count({
        where: { read: false },
      }),
    ]);

    res.json({
      services,
      projects,
      team,
      testimonials,
      unreadMessages: messages,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
};
