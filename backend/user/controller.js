const { registerUser, loginUser } = require("./model");
const jwt = require("jsonwebtoken");


function register(req, res) {
  const { username, password, email, user_id } = req.body;

  registerUser(username, password, email, user_id)
    .then((result) => {
      res.json({ message: "註冊成功!" });
    })
    .catch((error) => {
      res.json({ message: "註冊失敗", error });
    });
}

function login(req, res) {
  const { user_id, password } = req.body;

  loginUser(user_id, password)
    .then((user) => {
      //console.log(user.user_id);
      const token = jwt.sign({ user_id: user.user_id }, "secret", {
        expiresIn: "24h",
      });
      res.json({ message: "登入成功!", user, token });
    })
    .catch((error) => {
      res.json({ message: "登入失敗", error });
    });
}

module.exports = { register, login };
