/**
 * Express app configuration:
 * - global middleware (CORS, JSON limits)
 * - routes
 * - error handling
 */
const express = require("express");
const morgan = require("morgan");

const { connectDB } = require("./config/db");
const { corsMiddleware } = require("./config/cors");
const routes = require("./routes");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");
const { env } = require("./config/env");

const app = express();

// Trust proxy (useful when deploying behind Render/NGINX/etc.)
app.set("trust proxy", 1);

// Disable x-powered-by for minor security hardening
app.disable("x-powered-by");

// Connect database at startup (Phase 2)
connectDB();

// Logging (useful in dev + production)
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

// CORS - configured centrally
// NOTE: Do NOT add `app.options("*", ...)` here because `*` can crash with path-to-regexp.
// Your corsMiddleware should handle OPTIONS requests.
app.use(corsMiddleware);

// Payload size limits (future-proof for base64 / multipart metadata)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Health check
app.get("/health", (req, res) => res.json({ ok: true, env: env.NODE_ENV }));

// API routes
app.use("/api", routes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;