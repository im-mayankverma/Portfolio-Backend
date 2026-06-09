const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    issuer: { type: String, default: "" },
    issueDate: { type: String, default: "" },

    // NEW: description (you requested it)
    description: { type: String, default: "" },

    credentialUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" }, // show on website

    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);