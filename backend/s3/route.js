const multer = require('multer'); 
const router = require("express").Router();
const {upload_photo,get_photo } = require("./controller");


const upload = multer({
    storage: multer.memoryStorage(), // 使用記憶體儲存，檔案將保存在 RAM 中
    fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only jpg and png formats are allowed!'), false);
      }
      cb(null, true);
    },
});

router.post("/upload", upload.single('file'), upload_photo)
router.get("/getphoto",get_photo)


module.exports = router;
