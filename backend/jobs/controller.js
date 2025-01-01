const {
  listJobs,
  getJobById,
  getJobInfoById,
  createJobInfo,
  deleteJobInfoById,
  listLandlordJob,
} = require("./model");
const { uploadImageToS3, deleteImageFromS3 } = require("../utils/s3Utils");

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

  if (
    !address ||
    !room_type ||
    !start_date ||
    !end_date ||
    !job_description ||
    !positions ||
    !people_needed ||
    !req.files.cover_image
  ) {
    res.status(400).json({ message: "缺少必要欄位或封面圖片" });
    return;
  }

  try {
    const coverImage = req.files.cover_image[0];
    const coverImageUrl = await uploadImageToS3(
      coverImage.buffer,
      `cover/${Date.now()}-${coverImage.originalname}`,
      coverImage.mimetype
    );

    const detailImages = req.files.detail_images || [];
    const detailImageUrls = await Promise.all(
      detailImages.map((file) =>
        uploadImageToS3(
          file.buffer,
          `details/${Date.now()}-${file.originalname}`,
          file.mimetype
        )
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
      cover_image: coverImageUrl,
      detail_images: JSON.stringify(detailImageUrls),
      benefits: benefits,
    };

    const result = await createJobInfo(jobInfoData);
    res
      .status(201)
      .json({ message: "新增 JobInfo 成功", jobInfo_id: result.insertId });
  } catch (error) {
    console.error("Error in post_jobinfo:", error);
    res
      .status(500)
      .json({ message: "新增 JobInfo 發生錯誤", error: error.message });
  }
}

async function update_jobinfo(req, res) {
  const landlord_id = req.user.user_id;
  const jobInfoId = req.params.id; // 假設透過 URL 傳遞 JobInfo ID
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

  try {
    const existingJobInfo = await getJobInfoById(jobInfoId);
    if (!existingJobInfo || existingJobInfo.landlord_id !== landlord_id) {
      return res.status(404).json({ message: "JobInfo 不存在或無權限修改" });
    }

    let coverImageUrl = existingJobInfo.cover_image;
    if (req.files.cover_image) {
      const coverImage = req.files.cover_image[0];
      coverImageUrl = await uploadImageToS3(
        coverImage.buffer,
        `cover/${Date.now()}-${coverImage.originalname}`,
        coverImage.mimetype
      );
    }

    let detailImageUrls = JSON.parse(existingJobInfo.detail_images || "[]");
    if (req.files.detail_images) {
      const newDetailImages = await Promise.all(
        req.files.detail_images.map((file) =>
          uploadImageToS3(
            file.buffer,
            `details/${Date.now()}-${file.originalname}`,
            file.mimetype
          )
        )
      );
      detailImageUrls = [...detailImageUrls, ...newDetailImages];
    }

    const jobInfoData = {
      address,
      room_type,
      start_date,
      end_date,
      job_description,
      positions,
      people_needed,
      cover_image: coverImageUrl,
      detail_images: JSON.stringify(detailImageUrls),
      benefits: JSON.stringify(benefits),
    };

    await updateJobInfo(jobInfoId, jobInfoData);
    res.status(200).json({ message: "修改 JobInfo 成功" });
  } catch (error) {
    console.error("Error in update_jobinfo:", error);
    res.status(500).json({ message: "修改 JobInfo 發生錯誤", error: error.message });
  }
}

async function delete_jobinfo(req, res) {
  const landlord_id = req.user.user_id; // 確保是房東本人
  const jobInfo_id = req.params.id; // 從 URL 取得 JobInfo 的 ID

  if (!jobInfo_id) {
    res.status(400).json({ message: "缺少必要欄位：JobInfo ID" });
    return;
  }

  try {
    // 確認要刪除的資料是否存在，並確認房東擁有權
    const jobInfo = await getJobInfoById(jobInfo_id);

    if (!jobInfo) {
      res.status(404).json({ message: "JobInfo 不存在" });
      return;
    }

    if (jobInfo.landlord_id !== landlord_id) {
      res.status(403).json({ message: "無權限刪除此 JobInfo" });
      return;
    }

    // // 刪除 S3 上的封面圖片
    // if (jobInfo.cover_image) {
    //   await deleteImageFromS3(jobInfo.cover_image);
    // }

    // // 刪除 S3 上的細節圖片
    // if (jobInfo.detail_images) {
    //   const detailImageUrls = JSON.parse(jobInfo.detail_images); // 確保轉換為陣列
    //   for (const url of detailImageUrls) {
    //     await deleteImageFromS3(url); // 傳遞每個檔案的路徑
    //   }
    // }

    // 刪除資料庫中的記錄
    await deleteJobInfoById(jobInfo_id);

    res.status(200).json({ message: "刪除 JobInfo 成功" });
  } catch (error) {
    console.error("Error in delete_jobinfo:", error);
    res
      .status(500)
      .json({ message: "刪除 JobInfo 發生錯誤", error: error.message });
  }
}

function list_landlord_job(req, res) {
  const landlord_id = req.user.user_id;

  listLandlordJob(landlord_id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error listing landlord's jobs", error });
    });
}

module.exports = {
  list,
  getJobDetail,
  post_jobinfo,
  delete_jobinfo,
  list_landlord_job,
  update_jobinfo,
};
