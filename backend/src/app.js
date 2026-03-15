import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Routes
import enquiriesRouter from "./routes/enquiries.js";
import productsRouter from "./routes/products.js";
import galleryRouter from "./routes/gallery.js";

dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:8080",
  "http://localhost:5173",
  "https://lakshmi-fashion-designers-e-commerc.vercel.app"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.some(allowed => {
        if (!allowed) return false;
        // Check if origin matches exactly or if it's the domain without protocol
        return origin === allowed || origin === `https://${allowed}` || origin === `http://${allowed}`;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev")); // Request logging

// ─── Rate Limiting ────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

// Tighter rate limit for contact form (prevent spam)
const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // max 10 enquiries per IP per hour
  message: { error: "Too many enquiries submitted. Please try again later." },
});

app.use("/api", limiter);
app.use("/api/enquiries", enquiryLimiter);

// ─── Routes ───────────────────────────────────────────────────
app.use("/api/enquiries", enquiriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/gallery", galleryRouter);

// ─── Health Check ─────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "✅ OK",
    project: "Lakshmi Fashion & Designers",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ─── Root ─────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "🪡 Lakshmi Fashion & Designers API",
    version: "1.0.0",
    endpoints: {
      health: "GET  /api/health",
      enquiries: "POST /api/enquiries",
      products: "GET  /api/products",
      gallery: "GET  /api/gallery",
    },
  });
});

// ─── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

export default app;
