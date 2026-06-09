const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const controller = require("../controllers/certificate.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.post("/", requireAuth, controller.createOne);
router.put("/:id", requireAuth, controller.updateById);
router.delete("/:id", requireAuth, controller.deleteById);

module.exports = router;