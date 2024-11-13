const { registerUser, loginUser } = require("./users");

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
      res.json({ message: "Login success!" });
    })
    .catch((error) => {
      res.json({ message: "Invalid username or password", error });
    });
}

module.exports = { register, login };
