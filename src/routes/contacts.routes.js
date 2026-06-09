const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/contact.controller");

// Public: allow site visitors to submit messages
router.post("/", createContact);

// Private: admin can read messages
router.get("/", requireAuth, getAllContacts);

// Optional private delete
router.delete("/:id", requireAuth, deleteContact);

module.exports = router;