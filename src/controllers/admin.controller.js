const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { env } = require("../config/env");
const { asyncHandler } = require("../utils/asyncHandler");

const signToken = (admin) =>
  jwt.sign({ _id: admin._id.toString(), role: admin.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

const loginAdmin = asyncHandler(async (req, res) => {
  const { identifier, password, email, username } = req.body;

  // Support either:
  // - { identifier, password }  (identifier can be email or username)
  // OR legacy:
  // - { email, password }
  // - { username, password }
  const id = (identifier || email || username || "").trim().toLowerCase();

  if (!id || !password) {
    res.status(400);
    throw new Error("identifier (or email/username) and password are required");
  }

  const admin = await Admin.findOne({
    $or: [{ email: id }, { username: id }],
  });

  if (!admin) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const ok = await admin.comparePassword(password);
  if (!ok) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.json({
    token: signToken(admin),
    admin: {
      _id: admin._id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    },
  });
});

/**
 * PUT /api/admin/change-password (protected)
 * Body: { currentPassword, newPassword }
 *
 * Notes:
 * - Requires auth middleware to set req.user (or req.admin) from JWT.
 * - Saves new password via Admin pre-save hook (bcrypt hashing).
 */
const changePassword = asyncHandler(async (req, res) => {
  const adminId = req.user?._id || req.admin?._id;

  const { currentPassword, newPassword } = req.body;

  if (!adminId) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("currentPassword and newPassword are required");
  }

  if (typeof newPassword !== "string" || newPassword.length < 8) {
    res.status(400);
    throw new Error("New password must be at least 8 characters");
  }

  const admin = await Admin.findById(adminId);
  if (!admin) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const ok = await admin.comparePassword(currentPassword);
  if (!ok) {
    res.status(401);
    throw new Error("Current password is incorrect");
  }

  admin.password = newPassword; // will be hashed by pre-save hook
  await admin.save();

  res.json({ success: true });
});

module.exports = { loginAdmin, changePassword };