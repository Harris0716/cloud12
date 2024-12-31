const router = require("express").Router();
const { list, getJobDetail, post_jobinfo, delete_jobinfo} = require("./controller");
const authenticateToken = require("../user/authMiddleware");
const multer = require("multer");
const upload = multer();

// 工作列表
router.get("/api/jobs", list);

// 工作詳細資訊
router.get("/api/job/:jobInfo_id", getJobDetail);

// 新增工作資訊
router.post("/api/jobinfo", authenticateToken, upload.fields([
  { name: "cover_image", maxCount: 1 }, // 封面圖片
  { name: "detail_images", maxCount: 5 }, // 細節圖片
]), post_jobinfo);

// 刪除工作資訊
router.delete("/api/jobinfo/:id", authenticateToken, delete_jobinfo);

module.exports = router;