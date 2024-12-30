const {
  get_user_resume,
  add_user_resume,
  update_user_resume,
  delete_user_resume,
  getResumeByID,
} = require("./model");


function get_info(req, res) {
  const user_id = req.user.user_id; // 從 JWT 中提取 user_id
  get_user_resume(user_id)
    .then((results) => {
      res.json({ message: "Get resume successfully!", data: results });
    })
    .catch((error) => {
      console.log(user_id);
      res.json({ message: "Error: Get resume", error });
    });
}

function post_info(req, res) {
  console.log("req.body:", req.body);
  const {
    user_id,
    username,
    education,
    residence,
    license,
    introduction,
  } = req.body;
  add_user_resume(
    user_id,
    username,
    education,
    residence,
    license,
    introduction
  )
    .then((result) => {
      res.json({ message: "Add resume successfully!", result });
    })
    .catch((error) => {
      res.json({ message: "Error: POST resume", error });
    });
}

function put_info(req, res) {
  const {
    user_id,
    username,
    education,
    residence,
    license,
    introduction,
  } = req.body;
  console.log(req.body);
  update_user_resume(
    user_id,
    username,
    education,
    residence,
    license,
    introduction
  )
    .then((result) => {
      res.json({ message: "Update resume successfully!", result });
    })
    .catch((error) => {
      res.json({ message: "Error: PUT resume", error });
    });
}

function del_info(req, res) {
  const user_id = req.user.user_id;
  delete_user_resume(user_id)
    .then((results) => {
      res.json({ message: "DELETE resume successfully!", data: results });
    })
    .catch((error) => {
      console.log(user_id);
      res.json({ message: "Error: DELETE resume", error });
    });
function del_info(req, res) {
  const user_id = req.user.user_id;
  delete_user_resume(user_id)
    .then((results) => {
      res.json({ message: "DELETE resume successfully!", data: results });
    })
    .catch((error) => {
      console.log(user_id);
      res.json({ message: "Error: DELETE resume", error });
    });
}

function get_resume_by_id(req, res) {
  const resume_id = req.params.resume_id;
  getResumeByID(resume_id)
    .then((results) => {
      res.json({ message: "Get resume by id successfully!", results });
    })
    .catch((error) => {
      console.log(resume_id);
      res.json({ message: "Error: Get resume by id", error });
    });
}

module.exports = { get_info, post_info, put_info, del_info, get_resume_by_id };

function get_resume_by_id(req, res) {
  const resume_id = req.params.resume_id;
  getResumeByID(resume_id)
    .then((results) => {
      res.json({ message: "Get resume by id successfully!", results });
    })
    .catch((error) => {
      console.log(resume_id);
      res.json({ message: "Error: Get resume by id", error });
    });
}

module.exports = { get_info, post_info, put_info, del_info, get_resume_by_id };
