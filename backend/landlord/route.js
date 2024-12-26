const router = require("express").Router();
const { post_jobinfo } = require("./controller");
const authenticateToken = require("../user/authMiddleware");


router.post("/api/jobinfo", authenticateToken, post_jobinfo);

module.exports = router;