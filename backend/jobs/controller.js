const { listJobs } = require("./model");

function list(req, res) {
  listJobs()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json({ message: "Error listing rooms", error });
    });
}

module.exports = { list };
