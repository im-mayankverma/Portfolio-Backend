const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const controller = require("../controllers/project.controller");

// Public GET
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// Private write
router.post("/", requireAuth, controller.createOne);
router.put("/:id", requireAuth, controller.updateById);
router.delete("/:id", requireAuth, controller.deleteById);

module.exports = router;