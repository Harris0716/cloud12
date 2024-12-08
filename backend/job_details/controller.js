// controller.js
const { getJobDetail } = require("./model");

function detail(req, res) {
  const jobInfo_id = req.params.jobInfo_id; // 修改為與路由參數一致
  
  getJobDetail(jobInfo_id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "找不到該工作機會" });
        return;
      }
      
      // 確保 JSON 字段被正確解析
      try {
        if (result.detail_images) {
          result.detail_images = JSON.parse(result.detail_images);
        }
        if (result.benefits) {
          result.benefits = JSON.parse(result.benefits);
        }
      } catch (error) {
        console.error('JSON 解析錯誤:', error);
      }
      
      res.json(result);
    })
    .catch((error) => {
      console.error('控制器錯誤:', error);
      res.status(500).json({ 
        message: "取得工作詳細資訊時發生錯誤", 
        error: error.message 
      });
    });
}

module.exports = { detail };