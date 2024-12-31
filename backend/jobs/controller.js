const { listJobs, getJobById, createJobInfo } = require("./model");

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
    // console.error('Controller error:', error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
};

function post_jobinfo(req, res) {
  const landlord_id = req.user.user_id;
  const {
    address,
    room_type,
    start_date,
    end_date,
    job_description,
    positions,
    people_needed,
    cover_image,
    detail_images,
    benefits,
  } = req.body;

  if (!address || !room_type || !start_date || !end_date || !job_description || !positions || !people_needed || !cover_image) {
    res.status(400).json({ message: "缺少必要欄位" });
    return;
  }

  const jobInfoData = {
    landlord_id,
    address,
    room_type,
    start_date,
    end_date,
    job_description,
    positions,
    people_needed,
    cover_image,
    detail_images: JSON.stringify(detail_images),
    benefits: JSON.stringify(benefits),
  };

  createJobInfo(jobInfoData)
    .then((result) => {
      res.status(201).json({ message: "新增 JobInfo 成功", jobInfo_id: result.insertId });
    })
    .catch((error) => {
      console.error("Error in post_jobinfo:", error);
      res.status(500).json({ message: "新增 JobInfo 發生錯誤", error: error.message });
    });
}

module.exports = { list, getJobDetail, post_jobinfo };
