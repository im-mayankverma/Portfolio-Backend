/**
 * JWT auth middleware:
 * - Reads Authorization: Bearer <token>
 * - Verifies token
 * - Attaches decoded payload to req.user
 */
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401);
    return next(new Error("Missing or invalid Authorization header"));
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded; // { _id, role, iat, exp }
    return next();
  } catch (err) {
    res.status(401);
    return next(new Error("Invalid or expired token"));
  }
};

// Optional: simple role gate (useful later)
const requireRole = (role) => (req, res, next) => {
  if (!req.user) {
    res.status(401);
    return next(new Error("Not authenticated"));
  }
  if (req.user.role !== role) {
    res.status(403);
    return next(new Error("Forbidden"));
  }
  next();
};

module.exports = { requireAuth, requireRole };