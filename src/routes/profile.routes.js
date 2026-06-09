const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const { getProfile, upsertProfile } = require("../controllers/profile.controller");

router.get("/", getProfile);
router.put("/", requireAuth, upsertProfile);

module.exports = router;