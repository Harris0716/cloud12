const router = require("express").Router();
const { list, getJobDetail, post_jobinfo } = require("./controller");
const authenticateToken = require("../user/authMiddleware");

// 工作列表
router.get("/api/jobs", list);

// 工作詳細資訊
router.get("/api/job/:jobInfo_id", getJobDetail);

// 新增工作
router.post("/api/jobinfo", authenticateToken, post_jobinfo);

module.exports = router;