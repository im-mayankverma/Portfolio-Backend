/**
 * Express app configuration:
 * - global middleware
 * - health/root routes
 * - API routes
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

// Trust proxy, useful when deploying behind Render/NGINX/etc.
app.set("trust proxy", 1);

// Disable x-powered-by for minor security hardening
app.disable("x-powered-by");

// Connect database at startup
connectDB();

// Logging
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

// CORS
app.use(corsMiddleware);

// Payload size limits
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Root route for browser checks / Render checks
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    environment: env.NODE_ENV,
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    ok: true,
    message: "Backend is healthy",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    ok: true,
    message: "API is healthy",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api", routes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
