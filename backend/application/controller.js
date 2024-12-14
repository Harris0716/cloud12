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
      res.json({ message: "Create application successfully!", result });
    })
    .catch((error) => {
      res.json({ message: "Error: POST application", error });
    });
}

module.exports = { post_application };
