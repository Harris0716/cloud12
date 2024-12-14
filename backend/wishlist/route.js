const router = require("express").Router();
const { get_info, add_info, delete_info } = require("./controller");
const authenticateToken = require("../user/authMiddleware");

// 保護 GET 路徑
router.get("/api/wishlist", authenticateToken, get_info);

// 保護 POST 路徑
router.post("/api/wishlist", authenticateToken, add_info);

// 保護 DELETE 路徑
router.delete("/api/wishlist", authenticateToken, delete_info);

module.exports = router;
