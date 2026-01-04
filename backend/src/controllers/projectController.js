const prisma = require("../../prisma/client");

/* ===========================
   GET /api/projects
=========================== */
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
      include: {
        services: {
          include: { service: true },
        },
      },
    });

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

/* ===========================
   GET /api/projects/slug/:slug
=========================== */
exports.getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        services: {
          include: { service: true },
        },
        results: true,
        testimonial: true,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

/* ===========================
   POST /api/projects
=========================== */
exports.createProject = async (req, res, next) => {
  try {
    const { services = [], ...data } = req.body;

    const project = await prisma.project.create({
      data: {
        ...data,
        services: {
          create: services.map((serviceId) => ({
            serviceId,
          })),
        },
      },
      include: {
        services: {
          include: { service: true },
        },
      },
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

/* ===========================
   PUT /api/projects/:id
=========================== */
exports.updateProject = async (req, res, next) => {
  try {
    const { services = [], ...data } = req.body;

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        ...data,
        services: {
          deleteMany: {},
          create: services.map((serviceId) => ({
            serviceId,
          })),
        },
      },
      include: {
        services: {
          include: { service: true },
        },
      },
    });

    res.json(project);
  } catch (err) {
    next(err);
  }
};

/* ===========================
   DELETE /api/projects/:id
=========================== */
exports.deleteProject = async (req, res, next) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
