// job-detail/controllers.js
const { getJobById } = require('./model');

const getJobDetail = async (req, res) => {
  try {
    const { jobInfo_id } = req.params;
    console.log("Received request for job ID:", jobInfo_id);

    const job = await getJobById(jobInfo_id);
    
    if (!job) {
      return res.status(404).json({ message: "工作機會不存在" });
    }

    res.json(job);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
};

module.exports = {
  getJobDetail
};