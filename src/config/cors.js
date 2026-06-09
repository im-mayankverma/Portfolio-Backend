// src/config/cors.js
const cors = require("cors");
const { env } = require("./env");

const devOrigins = ["http://localhost:5173"];

const prodOrigins = (env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins =
  env.NODE_ENV === "production" ? prodOrigins : devOrigins;

const corsMiddleware = cors({
  origin(origin, cb) {
    // Allow tools like Postman/curl/server-to-server requests
    if (!origin) return cb(null, true);

    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],

  // Keep false because you are using Bearer tokens, not cookies
  credentials: false,
});

module.exports = { corsMiddleware };