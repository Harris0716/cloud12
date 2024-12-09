const router = require("express").Router();
const { get_info,add_info,delete_info } = require("./controller");

router.get("/api/wishlist/:user_id", get_info);

router.post("/api/wishlist", add_info);

router.delete("/api/wishlist", delete_info);

module.exports = router;

