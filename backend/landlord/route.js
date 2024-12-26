const express = require('express');
const { post_jobinfo } = require('./controller');
const { authenticateToken } = require('../middleware/auth'); // 驗證 Token 的中介層

const router = express.Router();

// 新增一筆 JobInfo
router.post('/api/jobinfo', authenticateToken, post_jobinfo);

module.exports = router;