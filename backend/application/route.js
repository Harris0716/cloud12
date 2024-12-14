const router = require("express").Router();
const { post_application } = require("./controller");
const authenticateToken = require("../user/authMiddleware");

router.post("/api/applications", authenticateToken, post_application);

module.exports = router;
