// src/index.js
// Backend Server Entry Point

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

/* ===================== ROUTES ===================== */
/**
 * IMPORTANT:
 * Only mount routes that are FULLY implemented
 * Otherwise Express will crash with:
 * "Router.use() requires a middleware function but got an Object"
 */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin-users", require("./routes/adminUsers"));
app.use("/api/services", require("./routes/services"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/team", require("./routes/team"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/admin/dashboard", require("./routes/adminDashboard"));
// app.use("/api/stats", require("./routes/stats"));
// app.use("/api/settings", require("./routes/settings"));


/* ===================== HEALTH CHECK ===================== */
app.get("/", (_, res) => {
  res.json({ status: "Ineffable backend running 🚀" });
});

/* ===================== ERROR HANDLER ===================== */
app.use(require("./middleware/errorHandler"));

/* ===================== START SERVER ===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
