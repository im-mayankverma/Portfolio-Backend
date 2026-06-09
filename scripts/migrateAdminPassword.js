/**
 * One-time migration script (safe version):
 * - Connects to MongoDB
 * - Finds a specific admin (by email/username)
 * - If password is still plaintext, re-saves so the pre-save hook hashes it
 * - If already hashed, does nothing
 *
 * Run:
 *   npm run migrate:admin-password
 */
const mongoose = require("mongoose");
const { env } = require("../src/config/env");
const Admin = require("../src/models/Admin");

const TARGET_EMAIL = "mkverma7287@gmail.com";     // your admin email from Compass
const TARGET_USERNAME = "mayank_admin";           // your admin username from Compass

const isBcryptHash = (value) =>
  typeof value === "string" && (value.startsWith("$2a$") || value.startsWith("$2b$"));

async function run() {
  await mongoose.connect(env.MONGODB_URI);
  console.log("Connected for migration");

  const admin = await Admin.findOne({
    $or: [{ email: TARGET_EMAIL.toLowerCase() }, { username: TARGET_USERNAME }],
  });

  if (!admin) {
    console.log("Admin not found. Check DB name in MONGODB_URI (/portfolio_db) and fields.");
    process.exit(1);
  }

  // If already hashed, do nothing
  if (isBcryptHash(admin.password)) {
    console.log("Admin password already hashed. Nothing to migrate.");
    process.exit(0);
  }

  // Trigger pre-save hashing by "touching" the password field.
  // Re-assigning same plaintext is enough to mark it modified in most cases,
  // but we force it explicitly for safety.
  admin.password = admin.password;
  admin.markModified("password");

  await admin.save();
  console.log(`Migrated admin password for: ${admin.email} (${admin._id})`);

  process.exit(0);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});