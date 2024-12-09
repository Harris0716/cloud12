// job-detail/route.js
const express = require('express');
const router = express.Router();
const { getJobDetail } = require('./controller');

// 處理根路徑 /api/job
router.get('/', (req, res) => {
    res.json({ 
      message: 'Job API is working',
      endpoint: '/api/job'
    });
});

// 處理特定 ID 的請求
router.get('/:jobInfo_id', getJobDetail);

module.exports = router;