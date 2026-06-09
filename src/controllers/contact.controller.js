const Contact = require("../models/Contact");
const { asyncHandler } = require("../utils/asyncHandler");

// Public: POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  const { name, email, message, subject } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("name, email, and message are required");
  }

  const doc = await Contact.create({
    name,
    email,
    message,
    subject: subject || "",
    createdIp: req.ip || "",
    userAgent: req.headers["user-agent"] || "",
  });

  res.status(201).json({ success: true, _id: doc._id });
});

// Private: GET /api/contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const docs = await Contact.find().sort({ createdAt: -1 });
  res.json(docs);
});

// Private: DELETE /api/contacts/:id (optional but useful)
const deleteContact = asyncHandler(async (req, res) => {
  const doc = await Contact.findByIdAndDelete(req.params.id);
  if (!doc) {
    res.status(404);
    throw new Error("Not found");
  }
  res.json({ success: true });
});

module.exports = { createContact, getAllContacts, deleteContact };