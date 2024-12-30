
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');
const router = require("express").Router();


// 初始化 S3 客户端
const s3 = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "YourAccessKeyId",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "YourSecretAccessKey",
    },
});

// 获取预签名 URL 的路由
router.get("/generate-presigned-url",async (req, res) => {
    const { filename, contentType} = req.query;
    if (!filename || !contentType) {
        return res.status(400).json({ error: 'Missing fileName or contentType' });
    }
    const bucketName = 's3-client-access';

    if (!filename.includes('.')) {
        return res.status(400).json({ error: 'fileName must include file extension' });
    }
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `uploads/${filename}`,
        Expires: new Date(Date.now() + 3600 * 1000),
        ContentType: contentType ,
    })
    try {
        const url = await getSignedUrl(s3,command,{expiresIn: 3600});
        res.json({url});
    }catch(error){
        console.error('生成簽名失敗:',error)
        res.status(500).json({error:'生成簽名失敗'});
    }

});

module.exports = router;
