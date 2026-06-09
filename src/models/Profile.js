const mongoose = require("mongoose");

/**
 * Profile is usually a single document (your own).
 * We'll support:
 * - public GET
 * - private PUT to update
 */
const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "" },
    headline: { type: String, default: "" },
    bio: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },

    location: { type: String, default: "" },
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    resumeUrl: { type: String, default: "" }, // Phase 4 ready
    avatarUrl: { type: String, default: "" }, // Phase 4 ready
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);