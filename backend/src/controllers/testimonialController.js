const prisma = require("../../prisma/client");

/* ================= GET ALL (PUBLIC) ================= */
exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [
        { featured: "desc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });

    res.json(testimonials);
  } catch (err) {
    next(err);
  }
};

/* ================= CREATE (ADMIN) ================= */
exports.createTestimonial = async (req, res, next) => {
  try {
    const { quote, author, role, company, avatar, featured } = req.body;

    if (!quote || !author || !role || !company) {
      return res
        .status(400)
        .json({ error: "Missing required fields" });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        quote,
        author,
        role,
        company,
        avatar,
        featured: Boolean(featured),
      },
    });

    res.json(testimonial);
  } catch (err) {
    next(err);
  }
};

/* ================= UPDATE (ADMIN) ================= */
exports.updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quote, author, role, company, avatar, featured } = req.body;

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        quote,
        author,
        role,
        company,
        avatar,
        featured: Boolean(featured),
      },
    });

    res.json(testimonial);
  } catch (err) {
    next(err);
  }
};

/* ================= DELETE (ADMIN) ================= */
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.testimonial.delete({
      where: { id },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
