// src/index.js
// Backend Server Entry Point (Vercel + Local compatible)

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

/* ===================== CORS CONFIG ===================== */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  "https://ineffable-design-solutions.vercel.app",
  "https://www.ineffabledesignsolutions.com"
  // add preview URLs if needed:
  // "https://ineffable-design-solutions-*.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow REST tools & server-to-server calls
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS not allowed for this origin"),
        false
      );
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// REQUIRED for Vercel + browsers
app.options("*", cors());

/* ===================== SECURITY ===================== */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

/* ===================== CORE MIDDLEWARE ===================== */
app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ===================== ROUTES ===================== */
/**
 * IMPORTANT:
 * Only mount routes that export express.Router()
 */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin-users", require("./routes/adminUsers"));
app.use("/api/services", require("./routes/services"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/team", require("./routes/team"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/admin/dashboard", require("./routes/adminDashboard"));

/* ===================== HEALTH CHECK ===================== */
app.get("/", (_, res) => {
  res.status(200).json({
    status: "Ineffable backend running 🚀",
    environment: process.env.NODE_ENV || "development",
  });
});

/* ===================== ERROR HANDLER ===================== */
app.use(require("./middleware/errorHandler"));

/* ===================== SERVER (LOCAL ONLY) ===================== */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

/* ===================== EXPORT FOR VERCEL ===================== */
module.exports = app;
