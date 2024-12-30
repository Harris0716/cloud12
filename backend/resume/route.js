const router = require("express").Router();
const {
  get_info,
  post_info,
  put_info,
  del_info,
  get_resume_by_id,
} = require("./controller");
const authenticateToken = require("../user/authMiddleware");

router.get("/api/resume", authenticateToken, get_info);

router.post("/api/resume", post_info);

router.put("/api/resume", authenticateToken, put_info);

router.delete("/api/resume", authenticateToken, del_info);

router.get("/api/resume/:resume_id", get_resume_by_id);

module.exports = router;
