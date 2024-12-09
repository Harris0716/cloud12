const { list } = require("./controller");

const router = require("express").Router();

router.get("/api/jobs", list);

module.exports = router;
