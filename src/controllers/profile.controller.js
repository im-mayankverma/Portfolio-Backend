const Profile = require("../models/Profile");
const { asyncHandler } = require("../utils/asyncHandler");

// Public: GET /api/profile
const getProfile = asyncHandler(async (req, res) => {
  // Fetch newest profile doc (or you can enforce exactly one later)
  const doc = await Profile.findOne().sort({ createdAt: -1 });
  res.json(doc || {});
});

// Private: PUT /api/profile
const upsertProfile = asyncHandler(async (req, res) => {
  const existing = await Profile.findOne().sort({ createdAt: -1 });

  if (!existing) {
    const created = await Profile.create(req.body);
    return res.status(201).json(created);
  }

  Object.assign(existing, req.body);
  await existing.save();
  res.json(existing);
});

module.exports = { getProfile, upsertProfile };