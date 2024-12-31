const AWS = require('aws-sdk');

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
    // ACL: "public-read",
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

function deleteImageFromS3(imageUrl) {
    const key = imageUrl.split(".amazonaws.com/")[1]; // 從 URL 提取文件 key
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };
  
    return s3.deleteObject(params).promise();
  }

module.exports = {
    uploadImageToS3,
    deleteImageFromS3,
};