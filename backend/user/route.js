const { register, login } = require("./controller");

const router = require("express").Router();

router.post("/api/register", register);
router.post("/api/login", login);

module.exports = router;
