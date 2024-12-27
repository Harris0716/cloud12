const { createJobInfo } = require("./model");

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

module.exports = { post_jobinfo };