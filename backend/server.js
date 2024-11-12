const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 登入驗證的API
app.post("/api/auth", (req, res) => {
  var password = req.body.password;
  var email = req.body.email;
});

//登出的API
app.post("api/logout", (req, res) => {});

// 註冊的API
app.post("/api/register", (req, res) => {
  var name = req.body.name;
  var id = req.body.id;
  var password = req.body.password;
  var email = req.body.email;
});
