/**
 * Reset admin password safely:
 * - Finds admin by email
 * - Sets a new plaintext password
 * - Save triggers pre-save hook which hashes it
 *
 * Usage:
 *   ADMIN_NEW_PASSWORD="YourNewPassword" npm run reset:admin-password
 */
const mongoose = require("mongoose");
const { env } = require("../src/config/env");
const Admin = require("../src/models/Admin");

const TARGET_EMAIL = "mkverma7287@gmail.com";

async function run() {
  const newPassword = process.env.ADMIN_NEW_PASSWORD;
  if (!newPassword) {
    console.log("Missing ADMIN_NEW_PASSWORD env var.");
    console.log('Example: ADMIN_NEW_PASSWORD="NewStrongPass@123" npm run reset:admin-password');
    process.exit(1);
  }

  await mongoose.connect(env.MONGODB_URI);
  console.log("Connected");

  const admin = await Admin.findOne({ email: TARGET_EMAIL.toLowerCase() });
  if (!admin) {
    console.log("Admin not found.");
    process.exit(1);
  }

  admin.password = newPassword; // pre-save hook hashes it
  await admin.save();

  console.log("Password reset completed for:", admin.email);
  process.exit(0);
}

run().catch((err) => {
  console.error("Reset failed:", err);
  process.exit(1);
});