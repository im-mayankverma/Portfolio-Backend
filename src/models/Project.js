const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    techStack: [{ type: String }],
    repoUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },

    // Phase 4: Cloudinary URLs can be stored here later
    imageUrl: { type: String, default: "" },

    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);