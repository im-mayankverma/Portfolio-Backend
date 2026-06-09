const router = require("express").Router();

router.use("/admin", require("./admin.routes"));

router.use("/projects", require("./projects.routes"));
router.use("/experiences", require("./experiences.routes"));
router.use("/certificates", require("./certificates.routes"));
router.use("/educations", require("./educations.routes"));
router.use("/skills", require("./skills.routes"));
router.use("/contacts", require("./contacts.routes"));
router.use("/profile", require("./profile.routes"));

module.exports = router;