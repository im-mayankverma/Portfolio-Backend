const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    // One doc per category (e.g., Technical, Tools, General)
    category: { type: String, required: true, trim: true },

    // Items inside the category
    items: [{ type: String, trim: true }],

    // For custom ordering of categories
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);