// route.js
const { detail } = require("./controller");
const router = require("express").Router();

router.get("/jobs/:jobInfo_id", detail); 

module.exports = router;