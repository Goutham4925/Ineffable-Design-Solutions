const prisma = require("../../prisma/client");

/* ===============================
   GET /api/services (PUBLIC)
=============================== */
exports.getAllServices = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });
    res.json(services);
  } catch (err) {
    next(err);
  }
};

/* ===============================
   GET /api/services/:slug
=============================== */
exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await prisma.service.findUnique({
      where: { slug: req.params.slug },
    });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    next(err);
  }
};

/* ===============================
   POST /api/services (ADMIN)
=============================== */
exports.createService = async (req, res, next) => {
  try {
    const service = await prisma.service.create({
      data: req.body,
    });

    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
};

/* ===============================
   PUT /api/services/:id (ADMIN)
=============================== */
exports.updateService = async (req, res, next) => {
  try {
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(service);
  } catch (err) {
    next(err);
  }
};

/* ===============================
   DELETE /api/services/:id (ADMIN)
=============================== */
exports.deleteService = async (req, res, next) => {
  try {
    await prisma.service.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
