const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // 從 Authorization 標頭中提取 Token（去除 "Bearer " 前綴）
  const token = req.headers["authorization"]?.split(" ")[1]; 
  if (!token) return res.sendStatus(401); // 如果沒有 token，返回 401 錯誤

  // 驗證 Token
  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.sendStatus(403); // 如果驗證失敗，返回 403 錯誤
    req.user = user;  // 把解碼後的 user 資料存入 request 中
    next();  // 呼叫下一個中間件
  });
}


module.exports = authenticateToken;
