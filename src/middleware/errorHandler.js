/**
 * Centralized error handler.
 * Never leak stack traces in production.
 */
const { env } = require("../config/env");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Server error",
    ...(env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
};

module.exports = { errorHandler };