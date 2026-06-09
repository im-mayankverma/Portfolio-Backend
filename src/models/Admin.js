const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },

    // Used to invalidate old JWTs after password changes
    passwordChangedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// IMPORTANT: use function() {} (NOT arrow) so `this` is the document
// IMPORTANT: don't mix async/await + next incorrectly.
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // If this is a password update (not initial creation), mark change time.
  // Set slightly in the past to avoid race conditions with token iat.
  if (!this.isNew) {
    this.passwordChangedAt = new Date(Date.now() - 1000);
  }
});

adminSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);