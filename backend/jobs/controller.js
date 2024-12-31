const { listJobs, getJobById, createJobInfo } = require("./model");
const AWS = require("aws-sdk");

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

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

function uploadImageToS3(fileBuffer, fileName, contentType) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
    //ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location); // 返回圖片 URL
      }
    });
  });
}

async function post_jobinfo(req, res) {
  const landlord_id = req.user.user_id;
  const {
    address,
    room_type,
    start_date,
    end_date,
    job_description,
    positions,
    people_needed,
    benefits,
  } = req.body;

  if (!address || !room_type || !start_date || !end_date || !job_description || !positions || !people_needed || !req.files.cover_image) {
    res.status(400).json({ message: "缺少必要欄位或封面圖片" });
    return;
  }

  try {
    // 處理封面圖片上傳
    const coverImage = req.files.cover_image[0];
    const coverImageUrl = await uploadImageToS3(
      coverImage.buffer,
      `cover/${Date.now()}-${coverImage.originalname}`,
      coverImage.mimetype
    );

    // 處理多張細節圖片上傳
    const detailImages = req.files.detail_images || [];
    const detailImageUrls = await Promise.all(
      detailImages.map((file) =>
        uploadImageToS3(file.buffer, `details/${Date.now()}-${file.originalname}`, file.mimetype)
      )
    );

    const jobInfoData = {
      landlord_id,
      address,
      room_type,
      start_date,
      end_date,
      job_description,
      positions,
      people_needed,
      cover_image: coverImageUrl, // 使用上傳後的 URL
      detail_images: JSON.stringify(detailImageUrls), // JSON 格式儲存
      benefits: JSON.stringify(benefits),
    };

    const result = await createJobInfo(jobInfoData);
    res.status(201).json({ message: "新增 JobInfo 成功", jobInfo_id: result.insertId });
  } catch (error) {
    console.error("Error in post_jobinfo:", error);
    res.status(500).json({ message: "新增 JobInfo 發生錯誤", error: error.message });
  }
}


module.exports = { list, getJobDetail, post_jobinfo };
