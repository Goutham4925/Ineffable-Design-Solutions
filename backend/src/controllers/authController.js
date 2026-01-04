const prisma = require("../../prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ================= LOGIN ================= */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin)
      return res.status(401).json({ error: "Invalid credentials" });

    if (!admin.approved)
      return res.status(403).json({ error: "Awaiting approval" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ SEND ADMIN DATA TOO
    res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        approved: admin.approved,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* ================= SIGNUP ================= */
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await prisma.admin.findUnique({ where: { email } });
    if (exists)
      return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: {
        name,
        email,
        password: hashed,
        approved: false,
      },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
