// job-detail/route.js
const express = require('express');
const router = express.Router();
const { getJobDetail } = require('./controller');

router.get('/:jobInfo_id', getJobDetail);

module.exports = router;