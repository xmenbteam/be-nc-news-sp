const { fetchUserByUsername } = require("../models/users");

exports.getUserByUsername = (req, res, next) => {
  let user = req.params.username;

  fetchUserByUsername(user)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
