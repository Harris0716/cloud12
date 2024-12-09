const { getJobById } = require('./model');

const getJobDetail = async (req, res) => {
  try {
    const { jobInfo_id } = req.params;
    console.log('Received request for job ID:', jobInfo_id); // 添加日誌

    const job = await getJobById(jobInfo_id);
    
    if (!job) {
      console.log('Job not found:', jobInfo_id); // 添加日誌
      return res.status(404).json({ message: "工作機會不存在" });
    }

    console.log('Sending job data:', job); // 添加日誌
    res.json(job);
  } catch (error) {
    console.error('Controller error:', error); // 添加日誌
    res.status(500).json({ message: "伺服器錯誤" });
  }
};

module.exports = {
  getJobDetail
};