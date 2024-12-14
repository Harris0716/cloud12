const router = require("express").Router();
const { post_application, get_applier_application } = require("./controller");
const authenticateToken = require("../user/authMiddleware");

router.post("/api/applications", authenticateToken, post_application);
router.get("/api/my-applications", authenticateToken, get_applier_application);

module.exports = router;
