const router = require("express").Router();
const { get_info, post_info,put_info ,del_info } = require("./controller");

router.get("/api/resume/:user_id", get_info);

router.post("/api/resume", post_info);

router.put("/api/resume", put_info);

router.delete("/api/resume", del_info);

module.exports = router;