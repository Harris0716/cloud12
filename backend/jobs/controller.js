const { listJobs, getJobById } = require("./model");

function list(req, res) {
  listJobs()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error listing jobs", error });
    });
}

const getJobDetail = async (req, res) => {
  try {
    const { jobInfo_id } = req.params;

    const job = await getJobById(jobInfo_id);
    
    if (!job) {
      return res.status(404).json({ message: "工作機會不存在" });
    }

    res.json(job);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
};

module.exports = { list, getJobDetail };