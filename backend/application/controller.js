const {
  createApplication,
  getApplierApplications,
  getLandlordApplications,
  getApplicationDetail,
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

function get_applier_application(req, res) {
  const applier_id = req.user.user_id;
  getApplierApplications(applier_id)
    .then((result) => {
      res.json({ message: "成功取得申請", result });
    })
    .catch((error) => {
      res.json({ message: "取得申請失敗", error });
    });
}

function get_landlord_application(req, res) {
  const landlord_id = req.user.user_id;
  getLandlordApplications(landlord_id)
    .then((result) => {
      res.json({ message: "成功取得申請", result });
    })
    .catch((error) => {
      res.json({ message: "取得申請失敗", error });
    });
}

function get_application_detail(req, res) {
  const application_id = req.params.application_id;
  getApplicationDetail(application_id)
    .then((result) => {
      res.json({ message: "成功取得申請", result });
    })
    .catch((error) => {
      res.json({ message: "取得申請失敗", error });
    });
}

function update_application_status(req, res) {
  const application_id = req.params.application_id;
  const { status } = req.body;
  updateApplicationStatus(application_id, status)
    .then((result) => {
      res.json({ message: "成功更新申請", result });
    })
    .catch((error) => {
      res.json({ message: "更新申請失敗", error });
    });
}

module.exports = {
  post_application,
  get_applier_application,
  get_landlord_application,
  get_application_detail,
  update_application_status,
};
