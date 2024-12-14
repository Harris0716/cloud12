const {
  createApplication,
  getApplierApplications,
  updateApplicationStatus,
} = require("./model");

function post_application(req, res) {
  const applier_id = req.user.user_id;
  const { jobId, startDate, endDate, message } = req.body;
  createApplication(jobId, applier_id, startDate, endDate, message)
    .then((result) => {
      res.json({ message: "申請成功", result });
    })
    .catch((error) => {
      res.json({ message: "申請失敗", error });
    });
}

module.exports = { post_application };
