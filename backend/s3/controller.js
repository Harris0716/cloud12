
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const { add_user_photo,get_user_photo } = require("./model");
require('dotenv').config(); // 載入環境變數



const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET_REGION,
    BUCKET_NAME,
} = process.env;
  
  // 建立新的 S3 用戶端實例，設定區域和認證資訊
const s3Client = new S3Client({
    region: S3_BUCKET_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});


async function upload_photo(req, res) {
    const userId = req.query.userId; 
        console.log('UserId:', userId);
        if (req.file) {
          const key = Date.now().toString() + '-' + userId; // 生成檔案名稱
          try {
            const command = new PutObjectCommand({
              Bucket: BUCKET_NAME,
              Key: key,
              Body: req.file.buffer,
              ContentType: req.file.mimetype,
            });
            await s3Client.send(command); // 發送命令
      
            // 創建 S3 的 URL
            const imageUrl = `https://${BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${key}`;
            // 回傳成功訊息和圖片 URL
            res.json({
              message: '檔案上傳成功！',
              imageUrl: imageUrl,
            });
            add_user_photo(userId,imageUrl)
          } catch (error) {
            console.log(error); // 錯誤訊息
            res.status(500).send('檔案上傳失敗'); // 回傳上傳失敗訊息
          }
        } else {
          res.status(400).send('沒有上傳檔案'); // 沒有上傳檔案，回傳錯誤訊息
        }
}

function get_photo(req, res) {
    const userId = req.query.userId; 
    console.log(userId)
    get_user_photo(userId)
      .then((results) => {
        res.json({ message: "Get photo successfully!", data: results });
      })
      .catch((error) => {
        res.json({ message: "Error: Get photo", error });
      });
}
module.exports = { upload_photo,get_photo };