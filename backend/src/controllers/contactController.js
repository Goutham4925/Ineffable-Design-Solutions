const prisma = require("../../prisma/client");

/* ================= CREATE CONTACT ================= */
exports.createContact = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        service: subject, // mapping subject → service
        message,
      },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/* ================= GET ALL (ADMIN) ================= */
exports.getContacts = async (req, res, next) => {
  try {
    const messages = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(messages);
  } catch (err) {
    next(err);
  }
};

/* ================= MARK READ ================= */
exports.markRead = async (req, res, next) => {
  try {
    await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { read: true },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/* ================= DELETE ================= */
exports.deleteContact = async (req, res, next) => {
  try {
    await prisma.contactSubmission.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
