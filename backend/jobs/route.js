const router = require("express").Router();
const { list, getJobDetail } = require("./controller");

// 工作列表
router.get("/api/jobs", list);

// 工作詳細資訊
router.get("/api/job/:jobInfo_id", getJobDetail);

module.exports = router;
