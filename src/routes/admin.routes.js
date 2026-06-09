const router = require("express").Router();
const { loginAdmin, changePassword } = require("../controllers/admin.controller");
const { requireAuth } = require("../middleware/auth");

// POST /api/admin/login
router.post("/login", loginAdmin);

// PUT /api/admin/change-password (protected)
router.put("/change-password", requireAuth, changePassword);

module.exports = router;