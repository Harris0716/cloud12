const router = require("express").Router();
const {
  post_application,
  get_applier_application,
  get_landlord_application,
  get_application_detail,
} = require("./controller");
const authenticateToken = require("../user/authMiddleware");

router.post("/api/applications", authenticateToken, post_application);
router.get("/api/my-applications", authenticateToken, get_applier_application);
router.get(
  "/api/landlord-applications",
  authenticateToken,
  get_landlord_application
);
router.get("/api/application-detail/:application_id", get_application_detail);

module.exports = router;
