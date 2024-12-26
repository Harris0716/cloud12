const { createJobInfo } = require('./model');

const post_jobinfo = async (req, res) => {
    try {
        const landlord_id = req.user.user_id; // 從 Token 提取的房東 ID
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

        // 驗證必填欄位
        if (!address || !room_type || !start_date || !end_date || !job_description || !positions || !people_needed || !cover_image) {
            return res.status(400).json({ message: '缺少必要欄位' });
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
            detail_images: JSON.stringify(detail_images), // JSON 格式的圖片陣列
            benefits: JSON.stringify(benefits), // JSON 格式的福利陣列
        };

        // 呼叫資料層
        const result = await createJobInfo(jobInfoData);
        res.status(201).json({ message: '新增 JobInfo 成功', jobInfo_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '新增 JobInfo 發生錯誤', error });
    }
};

module.exports = { post_jobinfo };