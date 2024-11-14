const { registerUser, loginUser } = require("./model");
const jwt = require("jsonwebtoken");

function register(req, res) {
  const { username, password, email, user_id } = req.body;

  registerUser(username, password, email, user_id)
    .then((result) => {
      res.json({ message: "Create user successfully!" });
    })
    .catch((error) => {
      res.json({ message: "Error registering user", error });
    });
}

function login(req, res) {
  const { username, password } = req.body;

  loginUser(username, password)
    .then((user) => {
      //console.log(user.user_id);
      const token = jwt.sign({ user_id: user.user_id }, "secret", {
        expiresIn: "24h",
      });
      res.json({ message: "Login success!", user, token });
    })
    .catch((error) => {
      res.json({ message: "Invalid username or password", error });
    });
}

module.exports = { register, login };
